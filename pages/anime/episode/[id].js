import { Heading } from "@chakra-ui/react";
import Hls from "hls.js";
import { useRouter } from "next/router";
import { useGetAnimeEpisodeQuery } from "../../../features/apiSlice";

import AppLayout from "../../../layout/AppLayout";
import ArtPlayer from "../../../components/ArtPlayer";

const Episode = ({ }) => {
  const router = useRouter()
  const { data: episode, isLoading, isError } = useGetAnimeEpisodeQuery(router.query.id, { skip: !router.query.id })

  return(
    <AppLayout>
      <Heading>hello {router.query.id}</Heading>
      <ArtPlayer
        option={{
        url: 'https://cache.387e6278d8e06083d813358762e0ac63.com/222847925133.m3u8',
        title: "【新海诚动画】『秒速5センチメートル』",
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
        getInstance={(art) => console.log(art)}
      />
    </AppLayout>
  )
}
export default Episode