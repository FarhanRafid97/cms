import { supabase } from '@/lib/supabase';
import { CreateAuthor } from '@/schema/user/author';
import { toast } from 'sonner';

export const getListUser = async () => {
  const { data, error } = await supabase.from('authors').select('*');
  if (error) {
    throw error;
  }
  return data;
};

export const inviteUser = async (email: string) => {
  try {
    const { data, error } = await supabase.auth.admin.inviteUserByEmail(email);
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const insertBiodataUser = async ({ payload }: { payload: CreateAuthor }) => {
  try {
    const trimmedPayload: CreateAuthor = {
      avatar_url: payload.avatar_url.trim(),
      email: payload.email.trim(),
      first_name: payload.first_name.trim(),
      last_name: payload.last_name.trim(),
      role_id: payload.role_id,
      user_id: payload.user_id,
      username: payload.username.trim(),
      bio: payload.bio?.trim(),
      social_links: Object.fromEntries(
        Object.entries(payload.social_links).map(([key, value]) => [key, value.trim()]),
      ),
    };
    const { error } = await supabase.from('authors').insert(trimmedPayload);
    if (error) {
      throw error;
    }
    return true;
  } catch (error) {
    toast.error('Gagal Pembaruan data');
  }
};
