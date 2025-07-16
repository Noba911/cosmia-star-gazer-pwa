
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

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

    const stylePrompts = {
      poetic: "Write in a mystical, poetic style with beautiful metaphors and celestial imagery. Use flowing, artistic language that feels magical and inspiring.",
      classic: "Write in a traditional horoscope style with practical advice, lucky numbers (3 random numbers between 1-30), lucky color, and specific predictions about career, health, and relationships.",
      'daily-tip': "Write as a concise daily tip with actionable advice. Include one quick tip and one focus action for the day. Keep it practical and motivating."
    };

    const systemPrompt = `You are a professional astrologer creating personalized horoscopes. ${stylePrompts[style as keyof typeof stylePrompts]}

Always respond with a JSON object containing:
- "quote": The main horoscope text (2-3 sentences)
- "description": Additional details and advice (1-2 sentences)

Keep the content positive, inspiring, and relevant to ${zodiacSign} characteristics.`;

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
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'OpenAI API error');
    }

    let horoscopeContent;
    try {
      horoscopeContent = JSON.parse(data.choices[0].message.content);
    } catch (e) {
      // Fallback if JSON parsing fails
      const content = data.choices[0].message.content;
      horoscopeContent = {
        quote: content.substring(0, 200) + "...",
        description: "Your stars are aligned for positive outcomes today."
      };
    }

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
