import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { media } from '$lib/server/db/schema';
import { eq, sql } from 'drizzle-orm';
import * as ftp from 'basic-ftp';

export async function load({ locals, url }) {
  if (!locals.user) {
    throw error(401, 'Unauthorized');
  }

  const userId = locals.user.id;
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = 10; // Match frontend itemsPerPage

  try {
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
      .where(eq(media.userId, userId))
      .limit(limit)
      .offset((page - 1) * limit);

    const total = await db
      .select({ count: sql`count(*)` })
      .from(media)
      .where(eq(media.userId, userId))
      .then((res) => Number(res[0].count));
    return {
      userId,
      files,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit,
      },
    };
  } catch (err) {
    console.error('Error loading media:', err);
    throw error(500, 'Server error');
  }
}


