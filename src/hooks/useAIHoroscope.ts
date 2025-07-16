
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface HoroscopeContent {
  quote: string;
  description: string;
}

export const useAIHoroscope = (zodiacSign: string, style: string, date: Date, fullName: string) => {
  const [content, setContent] = useState<HoroscopeContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const generateHoroscope = async () => {
    if (!zodiacSign || !style || !fullName) return;

    setLoading(true);
    setError(null);
    setContent(null);

    try {
      const dateString = date.toISOString().split('T')[0];
      
      // First, check if we already have a horoscope for this combination
      const { data: existingHoroscope, error: fetchError } = await supabase
        .from('horoscope_history')
        .select('quote, description')
        .eq('zodiac_sign', zodiacSign)
        .eq('style', style)
        .eq('date', dateString)
        .maybeSingle();

      if (fetchError) {
        console.error('Error fetching existing horoscope:', fetchError);
      }

      if (existingHoroscope) {
        // Use existing horoscope
        setContent({
          quote: existingHoroscope.quote,
          description: existingHoroscope.description
        });
        setLoading(false);
        return;
      }

      // Generate new horoscope if none exists
      const { data, error: functionError } = await supabase.functions.invoke('generate-horoscope', {
        body: {
          zodiacSign,
          style,
          date: dateString,
          fullName
        }
      });

      if (functionError) {
        throw functionError;
      }

      // Validate that we received proper content
      if (data && data.quote && data.description) {
        setContent(data);
      } else {
        throw new Error('Invalid response format from AI service');
      }
    } catch (err) {
      console.error('Error generating horoscope:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate horoscope';
      setError(errorMessage);
      
      // Provide meaningful fallback content
      setContent({
        quote: "The stars are preparing something special for you today. Trust in your inner wisdom and embrace the opportunities that come your way.",
        description: "Today brings a chance for growth and positive energy. Stay open to new possibilities and trust your instincts."
      });

      toast({
        title: "Using backup horoscope",
        description: "Unable to generate personalized content right now",
        variant: "default"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateHoroscope();
  }, [zodiacSign, style, date.toDateString(), fullName]);

  return {
    content,
    loading,
    error,
    regenerate: generateHoroscope
  };
};
