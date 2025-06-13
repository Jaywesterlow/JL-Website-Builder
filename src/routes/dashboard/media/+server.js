import { error, json } from '@sveltejs/kit';
import { media } from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import path from 'path';
import { Buffer } from 'buffer';
import * as ftp from 'basic-ftp';
import { Readable } from 'stream';
import { eq, sql } from 'drizzle-orm'; 



const allowedMimeTypes = {
  image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  document: ['application/pdf'],
  video: ['video/mp4', 'video/mpeg', 'video/webm']
};

// FTP credentials
const FTP_CONFIG = {
  host: process.env.SFTP_HOST,
  user: process.env.SFTP_USERNAME,
  password: process.env.SFTP_PASSWORD,
  secure: false // set true if your server supports FTPS
};

async function uploadToFTP(arrayBuffer, remotePath) {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    await client.access(FTP_CONFIG);

    const remoteDir = path.dirname(remotePath);
    await client.ensureDir(remoteDir);

    // Convert ArrayBuffer → Buffer → Readable Stream
    const buffer = Buffer.from(arrayBuffer);
    const stream = Readable.from(buffer);

    await client.uploadFrom(stream, remotePath);
    console.log(`✅ Uploaded to FTP: ${remotePath}`);
  } catch (err) {
    console.error('FTP upload error:', err.message);
    throw error(500, 'FTP upload failed');
  } finally {
    client.close();
  }
}


export async function POST({ locals, request }) {
  if (!locals.user) throw error(401, 'Unauthorized');
  const userId = locals.user.id;

  const formData = await request.formData();
  const files = formData.getAll('files');
  if (!files || files.length === 0) throw error(400, 'No files uploaded');

  const uploadedFiles = [];

  for (const file of files) {
    if (!(file instanceof File) || file.size === 0) continue;

    let fileType = null;
    if (allowedMimeTypes.image.includes(file.type)) fileType = 'image';
    else if (allowedMimeTypes.document.includes(file.type)) fileType = 'document';
    else if (allowedMimeTypes.video.includes(file.type)) fileType = 'video';
    else continue;

    if (file.size > 10 * 1024 * 1024) throw error(400, `File ${file.name} exceeds 10MB limit`);

    const fileExt = path.extname(file.name);
    const fileBase = path.basename(file.name, fileExt);
    const uniqueFileName = `${fileBase}-${Date.now()}${fileExt}`;
    const ftpFilePath = `/file-uploads/${uniqueFileName}`;

    try {
      const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer); // Convert ArrayBuffer to Node.js Buffer
		const stream = Readable.from(buffer);    // Now this works

      await uploadToFTP(buffer, ftpFilePath);

      // Save metadata to DB
      await db.insert(media).values({
        userId,
        fileName: file.name,
        filePath: ftpFilePath,
        fileType,
        fileSize: file.size,
        mimeType: file.type,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const [mediaEntry] = await db
        .select()
        .from(media)
        .where(media.fileName === file.name)
        .where(media.userId === userId)
        .limit(1);

      if (mediaEntry) uploadedFiles.push(mediaEntry);
    } catch (err) {
      console.error('Upload failed:', err);
      throw error(500, `Upload failed for file ${file.name}`);
    }
  }

  if (uploadedFiles.length === 0) throw error(400, 'No valid files were uploaded');
  return json({ files: uploadedFiles }, { status: 201 });
}


export async function GET({ locals, url }) {
  if (!locals.user) throw error(401, 'Unauthorized');
  const userId = locals.user.id;

  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = parseInt(url.searchParams.get('limit') || '10');
  const search = url.searchParams.get('search') || '';
  const filter = url.searchParams.get('filter') || 'all';
  const sort = url.searchParams.get('sort') || 'createdAt';
  const sortOrder = url.searchParams.get('sortOrder') === 'asc' ? 'asc' : 'desc';

  try {
    const conditions = [eq(media.userId, userId)];

    if (filter !== 'all') {
      conditions.push(eq(media.fileType, filter));
    }

    if (search) {
      conditions.push(sql`${media.fileName} LIKE ${'%' + search + '%'}`);
    }

    const sortColumnMap = {
      createdAt: media.createdAt,
      fileName: media.fileName,
    };

    const sortColumn = sortColumnMap[sort] || media.createdAt;

    const files = await db
      .select({
        id: media.id,
        fileName: media.fileName,
        filePath: media.filePath,
        fileType: media.fileType,
        fileSize: media.fileSize,
        mimeType: media.mimeType,
        createdAt: media.createdAt,
      })
      .from(media)
      .where(sql.join(conditions, sql` AND `))
      .orderBy(sortOrder === 'asc' ? sql`${sortColumn} ASC` : sql`${sortColumn} DESC`)
      .limit(limit)
      .offset((page - 1) * limit);

    const total = await db
      .select({ count: sql`count(*)` })
      .from(media)
      .where(sql.join(conditions, sql` AND `))
      .then((res) => Number(res[0].count));

    return json({
      files,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit,
      }
    });
  } catch (err) {
    console.error('GET error:', err);
    throw error(500, 'Failed to fetch media');
  }
}

