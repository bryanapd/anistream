import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { theme } from '../theme'
import store from '../app/store'

import '../styles/globals.css'

// // Default theme. ~960B
import '@vime/core/themes/default.css';
// // Optional light theme (extends default). ~400B
import '@vime/core/themes/light.css';

//Splide Default theme
import '@splidejs/react-splide/css';
// or other themes
import '@splidejs/react-splide/css/skyblue';
import '@splidejs/react-splide/css/sea-green';
// or only core styles
import '@splidejs/react-splide/css/core';

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/bundle";

function MyApp({ Component, pageProps }) {
  return (
   <Provider store={store}>
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
   </Provider>
  )
}

export default MyApp