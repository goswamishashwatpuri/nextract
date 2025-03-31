'use server';
import { auth } from '@clerk/nextjs/server';

import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
export async function getWorkflowsForUser() {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return prisma.workflow.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
}
