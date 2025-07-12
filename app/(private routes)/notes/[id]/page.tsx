import { getSingleServerNote } from '@/lib/api/serverApi';
import NoteDetailsClient from './NoteDetails.client';
import { Metadata } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';

interface NoteDetailsProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: NoteDetailsProps): Promise<Metadata> {
  const { id } = await params;
  const note = await getSingleServerNote(id);
  return {
    title: note.title,
    description: note.content?.slice(0, 150),
    openGraph: {
      title: note.title,
      description: note.content?.slice(0, 150),
      url: `/notes/${id}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub Open Graph Image',
        },
      ],
    },
  };
}

const NoteDetails = async ({ params }: NoteDetailsProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => getSingleServerNote(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
};

export default NoteDetails;
