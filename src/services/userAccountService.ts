import { supabase } from '@/integrations/supabase/client';
import bcrypt from 'bcryptjs';

export interface NewUserAccount {
  username: string;
  email: string;
  password: string;
  phone_number?: string;
  gender?: string;
}

export interface ExistingUserAccount {
  username: string;
  email: string;
  phone_number?: string;
  gender?: string;
}

export interface AdminCreateUserAccount {
  username: string;
  email: string;
  password: string;
  phone_number?: string;
  gender?: string;
  name?: string;
  secretQuestion1?: string;
  secretAnswer1?: string;
  secretQuestion2?: string;
  secretAnswer2?: string;
}

export class UserAccountService {
  // Create a new user account in the temporary table
  static async createNewUserAccount(userData: NewUserAccount) {
    try {
      // Hash the password before storing
      const saltRounds = 10;
      const password_hash = await bcrypt.hash(userData.password, saltRounds);

      const { data, error } = await supabase
        .from('new_user_accounts')
        .insert({
          username: userData.username.toLowerCase(), // Ensure lowercase
          email: userData.email,
          password_hash,
          phone_number: userData.phone_number,
          gender: userData.gender,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating new user account:', error);
        throw error;
      }

      console.log('New user account created:', data);
      return data;
    } catch (error) {
      console.error('Error in createNewUserAccount:', error);
      throw error;
    }
  }

  // Create a user account directly in existing_user_accounts table (admin only)
  static async createUserByAdmin(userData: AdminCreateUserAccount) {
    try {
      // Hash the password before storing
      const saltRounds = 10;
      const password_hash = await bcrypt.hash(userData.password, saltRounds);

      // Prepare the user data for insertion
      const userInsertData: any = {
        username: userData.username.toLowerCase(), // Ensure lowercase
        email: userData.email,
        password_hash,
        phone_number: userData.phone_number,
        gender: userData.gender,
        created_by_admin: true
      };

      // Add name if provided
      if (userData.name) {
        userInsertData.full_name = userData.name;
      }

      // Add secret questions if provided
      if (userData.secretQuestion1 && userData.secretAnswer1) {
        userInsertData.secret_question_1 = userData.secretQuestion1;
        userInsertData.secret_answer_1 = userData.secretAnswer1;
      }

      if (userData.secretQuestion2 && userData.secretAnswer2) {
        userInsertData.secret_question_2 = userData.secretQuestion2;
        userInsertData.secret_answer_2 = userData.secretAnswer2;
      }

      const { data, error } = await supabase
        .from('existing_user_accounts')
        .insert(userInsertData)
        .select()
        .single();

      if (error) {
        console.error('Error creating user account by admin:', error);
        throw error;
      }

      console.log('User account created by admin:', data);
      return data;
    } catch (error) {
      console.error('Error in createUserByAdmin:', error);
      throw error;
    }
  }

  // Get all pending new user accounts
  static async getPendingNewUsers() {
    try {
      const { data, error } = await supabase
        .from('new_user_accounts')
        .select('*')
        .is('processed_at', null)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching pending new users:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error in getPendingNewUsers:', error);
      throw error;
    }
  }

  // Get all existing user accounts
  static async getExistingUsers() {
    try {
      const { data, error } = await supabase
        .from('existing_user_accounts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching existing users:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error in getExistingUsers:', error);
      throw error;
    }
  }

  // Migrate a user from new_user_accounts to existing_user_accounts
  static async migrateUserToExisting(userId: string) {
    try {
      const { data, error } = await supabase.rpc('migrate_new_user_to_existing', {
        user_record_id: userId
      });

      if (error) {
        console.error('Error migrating user:', error);
        throw error;
      }

      console.log('User migrated successfully:', data);
      return data;
    } catch (error) {
      console.error('Error in migrateUserToExisting:', error);
      throw error;
    }
  }

  // Get existing user account by ID
  static async getExistingUserById(userId: string) {
    try {
      const { data, error } = await supabase
        .from('existing_user_accounts')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching existing user:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error in getExistingUserById:', error);
      throw error;
    }
  }

  // Update existing user account
  static async updateExistingUser(userId: string, updates: Partial<ExistingUserAccount>) {
    try {
      const { data, error } = await supabase
        .from('existing_user_accounts')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        console.error('Error updating existing user:', error);
        throw error;
      }

      console.log('User updated successfully:', data);
      return data;
    } catch (error) {
      console.error('Error in updateExistingUser:', error);
      throw error;
    }
  }

  // Verify password for a user in new_user_accounts
  static async verifyNewUserPassword(username: string, password: string) {
    try {
      const { data, error } = await supabase
        .from('new_user_accounts')
        .select('password_hash')
        .eq('username', username.toLowerCase())
        .single();

      if (error || !data) {
        return false;
      }

      return await bcrypt.compare(password, data.password_hash);
    } catch (error) {
      console.error('Error verifying password:', error);
      return false;
    }
  }

  // Password encryption/decryption utilities for admin use
  static async encryptPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}