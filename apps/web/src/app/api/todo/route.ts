import { prisma } from '../../../shared/lib/db';

export async function GET() {
  const todo = await prisma.todo.findMany({ orderBy: { id: 'desc' } });

  return Response.json(todo);
}

export async function POST(req: Request) {
  const { title } = await req.json();
  const todo = await prisma.todo.create({ data: { title } });

  return Response.json(todo, { status: 201 });
}
