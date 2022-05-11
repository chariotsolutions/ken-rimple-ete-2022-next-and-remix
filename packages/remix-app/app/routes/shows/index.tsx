import { Link, useLoaderData } from '@remix-run/react';
import { getFeeds } from '~/shared/podcast-api.server';
import { ImageCard, CardContainer } from '~/components/card';
// TODO - would rather use the built dist files
import type { FeedDetails } from '@powerplayer/shared/src/domains';
import React from 'react';

// export const links = () => [
//   ...cardContainerLinks(),
//   ...cardLinks()
// ]

export const loader = async () => {
  return await getFeeds();
};

// NOTE here's a loader using server-side fetch...
// export const loader = async () => {
//   console.log('loader is running here...')
//   const request = await fetch(`http://localhost:3010/podcasts/feed?delayResponse=true&uri=https%3A%2F%2Fchariotsolutions.com%2Fpodcasts%2Fshow%2Ftechcast%2Ffeed%2F`);
//   return await request.json();
// };

export function ErrorBoundary(context: any) {
  console.dir(context);
  return (
    <p>Error in shows/index.tsx Error!</p>
  )
}
export default function Shows() {
  const feedData = useLoaderData();

  const cards = feedData.map((p: FeedDetails) => (
    <ImageCard
      key={p.slug}
      image={p.imageUrl}>
      <div className="
        p-6 py-4 h-auto
        overflow-clip"
           dangerouslySetInnerHTML={{ __html: p.description }} />
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
        <Link to={`${p.slug}`}>Show Details</Link></button>
    </ImageCard>
  ));
  return (
    <CardContainer title="Your podcasts..." cards={ cards }/>
  )
};
