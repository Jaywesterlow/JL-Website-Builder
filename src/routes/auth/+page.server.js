import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { users } from '$lib/server/db/schema.js';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm'; // Ensure correct import of eq for comparison

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');


    //console.log(formData);
    if (!email || !password) {
      return fail(400, { error: 'Email and password are required.' });
    }

    try {
      // Ensure the correct query syntax
      const user = await db
        .select()
        .from(users)
        .where(eq(users.email, email)) // Use 'eq' correctly for comparison
        .limit(1);


      console.log(user);
      if (user.length === 0) {
        return fail(401, { error: 'Invalid email or password.' });
      }

      console.log(user[0].password_hash);
      console.log(password);
     // const isPasswordValid = await bcrypt.compare(password, user[0].password_hash);
     if (password !== user[0].password_hash) {
        return fail(401, { error: 'Invalid email or password.' });
      }

      // Optional: Redirect to dashboard
      // throw redirect(302, '/dashboard');

      return {
        success: true,
        user: {
          id: user[0].id,
          name: user[0].name,
          email: user[0].email
        }
      };
    } catch (err) {
      console.error('Login error:', err);
      return fail(500, { error: 'Server error. Please try again later.' });
    }
  }
};
