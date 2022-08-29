import { Box, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useGetAnimeEpisodeByIdQuery } from "../../../features/apiSlice";
import { useState, useEffect } from "react";

import AppLayout from "../../../layout/AppLayout";
import { AppSpacer } from "../../../components/Header";
import { Player, Hls, DefaultUi, DefaultControls } from "@vime/react";


const Episode = ({ }) => {
  const router = useRouter()
  const { data: episode, isLoading, isError } = useGetAnimeEpisodeByIdQuery(router.query.id, { skip: !router.query.id })

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
    <Box>
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
    </Box>
  )
}
export default Episode
