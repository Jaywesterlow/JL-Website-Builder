import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
  // Redirect to /auth if user is not logged in
  if (!locals.user) {
    redirect(302, '/auth');
  }

  return {
    user: locals.user
  };
};


export const actions = {
  logout: async ({ cookies }) => {
    // Clear the session cookie
    cookies.delete('session', {
      path: '/',
      httpOnly: true,
      sameSite: 'strict'
    });
    throw redirect(302, '/auth');
  }
};