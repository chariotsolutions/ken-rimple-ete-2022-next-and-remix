import React from 'react';
import { useRouter } from 'next/router';
import { FeedDetails } from '@powerplayer/shared';
import { ImageCard, CardContainer } from '@/components/card';
import { getFeeds } from '@/api/podcasts';
import Link from 'next/link';

/**
 * SSR loading function
 */
export async function getServerSideProps() {
  const data = await getFeeds();
  return { props: { feeds: [...data]}};
}

export default function Podcasts({feeds}) {

  const router = useRouter();

  const cards = feeds.map((p:FeedDetails) =>
    <ImageCard
      key={p.slug}
      image={p.imageUrl}>
      <div
        className="
          p-6 py-4 h-auto
          overflow-clip"
        dangerouslySetInnerHTML={{__html: p.description}} />
      <button className="
        absolute
        bottom-2
        right-2
        rounded-lg
        float-right
        align-bottom
        bg-blue-500
        h-auto
        p-3
        text-white
      ">
        <Link href={`/ssr/podcast/${p.slug}`}>Show Details</Link>
      </button>
    </ImageCard>);
  return (
    <CardContainer title="Server-side rendered podcasts" cols={3} cards={cards} />
  );
}