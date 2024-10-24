import { useSupabaseClient } from "#imports";
import type { Database } from "~/schema";

export default defineNuxtPlugin(async () => {
  const supabase = useSupabaseClient<Database>();

  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'INITIAL_SESSION' && session) {
      const userRole = localStorage.getItem('userRole');

      const user = session?.user;

      const {error} = await supabase
        .from('profiles')
        .update({ role: userRole as string })
        .eq('id', user?.id)
      
      if (error) {
        createError({
          message: error.message
        })
      }

      localStorage.removeItem('userRole');
    }


    if (event === 'SIGNED_IN' && session) {
      const providerToken = session.provider_token;

      if( providerToken) localStorage.setItem('provider_token', providerToken);
    }
  })
})