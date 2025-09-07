// lib/supabase.tsx
import { createClient } from '@supabase/supabase-js'

// Replace with your actual Supabase project URL and anon key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Helper functions for authentication
export const authHelpers = {
  // Sign up a new user
  signUp: async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            firstName,
            lastName,
            full_name: `${firstName} ${lastName}`,
          }
        }
      })
      
      if (error) {
        console.error('Signup error:', error)
        return { data: null, error }
      }
      
      return { data, error: null }
    } catch (error) {
      console.error('Unexpected signup error:', error)
      return { data: null, error: { message: 'An unexpected error occurred during signup' } }
    }
  },

  // Sign in an existing user
  signIn: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) {
        console.error('Signin error:', error)
        return { data: null, error }
      }
      
      return { data, error: null }
    } catch (error) {
      console.error('Unexpected signin error:', error)
      return { data: null, error: { message: 'An unexpected error occurred during signin' } }
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
    } catch (error) {
      console.error('Unexpected signout error:', error)
      return { error: { message: 'An unexpected error occurred during signout' } }
    }
  },

  // Reset password
  resetPassword: async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      
      if (error) {
        console.error('Password reset error:', error)
        return { error }
      }
      
      return { error: null }
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
      console.error('Unexpected get user error:', error)
      return { user: null, error: { message: 'An unexpected error occurred while getting user' } }
    }
  }
}

// Database helper functions (for when you add database tables)
export const dbHelpers = {
  // Create user profile in database
  createUserProfile: async (userId: string, profileData: any) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert([
          {
            id: userId,
            ...profileData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }
        ])
        .select()
      
      if (error) {
        console.error('Create profile error:', error)
        return { data: null, error }
      }
      
      return { data, error: null }
    } catch (error) {
      console.error('Unexpected create profile error:', error)
      return { data: null, error: { message: 'An unexpected error occurred while creating profile' } }
    }
  },

  // Get user profile from database
  getUserProfile: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      
      if (error) {
        console.error('Get profile error:', error)
        return { data: null, error }
      }
      
      return { data, error: null }
    } catch (error) {
      console.error('Unexpected get profile error:', error)
      return { data: null, error: { message: 'An unexpected error occurred while getting profile' } }
    }
  },

  // Update user profile in database
  updateUserProfile: async (userId: string, updates: any) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId)
        .select()
      
      if (error) {
        console.error('Update profile error:', error)
        return { data: null, error }
      }
      
      return { data, error: null }
    } catch (error) {
      console.error('Unexpected update profile error:', error)
      return { data: null, error: { message: 'An unexpected error occurred while updating profile' } }
    }
  }
}

// Utility functions
export const utils = {
  // Format user display name
  formatUserName: (user: any) => {
    if (user?.user_metadata?.firstName && user?.user_metadata?.lastName) {
      return `${user.user_metadata.firstName} ${user.user_metadata.lastName}`
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
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2)
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
    }
    
    return errorMessages[error.message] || error.message || 'An unexpected error occurred.'
  }
}

export default supabase