import { db } from '$lib/server/db/index.js';
import { sessions } from '$lib/server/db/schema.js'; // your sessions table schema
import { users } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';

export async function getUserBySession(sessionId) {
  if (!sessionId) return null;

  // Join sessions with users to get user info for sessionId
  const result = await db
    .select({
      userId: users.id,
      email: users.email,
      name: users.name
    })
    .from(sessions)
    .innerJoin(users, eq(users.id, sessions.user_id))
    .where(eq(sessions.session_id, sessionId))
    .limit(1);

  if (result.length === 0) {
    return null;
  }

  return result[0];
}
