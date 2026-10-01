import { ConferenceRoom } from '@/widgets/stream-view';

export default async function ConferencePage({ params }: PageProps<'/stream/conference/[id]'>) {
  const { id } = await params;

  return <ConferenceRoom roomId={id} />;
}
