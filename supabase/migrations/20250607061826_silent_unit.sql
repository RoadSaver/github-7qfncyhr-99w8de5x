/*
  # Add full_name column to existing_user_accounts table

  1. Changes
    - Add `full_name` column to `existing_user_accounts` table
    - Column is nullable to avoid issues with existing data
    - Uses text data type for storing user's full name

  2. Security
    - No RLS changes needed as existing policies will apply to the new column
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'existing_user_accounts' AND column_name = 'full_name'
  ) THEN
    ALTER TABLE existing_user_accounts ADD COLUMN full_name text;
  END IF;
END $$;