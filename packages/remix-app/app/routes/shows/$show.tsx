import React from 'react';
import { Link } from "@remix-run/react";

import { useLoaderData } from 'remix';
import { getFeedAndEpisodesBySlug } from '~/shared/podcast-api.server';

// @ts-ignore
export const loader = async ({params}) => {
  // get route param for slug
  return await getFeedAndEpisodesBySlug(params.show);
}

export function ErrorBoundary(context: any) {
  console.dir(context);
  return (
    <p>Error for show!</p>
  )
}

export default function Show() {
  const loader = useLoaderData();
  const { episodes } = loader;
  const episodeRows = episodes.map((e:any) => (
    <tr key={e.guid}>
      <td>{e.pubDate}</td>
      <td>{e.title}</td>
      <td><div dangerouslySetInnerHTML={{__html: (e.description?.slice(0, 100) || 'no show notes') }}/></td>
      <td><Link to={`episodes/${e.guid}`}>Listen to {e.guid}</Link></td>
    </tr>
  ));
    // <Card
    //   key={e.guid}
    //   title={e.title}>
    //   <div className="grid grid-cols-2 gap-4">
    //    <div>
    //       <div className="pb-1"><span className="text-lg font-bold pr-5">Publication Date</span><span>{e.pubDate}</span></div>
    //   </div>
    //   </div>
    //
    //   <h4 className="
    //     font-bold sans
    //    ">
    //     Show Notes
    //   </h4>
    //   <div className="columns-1">
    //     <img src={feedDetails.imageUrl} alt={e.title} width={200} height={200}/>
    //   </div>
    //   <div
    //     className="
    //       h-4/5
    //       overflow-clip
    //       overflow-y-scroll
    //       box-border
    //       pb-2
    //       ml-2
    //       mr-2
    //       w-full
    //       "
    //     dangerouslySetInnerHTML={{ __html: e.description}} />
    // </Card>

  return (
    <table>
      <thead>
        <tr>
          <th>Published on</th>
          <th>Title</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
         {episodeRows}
      </tbody>
    </table>
    // <>
    //   <div className="container">
    //     <Link to={"/podcasts"}>
    //       <button className="text-right p-4 m-4 text-white bg-blue-500 rounded-lg">
    //         Back to Podcasts
    //       </button>
    //     </Link>
    //
    //     <CardContainer
    //       title={feedDetails.name}
    //       description={
    //         <div dangerouslySetInnerHTML={{ __html: feedDetails.description}} />
    //       }
    //       cards={episodeCards} />
    //   </div>
    // </>
  );
}
