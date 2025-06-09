import { db } from '$lib/server/db/index.js';
import { users } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
	 if (event.url.pathname.startsWith('/.well-known')) {
    return new Response('Not found', { status: 404 });
  }
  
  const sessionId = event.cookies.get('session');

  if (!sessionId) {
    event.locals.user = null;
    if (event.url.pathname.startsWith('/dashboard')) {
      redirect(302, '/auth');
    }
  } else {
    try {
      const user = await db
        .select({
          id: users.id,
          name: users.name,
          email: users.email
        })
        .from(users)
        .where(eq(users.id, parseInt(sessionId)))
        .limit(1);

      if (user.length > 0) {
        event.locals.user = user[0];
      } else {
        event.cookies.delete('session', { path: '/' });
        event.locals.user = null;
        if (event.url.pathname.startsWith('/dashboard')) {
          redirect(302, '/auth');
        }
      }
    } catch (err) {
      console.error('Error fetching user:', err);
      event.locals.user = null;
      if (event.url.pathname.startsWith('/dashboard')) {
        redirect(302, '/auth');
      }
    }
  }

  if (event.locals.user && event.url.pathname === '/auth') {
    redirect(302, '/dashboard');
  }

  return resolve(event);
}