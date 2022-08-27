import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { theme } from '../theme'
import store from '../app/store'

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