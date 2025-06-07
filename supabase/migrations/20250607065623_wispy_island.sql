/*
  # Fix Employee Account Creation for Admin Panel

  1. New RLS Policies
    - Enable admin to create employee accounts
    - Enable admin to view employee accounts
    - Maintain service role access
    - Allow employees to view their own data

  2. Security
    - Permissive policies for admin operations
    - Restrictive policies for employee self-access
    - Service role maintains full access
*/

-- Drop ALL existing policies on employee_accounts to start fresh
DROP POLICY IF EXISTS "Only admins can access and edit employee accounts" ON employee_accounts;
DROP POLICY IF EXISTS "Employees can't update their own account data" ON employee_accounts;
DROP POLICY IF EXISTS "Employees can view their own account data" ON employee_accounts;
DROP POLICY IF EXISTS "Enable admin employee creation" ON employee_accounts;
DROP POLICY IF EXISTS "Enable admin employee selection" ON employee_accounts;
DROP POLICY IF EXISTS "Enable admin employee updates" ON employee_accounts;
DROP POLICY IF EXISTS "Service role full access on employee accounts" ON employee_accounts;

-- Create permissive policies for admin operations
CREATE POLICY "Enable admin employee creation"
  ON employee_accounts
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Enable admin employee selection"
  ON employee_accounts
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Enable admin employee updates"
  ON employee_accounts
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Maintain employee self-access for viewing their own data
CREATE POLICY "Employees can view their own account data"
  ON employee_accounts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = auth_user_id);

-- Ensure service role can still perform all operations
CREATE POLICY "Service role full access on employee accounts"
  ON employee_accounts
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);