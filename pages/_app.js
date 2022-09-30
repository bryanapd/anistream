import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast';
import { theme } from '../theme'
import store from '../app/store'

import '../styles/globals.css'

// // Default theme. ~960B
import '@vime/core/themes/default.css';
// // Optional light theme (extends default). ~400B
import '@vime/core/themes/light.css';

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
      <Toaster />
      <Component {...pageProps} />
    </ChakraProvider>
   </Provider>
  )
}

export default MyApp