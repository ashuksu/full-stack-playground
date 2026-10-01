import { BroadcastStreamRoom } from '@/widgets/stream-view';

export default async function BroadcastPage({ params }: PageProps<'/stream/broadcast/[id]'>) {
  const { id } = await params;

  return <BroadcastStreamRoom roomId={id} />;
}
