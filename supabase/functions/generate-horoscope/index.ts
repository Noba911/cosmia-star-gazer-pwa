
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.51.0';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { zodiacSign, style, date, fullName } = await req.json();

    // Create Supabase client with service role key for admin access
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get the current user's ID from the request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      throw new Error('Invalid or expired token');
    }

    const stylePrompts = {
      poetic: "Write in a mystical, poetic style with beautiful metaphors and celestial imagery. Use flowing, artistic language that feels magical and inspiring.",
      classic: "Write in a traditional horoscope style with practical advice, lucky numbers (3 random numbers between 1-30), lucky color, and specific predictions about career, health, and relationships.",
      'daily-tip': "Write as a concise daily tip with actionable advice. Include one quick tip and one focus action for the day. Keep it practical and motivating."
    };

    const systemPrompt = `You are a professional astrologer creating personalized horoscopes. ${stylePrompts[style as keyof typeof stylePrompts]}

IMPORTANT: You must respond with ONLY a valid JSON object containing exactly these two fields:
- "quote": The main horoscope text (2-3 sentences, no JSON formatting)
- "description": Additional details and advice (1-2 sentences, no JSON formatting)

Do not include any markdown, explanations, or text outside the JSON object. Keep the content positive, inspiring, and relevant to ${zodiacSign} characteristics.`;

    const userPrompt = `Create a ${style} horoscope for ${fullName}, a ${zodiacSign}, for ${date}. Make it personal and specific to ${zodiacSign} traits.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.8,
        max_tokens: 300,
        response_format: { type: "json_object" }
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'OpenAI API error');
    }

    let horoscopeContent;
    try {
      const rawContent = data.choices[0].message.content;
      console.log('Raw OpenAI response:', rawContent);
      
      horoscopeContent = JSON.parse(rawContent);
      
      // Validate the structure
      if (!horoscopeContent.quote || !horoscopeContent.description) {
        throw new Error('Invalid response structure');
      }
      
      // Clean any potential JSON artifacts from the text
      horoscopeContent.quote = horoscopeContent.quote.replace(/^["']|["']$/g, '').trim();
      horoscopeContent.description = horoscopeContent.description.replace(/^["']|["']$/g, '').trim();
      
    } catch (parseError) {
      console.error('JSON parsing failed:', parseError);
      console.log('Failed content:', data.choices[0].message.content);
      
      // Fallback: extract content manually if JSON parsing fails
      horoscopeContent = {
        quote: "The stars are aligning in your favor today. Trust your intuition and embrace the opportunities that come your way.",
        description: "Your cosmic energy is particularly strong right now. Focus on positive thoughts and actions to manifest your desires."
      };
    }

    // Save the horoscope to the database for future consistency
    try {
      const { error: insertError } = await supabase
        .from('horoscope_history')
        .insert({
          user_id: user.id,
          zodiac_sign: zodiacSign,
          style: style,
          date: date,
          quote: horoscopeContent.quote,
          description: horoscopeContent.description
        });

      if (insertError) {
        console.error('Error saving horoscope to database:', insertError);
        // Don't throw here - we still want to return the generated content
      } else {
        console.log('Horoscope saved to database successfully');
      }
    } catch (dbError) {
      console.error('Database save error:', dbError);
      // Continue - don't let database errors prevent returning content
    }

    console.log('Final horoscope content:', horoscopeContent);

    return new Response(JSON.stringify(horoscopeContent), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-horoscope function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      quote: "The stars are temporarily obscured, but your inner wisdom shines bright.",
      description: "Trust your intuition today and embrace the opportunities that come your way."
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
