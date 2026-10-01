import Link from 'next/link';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { buttonVariants } from '@/shared/ui/button';

export default function StreamIndexPage() {
  const defaultRoom = 'test-room';

  const modes = [
    {
      title: 'Broadcast (1 to N)',
      description:
        'Twitch/YouTube format: 1 main streamer in the center with viewer list and chat on the side.',
      href: `/stream/broadcast/${defaultRoom}`,
      actionText: 'Open Broadcast',
      tag: '1 to N',
    },
    {
      title: 'Chat Roulette (1x1)',
      description: '1x1 format: Split screen 50/50 for two participants with live chat.',
      href: `/stream/roulette/${defaultRoom}`,
      actionText: 'Open 1x1',
      tag: '1 v 1',
    },
    {
      title: 'Conference',
      description:
        'Zoom/Meet grid format: Adaptive grid of all participants with controls and pagination.',
      href: `/stream/conference/${defaultRoom}`,
      actionText: 'Open Conference',
      tag: 'Group Call',
    },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Select Broadcast Mode</h1>
        <p className="text-muted-foreground">
          Each page is configured for a specific WebRTC usage scenario using LiveKit components.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {modes.map((mode) => (
          <Card key={mode.title} className="flex flex-col justify-between">
            <CardHeader>
              <div className="mb-2 flex items-center justify-between gap-2">
                <CardTitle className="text-xl">{mode.title}</CardTitle>
                <Badge variant="outline">{mode.tag}</Badge>
              </div>
              <CardDescription>{mode.description}</CardDescription>
            </CardHeader>
            <CardFooter className="pt-4">
              <Link href={mode.href} className={buttonVariants({ className: 'w-full' })}>
                {mode.actionText}
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
