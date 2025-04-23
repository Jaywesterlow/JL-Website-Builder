// import { db } from '$lib/server/db/index.js';
// import { users } from '$lib/server/db/schema.js';
// import bcrypt from 'bcrypt';

// export const actions = {
//   login: async ({ request }) => {
//     const formData = await request.formData();
//     const email = formData.get('email');
//     const password = formData.get('password');

//     if (!email || !password) {
//       return { error: 'Email and password are required.' };
//     }

//     try {
//       const user = await db
//         .select()
//         .from(users)
//         .where(users.email.eq(email))
//         .limit(1);

//       if (user.length === 0) {
//         return { error: 'Invalid email or password.' };
//       }

//       const isPasswordValid = await bcrypt.compare(password, user[0].password_hash);
//       if (!isPasswordValid) {
//         return { error: 'Invalid email or password.' };
//       }

//       return {
//         success: true,
//         user: {
//           id: user[0].id,
//           name: user[0].name,
//           email: user[0].email,
//         },
//       };
//     } catch (error) {
//       console.error('Error during login:', error);
//       return { error: 'An unexpected error occurred. Please try again later.' };
//     }
//   },
// };