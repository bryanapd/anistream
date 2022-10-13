import { ChakraProvider } from '@chakra-ui/react'
import { wrapper } from '../features/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'react-hot-toast';
import { theme } from '../theme'
import { store, persistor } from '../features/store';


import '../styles/globals.css'
// // Default theme. ~960B
import '@vime/core/themes/default.css';
// // Optional light theme (extends default). ~400B
import '@vime/core/themes/light.css';
// Import Swiper styles
// import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/bundle";

function MyApp({ Component, pageProps }) {
  return (
   <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}> {/* Spinner for loading */}
      <ChakraProvider theme={theme}>
        <Toaster />
        <Component {...pageProps} />
      </ChakraProvider>
    </PersistGate>
  </Provider>
  )
}

export default wrapper.withRedux(MyApp)