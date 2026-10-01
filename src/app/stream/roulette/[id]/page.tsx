import { ChatRouletteRoom } from '@/widgets/stream-view';

export default async function RoulettePage({ params }: PageProps<'/stream/roulette/[id]'>) {
  const { id } = await params;

  return <ChatRouletteRoom roomId={id} />;
}
