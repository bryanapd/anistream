import { Fragment, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Player, Hls, DefaultUi, DefaultControls } from "@vime/react";
import { useGetAnimeEpisodeByIdQuery } from "../../../features/api/apiSlice";


const Episode = ({ }) => {
  const router = useRouter()
  const { data: episode, isLoading } = useGetAnimeEpisodeByIdQuery(router.query.id, { skip: !router.query.id })

  var source 
  var subtitle

  if(episode && subtitle == null) {
    episode.subtitles
      .filter(f => f.lang == 'English')
      .map(filteredSub => {
        subtitle = filteredSub
      })
    console.log("subs", subtitle.url)
  }

  if(episode && !isLoading) {
    const { url } = episode.sources[0]
    source = url
    console.log(episode)
    console.log('new source', source)
  }

  return(
    <div>
      {
        episode && (
          <Player theme="dark">
            <Hls crossOrigin>
              <source src={source} type="application/x-mpegURL" />
              <track 
                default 
                kind="subtitles"
                src={subtitle.url} 
                srcLang="en" 
                label={subtitle.lang} />
            </Hls>
            <DefaultUi noControls>
              <DefaultControls hideOnMouseLeave activeDuration={2000} />
            </DefaultUi>
          </Player>
        )
      }
    </div>
  )
}
export default Episode
