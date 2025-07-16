
-- Drop the existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create a new function that properly handles enum conversions
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Only insert if we have the required metadata
  IF new.raw_user_meta_data ? 'full_name' AND 
     new.raw_user_meta_data ? 'date_of_birth' AND 
     new.raw_user_meta_data ? 'zodiac_sign' AND 
     new.raw_user_meta_data ? 'style_preference' THEN
    
    INSERT INTO public.profiles (id, full_name, date_of_birth, zodiac_sign, style_preference)
    VALUES (
      new.id,
      new.raw_user_meta_data ->> 'full_name',
      (new.raw_user_meta_data ->> 'date_of_birth')::date,
      (new.raw_user_meta_data ->> 'zodiac_sign')::public.zodiac_sign,
      (new.raw_user_meta_data ->> 'style_preference')::public.horoscope_style
    );
  END IF;
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger again
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
