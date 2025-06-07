-- Create the price_quote_snapshots table
CREATE TABLE IF NOT EXISTS price_quote_snapshots (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  request_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  employee_id TEXT,
  service_type TEXT NOT NULL,
  price_quote DECIMAL(10,2) NOT NULL,
  service_fee DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  employee_name TEXT NOT NULL,
  snapshot_data JSONB NOT NULL,
  status TEXT CHECK (status IN ('pending', 'accepted', 'declined', 'finished')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the user_finished_requests table
CREATE TABLE IF NOT EXISTS user_finished_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  username TEXT NOT NULL,
  request_id TEXT NOT NULL,
  snapshot_id UUID REFERENCES price_quote_snapshots(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the employee_finished_requests table
CREATE TABLE IF NOT EXISTS employee_finished_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id TEXT NOT NULL,
  employee_username TEXT NOT NULL,
  request_id TEXT NOT NULL,
  snapshot_id UUID REFERENCES price_quote_snapshots(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the translations table if it doesn't exist
CREATE TABLE IF NOT EXISTS translations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL,
  english_text TEXT NOT NULL,
  bulgarian_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the user_history table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  request_id TEXT NOT NULL,
  service_type TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_price_quote_snapshots_request_id ON price_quote_snapshots(request_id);
CREATE INDEX IF NOT EXISTS idx_price_quote_snapshots_user_id ON price_quote_snapshots(user_id);
CREATE INDEX IF NOT EXISTS idx_price_quote_snapshots_status ON price_quote_snapshots(status);
CREATE INDEX IF NOT EXISTS idx_user_finished_requests_user_id ON user_finished_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_employee_finished_requests_employee_id ON employee_finished_requests(employee_id);
CREATE INDEX IF NOT EXISTS idx_user_history_user_id ON user_history(user_id);

-- Enable Row Level Security
ALTER TABLE price_quote_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_finished_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_finished_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_history ENABLE ROW LEVEL SECURITY;

-- Create RLS policies that allow all operations for simulation environment
CREATE POLICY "Allow all operations on price_quote_snapshots" ON price_quote_snapshots
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on user_finished_requests" ON user_finished_requests
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on employee_finished_requests" ON employee_finished_requests
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on user_history" ON user_history
  FOR ALL USING (true) WITH CHECK (true);

-- Add RLS policies for translations table
CREATE POLICY "Anyone can read translations" ON translations
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert translations" ON translations
  FOR INSERT WITH CHECK (true);