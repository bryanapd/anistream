import { Heading } from "@chakra-ui/react";
import Hls from "hls.js";
import { useRouter } from "next/router";
import { useGetAnimeEpisodeQuery } from "../../../features/apiSlice";
import { useState, useEffect } from "react";

import AppLayout from "../../../layout/AppLayout";
import Player from "../../../components/ArtPlayer";
import { AppSpacer } from "../../../components/Header";

const Episode = ({ }) => {
  const router = useRouter()
  const { data: episode, isLoading, isError } = useGetAnimeEpisodeQuery(router.query.id, { skip: !router.query.id })

  var source

  if(episode && !isLoading) {
    const { url } = episode.sources[0]
    source = url
    console.log(source)
  }

  return(
    <AppLayout>
      <Heading>hello {router.query.id}</Heading>
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
            // loop: true,
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
              width: "1000px",
              height: "700px",
              margin: "60px auto 0",
            }}
            // getInstance={(art) => console.log(art)}
          />
        )
      }
      <AppSpacer />
    </AppLayout>
  )
}
export default Episode
