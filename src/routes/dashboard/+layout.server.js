import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {

	console.log(locals);
  if (!locals.user) {
    redirect(302, '/auth');
  }

  return {
    user: locals.user,
    url: locals.url // Pass the URL if needed for the layout
  };
};

