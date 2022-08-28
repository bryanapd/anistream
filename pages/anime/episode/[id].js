import { Box, Heading } from "@chakra-ui/react";
import Hls from "hls.js";
import { useRouter } from "next/router";
import { useGetAnimeEpisodeByIdQuery } from "../../../features/apiSlice";
import { useState, useEffect } from "react";

import AppLayout from "../../../layout/AppLayout";
import Player from "../../../components/ArtPlayer";
import { AppSpacer } from "../../../components/Header";

import { IoSettings } from "react-icons/io5";

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
    console.log("subs", subtitle)
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
          <Player
            option={{
            url: source,
            // title: "【新海诚动画】『秒速5センチメートル』",
            // poster: url + "/image/one-more-time-one-more-chance-poster.jpg",
            volume: 0.5,
            muted: false,
            autoplay: true,
            pip: true,
            autoSize: true,
            screenshot: true,
            setting: true,
            loop: true,
            playbackRate: true,
            aspectRatio: true,
            fullscreen: true,
            fullscreenWeb: true,
            mutex: true,
            theme: "#ffad00",
            // lang: "en",
            moreVideoAttr: {
              crossOrigin: "anonymous"
            },
            subtitle: {
              url: subtitle.url,
              type: 'vtt',
              style: {
                color: '#ffffff',
              },
            },
            customType: {
              m3u8: function (video, url) {
                if (Hls.isSupported()) {
                    const hls = new Hls();
                    hls.loadSource(url);
                    hls.attachMedia(video);
                } else {
                  const canPlay = video.canPlayType('application/vnd.apple.mpegurl');
                  if (canPlay === 'probably' || canPlay == 'maybe') {
                    video.src = url;
                  } else {
                    art.notice.show = 'Does not support playback of m3u8';
                  }
                }
              },
            },
          }}
            style={{
              width: "100vw",
              height: "100vh",
              margin: "60px auto 0",
            }}
            // getInstance={(art) => console.log(art)}
          />
        )
      }
    </Box>
  )
}
export default Episode
