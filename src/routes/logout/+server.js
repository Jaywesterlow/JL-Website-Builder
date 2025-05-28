import { redirect } from '@sveltejs/kit';

export const GET = async ({ cookies }) => {
  // Delete the session cookie
  cookies.delete('session_id', {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production'
  });

  // Redirect to login page after logout
  throw redirect(303, '/auth');
};
