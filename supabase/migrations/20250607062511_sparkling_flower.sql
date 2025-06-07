/*
  # Add admin insert policy for existing user accounts

  1. Security Changes
    - Add RLS policy to allow INSERT operations on existing_user_accounts table
    - Policy allows authenticated users to insert records (for admin functionality)
    - Maintains security by requiring authentication

  2. Changes Made
    - Create policy "Allow authenticated users to insert user accounts" for INSERT operations
    - This enables admin users to create new user accounts through the admin panel
*/

-- Add policy to allow authenticated users to insert new user accounts
-- This is needed for admin functionality to create users
CREATE POLICY "Allow authenticated users to insert user accounts"
  ON existing_user_accounts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);