/*
  # Fix RLS policies for admin user creation

  1. Security Updates
    - Add policy to allow service role to insert into existing_user_accounts
    - Add policy to allow service role to select from existing_user_accounts
    - Ensure admins can create user accounts through the application

  2. Changes
    - Add "Allow service role to insert user accounts" policy
    - Add "Allow service role to select user accounts" policy
    - These policies will enable admin functionality for user creation
*/

-- Drop existing conflicting policies if they exist
DROP POLICY IF EXISTS "Allow service role to insert user accounts" ON existing_user_accounts;
DROP POLICY IF EXISTS "Allow service role to select user accounts" ON existing_user_accounts;

-- Add policy to allow service role to insert user accounts (for admin operations)
CREATE POLICY "Allow service role to insert user accounts"
  ON existing_user_accounts
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Add policy to allow service role to select user accounts (for admin operations)
CREATE POLICY "Allow service role to select user accounts"
  ON existing_user_accounts
  FOR SELECT
  TO service_role
  USING (true);

-- Also ensure authenticated users with admin privileges can insert
-- This policy allows any authenticated user to insert if they have the admin role claim
CREATE POLICY "Allow admin users to insert user accounts"
  ON existing_user_accounts
  FOR INSERT
  TO authenticated
  WITH CHECK (
    (current_setting('request.jwt.claims', true)::json ->> 'role') = 'admin'
    OR
    (current_setting('request.jwt.claims', true)::json ->> 'user_role') = 'admin'
  );

-- Allow admin users to select user accounts
CREATE POLICY "Allow admin users to select user accounts"
  ON existing_user_accounts
  FOR SELECT
  TO authenticated
  USING (
    (current_setting('request.jwt.claims', true)::json ->> 'role') = 'admin'
    OR
    (current_setting('request.jwt.claims', true)::json ->> 'user_role') = 'admin'
  );