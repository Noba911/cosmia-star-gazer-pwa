
-- Create a table to store generated horoscopes for consistency
CREATE TABLE public.horoscope_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  zodiac_sign public.zodiac_sign NOT NULL,
  style public.horoscope_style NOT NULL,
  date DATE NOT NULL,
  quote TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Ensure one horoscope per user, sign, style, and date combination
  UNIQUE(user_id, zodiac_sign, style, date)
);

-- Add Row Level Security (RLS)
ALTER TABLE public.horoscope_history ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
CREATE POLICY "Users can view their own horoscope history" 
  ON public.horoscope_history 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own horoscope history" 
  ON public.horoscope_history 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create an index for better performance on lookups
CREATE INDEX idx_horoscope_history_lookup 
  ON public.horoscope_history(user_id, zodiac_sign, style, date);
