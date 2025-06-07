/*
  # Add secret question columns to existing_user_accounts table

  1. Schema Changes
    - Add `secret_question_1` (text, nullable) to existing_user_accounts table
    - Add `secret_answer_1` (text, nullable) to existing_user_accounts table  
    - Add `secret_question_2` (text, nullable) to existing_user_accounts table
    - Add `secret_answer_2` (text, nullable) to existing_user_accounts table

  2. Purpose
    - Enable storage of security questions and answers for user account recovery
    - Support admin-created user accounts with secret questions
    - Maintain backward compatibility with existing records (nullable columns)
*/

-- Add secret question columns to existing_user_accounts table
DO $$
BEGIN
  -- Add secret_question_1 column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'existing_user_accounts' AND column_name = 'secret_question_1'
  ) THEN
    ALTER TABLE existing_user_accounts ADD COLUMN secret_question_1 text;
  END IF;

  -- Add secret_answer_1 column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'existing_user_accounts' AND column_name = 'secret_answer_1'
  ) THEN
    ALTER TABLE existing_user_accounts ADD COLUMN secret_answer_1 text;
  END IF;

  -- Add secret_question_2 column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'existing_user_accounts' AND column_name = 'secret_question_2'
  ) THEN
    ALTER TABLE existing_user_accounts ADD COLUMN secret_question_2 text;
  END IF;

  -- Add secret_answer_2 column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'existing_user_accounts' AND column_name = 'secret_answer_2'
  ) THEN
    ALTER TABLE existing_user_accounts ADD COLUMN secret_answer_2 text;
  END IF;
END $$;