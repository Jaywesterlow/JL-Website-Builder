import { fail, redirect } from "@sveltejs/kit";
import { db } from "$lib/server/db/index.js";
import { users } from "$lib/server/db/schema.js";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

export const actions = {
  default: async ({ request, cookies, locals }) => {
    // Redirect if user is already logged in
    if (locals.user) {
      throw redirect(302, "/dashboard");
    }

    const formData = await request.formData();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
      return fail(400, { error: "Email and password are required." });
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)
      .catch((err) => {
        console.error("Database query error:", err);
        throw new Error("Database query failed");
      });

    if (user.length === 0) {
      return fail(401, { error: "Invalid email or password." });
    }

    if (password !== user[0].password_hash) {
      return fail(401, { error: "Invalid email or password." });
    }

    const sessionId = user[0].id.toString();
    cookies.set("session", sessionId, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    locals.user = {
      id: user[0].id,
      name: user[0].name,
      email: user[0].email,
    };

    throw redirect(302, "/dashboard");
  },
};

export const load = async ({ locals }) => {
  if (locals.user) {
    throw redirect(302, "/dashboard");
  }
  return {};
};
