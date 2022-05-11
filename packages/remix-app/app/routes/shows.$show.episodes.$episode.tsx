import React from 'react';
import { Link } from "@remix-run/react";

import { Card, CardContainer } from '~/components/card';
import { useLoaderData } from 'remix';
import { getFeedInfoBySlug, getFeedItemByGuid } from '~/shared/podcast-api.server';

// @ts-ignore
export const loader = async ({params, req, res}) => {
  // TODO - these are waterfall, oy.
  try {
    const results = await Promise.all([getFeedItemByGuid(params.episode), getFeedInfoBySlug(params.show)]);
    if (results?.length === 2) {
      return {feedItem: results[0], showInfo: results[1]};
    } else {
      return {error: "incorrect responses"};
    }
  } catch (e) {
    return { error: e };
  }
}

export default function PodcastEpisode() {
  const loader = useLoaderData();
  const { feedItem, showInfo } = loader;
  return (
    <>
      <Link to={`/shows/${showInfo.slug}`}>
        <button className="text-right p-4 m-4 text-white bg-blue-500 rounded-lg">
          Back to Podcast
        </button>
      </Link>
      <Card
        title={feedItem.title}>
        <div className="grid grid-cols-2 gap-4">
          <div className="columns-1">
            <img src={showInfo.imageUrl} alt={feedItem.title} width={200} height={200}/>
          </div>
          <div>
            <div className="pb-1"><span className="text-lg font-bold pr-5">Publication Date</span><span>{showInfo.pubDate}</span></div>
            <audio
              controls
              preload="none"
              src={feedItem.enclosureUrl}>
              Your browser does not support the <code>audio</code> element.
            </audio>
          </div>
        </div>

        <h4 className="
        font-bold sans
       ">
          Show Notes
        </h4>
        <div
          className="
          h-4/5
          overflow-clip
          overflow-y-scroll
          box-border
          pb-2
          ml-2
          mr-2
          w-full
          "
          dangerouslySetInnerHTML={{ __html: feedItem.description}} />
      </Card>
    </>
  );

  // return (
  //   <>
  //     <div className="container">
  //
  //       <CardContainer
  //         title={showInfo.name}
  //         description={
  //           <div dangerouslySetInnerHTML={{ __html: showInfo.description}} />
  //         }
  //         cards={episodeCards} />
  //     </div>
  //   </>
  // );
}
