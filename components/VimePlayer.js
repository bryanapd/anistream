// Default theme. ~960B
import '@vime/core/themes/default.css';

// Optional light theme (extends default). ~400B
import '@vime/core/themes/light.css';

import { Player as VimePlayer, Hls, DefaultUi } from '@vime/react'


const Player = ({ source = 'https://c-an-ca3.betterstream.cc:2223/v2-hls-playback/8b2fd11c083775d113781d4d1387e30be24eb41cd50eef7bce0d61a4dba1670a46070e247ba414b9bab52625b5af9bb51f70bd0bcdec53029572ff38da2d42d12060454125d13566bbd7e573772f0a092cfdca11613d3408d9bbb15eaf53fa1b6bd41b71766335c977b79889c0618321784fbf186e6a54052c920c247053a72010b1a7d6ffd6759778113220ad8f4ac7ecf78e41fd25e92780051a071fd255cec19704db26627894c7d49b4b26515e21/index-f1-v1-a1.m3u8' }) => (
  <VimePlayer theme="dark">
    <Hls crossOrigin poster="https://media.vimejs.com/poster.png">
      <source
        src={source}
        type="application/x-mpegURL"
        />
    </Hls>
    <DefaultUi />
  </VimePlayer>
)

export default Player