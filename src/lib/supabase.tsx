// lib/supabase.tsx
import { createClient } from '@supabase/supabase-js'

// Validate environment variables on server/build time
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables! Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.');
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Type definitions
export type UserRole = 'user' | 'counsellor' | 'expert' | 'alumni';

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  first_name?: string;
  last_name?: string;
  phone?: string;
  avatar_url?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

// Helper functions for authentication
export const authHelpers = {
  supabase,

  // Sign up a new user - inserts into correct table based on role
  signUp: async (email: string, password: string, firstName: string, lastName: string, role: UserRole = 'user') => {
    try {
      console.log('📝 Starting signup for role:', role);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            role: role,
          }
        }
      })
      
      if (error) {
        console.error('❌ Signup error:', error)
        return { data: null, error }
      }

      if (data.user) {
        const userId = data.user.id;
        console.log('✅ Auth user created:', userId);

        await new Promise(resolve => setTimeout(resolve, 500));

        let insertError = null;

        if (role === 'counsellor') {
          console.log('➡️ Inserting into counsellors table...');
          const { data: insertData, error } = await supabase
            .from('counsellors')
            .insert({
              user_id: userId,
              email: email,
              first_name: firstName,
              last_name: lastName,
              full_name: `${firstName} ${lastName}`,
              is_active: true,
              is_approved: false,
              is_verified: false,
              is_available: true,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })
            .select()
            .single();
          
          insertError = error;
          if (insertData) {
            console.log('✅ Counsellor profile created:', insertData);
          }

        } else if (role === 'expert') {
          console.log('➡️ Inserting into industry_experts table...');
          const { data: insertData, error } = await supabase
            .from('industry_experts')
            .insert({
              user_id: userId,
              email: email,
              first_name: firstName,
              last_name: lastName,
              full_name: `${firstName} ${lastName}`,
              is_active: true,
              is_approved: false,
              is_verified: false,
              is_available: true,
              industry: 'Not Specified',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })
            .select()
            .single();
          
          insertError = error;
          if (insertData) {
            console.log('✅ Industry expert profile created:', insertData);
          }

        } else {
          console.log('➡️ Inserting into user_profiles table...');
          const { data: insertData, error } = await supabase
            .from('user_profiles')
            .upsert({
              id: userId,
              email: email,
              first_name: firstName,
              last_name: lastName,
              user_role: role,
              is_active: true,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            }, {
              onConflict: 'id'
            })
            .select()
            .single();
          
          insertError = error;
          if (insertData) {
            console.log('✅ User profile created:', insertData);
          }
        }

        if (insertError) {
          console.error('❌ Error creating user profile:', insertError);
          console.error('❌ Full error details:', JSON.stringify(insertError, null, 2));
          
          return { 
            data,
            error: { 
              message: `Profile creation had issues but account was created. You can still login.`,
              isPartial: true
            } 
          };
        } else {
          console.log('✅ User profile created successfully');
        }
      }
      
      return { data, error: null }
    } catch (error: any) {
      console.error('💥 Unexpected signup error:', error)
      return { data: null, error: { message: error.message || 'An unexpected error occurred during signup' } }
    }
  },

  // Sign in an existing user with auto-recovery
  signIn: async (email: string, password: string) => {
    try {
      console.log('🔐 Attempting sign in for:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) {
        console.error('❌ Signin error:', error)
        return { data: null, error }
      }
      
      if (!data.user) {
        return { data: null, error: { message: 'No user data returned' } }
      }
      
      console.log('✅ User signed in:', data.user.id);
      
      // Check if profile exists and auto-recover if needed
      await authHelpers.ensureProfileExists(data.user);
      
      return { data, error: null }
    } catch (error: any) {
      console.error('💥 Unexpected signin error:', error)
      return { data: null, error: { message: error.message || 'An unexpected error occurred during signin' } }
    }
  },

  // Ensure profile exists - create if missing
  ensureProfileExists: async (user: any) => {
    try {
      const userId = user.id;
      const email = user.email || '';
      const firstName = user.user_metadata?.first_name || '';
      const lastName = user.user_metadata?.last_name || '';
      const role = (user.user_metadata?.role as UserRole) || 'user';
      
      console.log('🔍 Checking if profile exists for user:', userId, 'role:', role);
      
      let profileExists = false;
      
      // Check if profile exists based on role
      if (role === 'counsellor') {
        const { data } = await supabase
          .from('counsellors')
          .select('user_id')
          .eq('user_id', userId)
          .maybeSingle();
        profileExists = !!data;
      } else if (role === 'expert') {
        const { data } = await supabase
          .from('industry_experts')
          .select('user_id')
          .eq('user_id', userId)
          .maybeSingle();
        profileExists = !!data;
      } else {
        const { data } = await supabase
          .from('user_profiles')
          .select('id')
          .eq('id', userId)
          .maybeSingle();
        profileExists = !!data;
      }
      
      if (profileExists) {
        console.log('✅ Profile exists');
        return { success: true };
      }
      
      console.log('⚠️ Profile missing, creating now...');
      
      // Create the missing profile
      if (role === 'counsellor') {
        const { error } = await supabase.from('counsellors').insert({
          user_id: userId,
          email: email,
          first_name: firstName,
          last_name: lastName,
          full_name: `${firstName} ${lastName}`.trim() || email.split('@')[0],
          is_active: true,
          is_approved: false,
          is_verified: false,
          is_available: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
        
        if (error) {
          console.error('❌ Error creating counsellor profile:', error);
          return { success: false, error };
        }
      } else if (role === 'expert') {
        const { error } = await supabase.from('industry_experts').insert({
          user_id: userId,
          email: email,
          first_name: firstName,
          last_name: lastName,
          full_name: `${firstName} ${lastName}`.trim() || email.split('@')[0],
          is_active: true,
          is_approved: false,
          is_verified: false,
          is_available: true,
          industry: 'Not Specified',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
        
        if (error) {
          console.error('❌ Error creating expert profile:', error);
          return { success: false, error };
        }
      } else {
        const { error } = await supabase.from('user_profiles').insert({
          id: userId,
          email: email,
          first_name: firstName,
          last_name: lastName,
          user_role: role,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
        
        if (error) {
          console.error('❌ Error creating user profile:', error);
          return { success: false, error };
        }
      }
      
      console.log('✅ Profile created successfully during sign in');
      return { success: true };
      
    } catch (error: any) {
      console.error('💥 Error ensuring profile exists:', error);
      return { success: false, error };
    }
  },

  // Sign out the current user
  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Signout error:', error)
        return { error }
      }
      
      return { error: null }
    } catch (error: any) {
      console.error('Unexpected signout error:', error)
      return { error: { message: 'An unexpected error occurred during signout' } }
    }
  },

  // Reset password
  resetPassword: async (email: string) => {
    try {
      let baseUrl: string;
      
      if (typeof window !== 'undefined') {
        baseUrl = window.location.origin;
      } else {
        baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${baseUrl}/reset-password`,
      })
      
      if (error) {
        console.error('Password reset error:', error)
        return { error }
      }
      
      return { error: null }
    } catch (error: any) {
      console.error('Unexpected password reset error:', error)
      return { error: { message: 'An unexpected error occurred during password reset' } }
    }
  },

  // Update password (for authenticated users)
  updatePassword: async (newPassword: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })
      
      if (error) {
        console.error('Password update error:', error)
        return { error }
      }
      
      return { error: null }
    } catch (error: any) {
      console.error('Unexpected password update error:', error)
      return { error: { message: 'An unexpected error occurred during password update' } }
    }
  },

  // Update user profile
  updateProfile: async (updates: any) => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: updates
      })
      
      if (error) {
        console.error('Profile update error:', error)
        return { error }
      }
      
      return { error: null }
    } catch (error: any) {
      console.error('Unexpected profile update error:', error)
      return { error: { message: 'An unexpected error occurred during profile update' } }
    }
  },

  // Get current session
  getCurrentSession: async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Get session error:', error)
        return { session: null, error }
      }
      
      return { session, error: null }
    } catch (error: any) {
      console.error('Unexpected get session error:', error)
      return { session: null, error: { message: 'An unexpected error occurred while getting session' } }
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error) {
        console.error('Get user error:', error)
        return { user: null, error }
      }
      
      return { user, error: null }
    } catch (error: any) {
      console.error('Unexpected get user error:', error)
      return { user: null, error: { message: 'An unexpected error occurred while getting user' } }
    }
  },

  // Get user role from database
  getUserRole: async (userId: string): Promise<{ role: UserRole | null, error: any }> => {
    try {
      console.log('🔍 Checking user role for userId:', userId);

      // Check counsellors table
      const { data: counsellorData, error: counsellorError } = await supabase
        .from('counsellors')
        .select('user_id')
        .eq('user_id', userId)
        .maybeSingle();
      
      if (counsellorError && counsellorError.code !== 'PGRST116') {
        console.error('❌ Error checking counsellors table:', counsellorError);
      }
      
      if (counsellorData) {
        console.log('✅ Found in counsellors table');
        return { role: 'counsellor', error: null };
      }

      // Check industry_experts table
      const { data: expertData, error: expertError } = await supabase
        .from('industry_experts')
        .select('user_id')
        .eq('user_id', userId)
        .maybeSingle();
      
      if (expertError && expertError.code !== 'PGRST116') {
        console.error('❌ Error checking industry_experts table:', expertError);
      }
      
      if (expertData) {
        console.log('✅ Found in industry_experts table');
        return { role: 'expert', error: null };
      }

      // Check user_profiles table
      const { data: userProfile, error: userError } = await supabase
        .from('user_profiles')
        .select('id, user_role')
        .eq('id', userId)
        .maybeSingle();
      
      if (userError && userError.code !== 'PGRST116') {
        console.error('❌ Error checking user_profiles table:', userError);
      }
      
      if (userProfile) {
        console.log('✅ Found in user_profiles table with role:', userProfile.user_role);
        return { role: (userProfile.user_role as UserRole) || 'user', error: null };
      }

      // Profile not found
      console.error('❌ User not found in any role table');
      return { 
        role: null, 
        error: { 
          message: 'User profile not found in database.',
          code: 'PROFILE_NOT_FOUND'
        }
      };
      
    } catch (error: any) {
      console.error('💥 Error getting user role:', error);
      return { role: null, error };
    }
  },

  // Get full user profile with role
  getUserProfile: async (userId: string): Promise<{ profile: UserProfile | null, error: any }> => {
    try {
      console.log('🔍 Getting full user profile for:', userId);

      const { role, error: roleError } = await authHelpers.getUserRole(userId);
      
      if (roleError || !role) {
        return { profile: null, error: roleError || { message: 'Role not found' } };
      }

      let data = null;
      let error = null;

      if (role === 'counsellor') {
        const result = await supabase
          .from('counsellors')
          .select('*')
          .eq('user_id', userId)
          .single();
        data = result.data;
        error = result.error;
      } else if (role === 'expert') {
        const result = await supabase
          .from('industry_experts')
          .select('*')
          .eq('user_id', userId)
          .single();
        data = result.data;
        error = result.error;
      } else {
        const result = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', userId)
          .single();
        data = result.data;
        error = result.error;
      }

      if (error) {
        console.error('❌ Get profile error:', error);
        return { profile: null, error };
      }

      const profile: UserProfile = {
        id: userId,
        email: data.email || '',
        role: role,
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        avatar_url: data.avatar_url,
        is_active: data.is_active,
        created_at: data.created_at,
        updated_at: data.updated_at,
      };

      console.log('✅ Profile retrieved');
      return { profile, error: null };
      
    } catch (error: any) {
      console.error('💥 Unexpected get profile error:', error);
      return { profile: null, error: { message: 'An unexpected error occurred while getting user profile' } };
    }
  }
}

// Database helper functions
export const dbHelpers = {
  // Create user profile in database
  createUserProfile: async (userId: string, profileData: any, role: UserRole = 'user') => {
    try {
      console.log('📝 Creating user profile for role:', role);
      
      const email = profileData.email || '';
      const firstName = profileData.first_name || '';
      const lastName = profileData.last_name || '';
      
      let result;
      
      if (role === 'counsellor') {
        result = await supabase.from('counsellors').upsert({
          user_id: userId,
          email: email,
          first_name: firstName,
          last_name: lastName,
          full_name: `${firstName} ${lastName}`.trim() || email.split('@')[0],
          is_active: true,
          is_approved: false,
          is_verified: false,
          is_available: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id' }).select();
      } else if (role === 'expert') {
        result = await supabase.from('industry_experts').upsert({
          user_id: userId,
          email: email,
          first_name: firstName,
          last_name: lastName,
          full_name: `${firstName} ${lastName}`.trim() || email.split('@')[0],
          is_active: true,
          is_approved: false,
          is_verified: false,
          is_available: true,
          industry: 'Not Specified',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id' }).select();
      } else {
        result = await supabase.from('user_profiles').upsert({
          id: userId,
          email: email,
          first_name: firstName,
          last_name: lastName,
          user_role: role,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }, { onConflict: 'id' }).select();
      }

      if (result.error) {
        console.error('❌ Create profile error:', result.error);
        return { data: null, error: result.error };
      }
      
      console.log('✅ Profile created successfully');
      return { data: result.data, error: null };
    } catch (error: any) {
      console.error('💥 Unexpected create profile error:', error);
      return { data: null, error: { message: 'An unexpected error occurred while creating profile' } };
    }
  },

  // Update user profile in database
  updateUserProfile: async (userId: string, updates: any) => {
    try {
      const { role, error: roleError } = await authHelpers.getUserRole(userId);
      
      if (roleError || !role) {
        return { data: null, error: roleError || { message: 'Role not found' } };
      }

      const updateData = {
        ...updates,
        updated_at: new Date().toISOString(),
      };

      let result;
      if (role === 'counsellor') {
        result = await supabase
          .from('counsellors')
          .update(updateData)
          .eq('user_id', userId)
          .select();
      } else if (role === 'expert') {
        result = await supabase
          .from('industry_experts')
          .update(updateData)
          .eq('user_id', userId)
          .select();
      } else {
        result = await supabase
          .from('user_profiles')
          .update(updateData)
          .eq('id', userId)
          .select();
      }

      if (result.error) {
        console.error('Update profile error:', result.error);
        return { data: null, error: result.error };
      }
      
      return { data: result.data, error: null };
    } catch (error: any) {
      console.error('Unexpected update profile error:', error);
      return { data: null, error: { message: 'An unexpected error occurred while updating profile' } };
    }
  },

  // Check if user has specific role
  hasRole: async (userId: string, role: UserRole): Promise<boolean> => {
    try {
      const { role: userRole, error } = await authHelpers.getUserRole(userId);
      
      if (error || !userRole) {
        return false;
      }
      
      return userRole === role;
    } catch (error) {
      console.error('Error checking user role:', error);
      return false;
    }
  },

  // Check if user is professional
  isProfessional: async (userId: string): Promise<boolean> => {
    try {
      const { role, error } = await authHelpers.getUserRole(userId);
      
      if (error || !role) {
        return false;
      }
      
      return ['counsellor', 'expert', 'alumni'].includes(role);
    } catch (error) {
      console.error('Error checking professional status:', error);
      return false;
    }
  }
}

// Utility functions
export const utils = {
  // Format user display name
  formatUserName: (user: any) => {
    if (user?.user_metadata?.first_name && user?.user_metadata?.last_name) {
      return `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
    }
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name
    }
    if (user?.email) {
      return user.email.split('@')[0]
    }
    return 'User'
  },

  // Check if user email is verified
  isEmailVerified: (user: any) => {
    return user?.email_confirmed_at !== null
  },

  // Get user initials for avatar
  getUserInitials: (user: any) => {
    const name = utils.formatUserName(user)
    return name
      .split(' ')
      .map((word: string) => word.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2)
  },

  // Get role display name
  getRoleDisplayName: (role: UserRole): string => {
    const roleNames: Record<UserRole, string> = {
      user: 'Student/User',
      counsellor: 'Counsellor',
      expert: 'Industry Expert',
      alumni: 'Alumni'
    }
    return roleNames[role] || 'User'
  },

  // Get dashboard path based on role
  getDashboardPath: (role: UserRole): string => {
    if (['counsellor', 'expert', 'alumni'].includes(role)) {
      return '/professional/dashboard'
    }
    return '/AuthenticatedDashboard'
  },

  // Handle Supabase errors with user-friendly messages
  getErrorMessage: (error: any) => {
    if (!error) return null
    
    const errorMessages: { [key: string]: string } = {
      'Invalid login credentials': 'Invalid email or password. Please try again.',
      'Email not confirmed': 'Please check your email and confirm your account before signing in.',
      'User already registered': 'An account with this email already exists. Please sign in instead.',
      'Password should be at least 6 characters': 'Password must be at least 6 characters long.',
      'Invalid email': 'Please enter a valid email address.',
      'Too many requests': 'Too many attempts. Please wait a few minutes and try again.',
      'Signup requires a valid password': 'Please enter a valid password.',
      'User not found': 'No account found with this email address.',
      'Invalid password': 'The password you entered is incorrect.',
      'PROFILE_NOT_FOUND': 'Your profile was not found. Creating it now...',
    }
    
    if (error.code && errorMessages[error.code]) {
      return errorMessages[error.code];
    }
    
    if (error.message && errorMessages[error.message]) {
      return errorMessages[error.message];
    }
    
    if (error.isPartial) {
      return error.message;
    }
    
    return error.message || 'An unexpected error occurred.'
  }
}

export default supabase