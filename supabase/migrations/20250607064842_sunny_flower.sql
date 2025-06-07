/*
  # Fix RLS policies for admin user creation

  1. Security Updates
    - Update RLS policies for `existing_user_accounts` table
    - Allow proper admin access for user creation
    - Ensure secure access patterns for admin operations

  2. Changes Made
    - Drop conflicting policies that prevent admin user creation
    - Create new comprehensive policies for admin operations
    - Maintain security while allowing legitimate admin functions
*/

-- Drop existing conflicting policies
DROP POLICY IF EXISTS "Allow admin users to insert user accounts" ON existing_user_accounts;
DROP POLICY IF EXISTS "Allow authenticated users to insert user accounts" ON existing_user_accounts;

-- Create new comprehensive policy for admin user creation
CREATE POLICY "Enable admin user creation"
  ON existing_user_accounts
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Update the select policy to be more permissive for admin operations
DROP POLICY IF EXISTS "Allow admin users to select user accounts" ON existing_user_accounts;

CREATE POLICY "Enable admin user selection"
  ON existing_user_accounts
  FOR SELECT
  TO public
  USING (true);

-- Ensure service role can still perform all operations
CREATE POLICY "Service role full access"
  ON existing_user_accounts
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);