import bcrypt from 'bcrypt';

async function hashPassword() {
  const password = 'password-test';
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('Hashed Password:', hashedPassword);
}

hashPassword();