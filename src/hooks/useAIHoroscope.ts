
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

    try {
      const { data, error: functionError } = await supabase.functions.invoke('generate-horoscope', {
        body: {
          zodiacSign,
          style,
          date: date.toISOString().split('T')[0],
          fullName
        }
      });

      if (functionError) {
        throw functionError;
      }

      setContent(data);
    } catch (err) {
      console.error('Error generating horoscope:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate horoscope');
      
      // Fallback content
      setContent({
        quote: "The cosmic energies are realigning. Your unique path forward will become clear soon.",
        description: "Sometimes the universe needs a moment to prepare the perfect message for you. Trust in your inner strength today."
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
