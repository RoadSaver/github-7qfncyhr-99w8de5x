/*
  # Add real_name column to employee_accounts table

  1. Schema Changes
    - Add `real_name` column to `employee_accounts` table
    - Column is nullable to avoid issues with existing data
    - Uses text data type for storing employee's real name

  2. Function Update
    - Update the `create_employee_account` function to accept and store real_name parameter

  3. Security
    - No RLS changes needed as existing policies will apply to the new column
*/

-- Add real_name column to employee_accounts table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'employee_accounts' AND column_name = 'real_name'
  ) THEN
    ALTER TABLE employee_accounts ADD COLUMN real_name text;
  END IF;
END $$;

-- Update the create_employee_account function to include real_name
CREATE OR REPLACE FUNCTION create_employee_account(
  p_username text,
  p_email text,
  p_phone_number text DEFAULT NULL,
  p_employee_role text DEFAULT 'technician',
  p_real_name text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_employee_id uuid;
BEGIN
  -- Insert into employee_accounts table
  INSERT INTO employee_accounts (
    username,
    email,
    phone_number,
    employee_role,
    real_name,
    status
  ) VALUES (
    p_username,
    p_email,
    p_phone_number,
    p_employee_role,
    p_real_name,
    'active'
  ) RETURNING id INTO new_employee_id;

  RETURN new_employee_id;
END;
$$;