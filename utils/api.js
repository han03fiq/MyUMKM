import { supabase } from '../utils/supabase';

export async function signInWithEmail(email, password) {
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) throw error;
}

export async function signUpWithEmail(username, email, password) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  if (error) throw error;

  const user = data.user;
  if (user) {
    const { error: insertError } = await supabase
      .from('Account')
      .insert({ id: user.id, username: username });
    if (insertError) throw insertError;
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
