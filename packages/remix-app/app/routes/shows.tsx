import { Outlet } from '@remix-run/react';
import React from 'react';

// export const links = () => [
//   ...cardContainerLinks(),
//   ...cardLinks()
// ]

// NOTE here's a loader using server-side fetch...
// export const loader = async () => {
//   console.log('loader is running here...')
//   const request = await fetch(`http://localhost:3010/podcasts/feed?delayResponse=true&uri=https%3A%2F%2Fchariotsolutions.com%2Fpodcasts%2Fshow%2Ftechcast%2Ffeed%2F`);
//   return await request.json();
// };

export default function Shows() {
  return (
    <>
      <p>Nav goes here</p>
      <Outlet />
    </>
  );
};

export function ErrorBoundary(context: any) {
  console.dir(context);
  return (
    <p>Error for shows.tsx!</p>
  )
}
