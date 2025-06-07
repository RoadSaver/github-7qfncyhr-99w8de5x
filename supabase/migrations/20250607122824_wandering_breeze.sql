/*
  # Create simulated employees blacklist table

  1. New Tables
    - `simulated_employees_blacklist`
      - `id` (uuid, primary key)
      - `request_id` (text, not null) - The request ID this blacklist entry belongs to
      - `employee_name` (text, not null) - Name of the blacklisted employee
      - `user_id` (text, not null) - User who made the request
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `simulated_employees_blacklist` table
    - Add policy for public access (for simulation purposes)

  3. Indexes
    - Index on request_id for fast lookups
    - Index on user_id for user-specific queries
*/

CREATE TABLE IF NOT EXISTS simulated_employees_blacklist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  request_id TEXT NOT NULL,
  employee_name TEXT NOT NULL,
  user_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_simulated_employees_blacklist_request_id ON simulated_employees_blacklist(request_id);
CREATE INDEX IF NOT EXISTS idx_simulated_employees_blacklist_user_id ON simulated_employees_blacklist(user_id);

-- Enable Row Level Security
ALTER TABLE simulated_employees_blacklist ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for simulation environment
CREATE POLICY "Allow all operations on simulated_employees_blacklist" ON simulated_employees_blacklist
  FOR ALL USING (true) WITH CHECK (true);