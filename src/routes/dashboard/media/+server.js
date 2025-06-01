// import { json } from '@sveltejs/kit';
// import { db } from '$lib/db'; // 
// import { media } from '$lib/schema';
// import path from 'path';
// import fs from 'fs/promises';

// const uploadDir = 'static/uploads';

// export async function POST({ request }) {
//   const formData = await request.formData();
//   const file = formData.get('file');
//   const userId = formData.get('user_id');

//   if (!file || !userId) {
//     return json({ error: 'Missing file or user_id' }, { status: 400 });
//   }

//   const arrayBuffer = await file.arrayBuffer();
//   const buffer = Buffer.from(arrayBuffer);
//   const filename = `${Date.now()}-${file.name}`;
//   const filePath = path.join(uploadDir, filename);

//   try {
//     await fs.mkdir(uploadDir, { recursive: true });
//     await fs.writeFile(filePath, buffer);

//     // Store file metadata in DB
//     await db.insert(media).values({
//       userId: parseInt(userId),
//       media: `/uploads/${filename}`,
//       filename: file.name,
//       mimeType: file.type,
//       size: file.size,
//     });

//     return json({ success: true, path: `/uploads/${filename}` });
//   } catch (err) {
//     console.error(err);
//     return json({ error: 'Upload failed' }, { status: 500 });
//   }
// }
