import Head from "next/head"
import { Fragment, useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/router"

import { 
  Box, Button, Container, Flex, Heading, HStack, IconButton, Img, 
  Input, Spacer, Spinner, Text, useColorMode, useColorModeValue as mode
} from "@chakra-ui/react"
import { 
  IoChevronDown, IoChevronUp, IoMoonOutline, IoSearch, IoSunnyOutline 
} from "react-icons/io5"

import { AppBrand, AppHeader, AppLinks, AppSpacer } from "../components/Header"

import useDebounce from "../hooks/useDebounce"
import { useGetAnimeSearchQuery } from "../features/apiSlice"


const routes = [
  {
    path: '/',
    label: 'Explore'
  },
]

const QueryCard = ({ id, image, title, status, type, rating, totalEpisodes, releaseDate, color = '#ffff' }) => (
  <Link href={`/anime/${id}`} passHref>
    <HStack alignItems="flex-start" cursor="pointer" _hover={{ bg: '#436bf1' }} p={2}>
      <Img 
        h="auto" w="full"
        maxH="70px" maxW="50px"
        src={image} 
        objectFit="cover" 
        />
      <Box>
        <Text fontSize="sm" fontWeight="medium" color="yellow.500" noOfLines={2}>{title.romaji}</Text>
        <Text fontSize="xs" color="white">{status} &bull; {type} &bull; <Text as="span">{releaseDate}</Text> </Text>
      </Box>
    </HStack>
  </Link>
)

const AppLayout = ({ children, withFooter }) => {
  let result
  const router = useRouter()
  const ref = useRef(null)
  const { colorMode, toggleColorMode } = useColorMode()
  const [visible, setVisible] = useState(false)
  const [query, setQuery] = useState('')
  const [hideResult, setHideResult] = useState(false)
  const [backdrop, setBackdrop] = useState('0px')
  const debouncedSearchQuery = useDebounce(query, 2000)

  const { data, isLoading, isFetching, isError } = useGetAnimeSearchQuery(query, { skip: debouncedSearchQuery == '' })
  if(isLoading){
    console.log('is loading', isLoading)
  }else if(isError){
    console.log('Search error?', isError)
  }else if(data){
    const { results } = data
    result = results
  }

  const searchHandler = e => {
    if(query == ''){
      setQuery('')
    } 
    setQuery(e.target.value)
  }

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if(ref.current && ref.current.contains(event.target)){
          setHideResult(false)
        }else if (ref.current && !ref.current.contains(event.target)) {
          setHideResult(true)
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const backdropHandler = () => {
    window.scrollY > 400 ? setBackdrop('8px') : setBackdrop('0px')
  }

  const loadSearchHandler = query => {
    router.push({
      pathname: '/search',
      query: {
        name: query
      }
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', backdropHandler)
  }, [])

  // useOutsideAlerter(ref)
  return(
    <Fragment>
      <Head>
      </Head>
      <AppHeader boxStyle={{ backdropFilter: `blur(${backdrop})` }}>
        <AppBrand logo="../../../hat-icon.png" />
        {/* <AppLinks routes={routes} router={router} /> */}
        <Spacer />
        {
          visible && (
            <Box pos="relative">
              <Input 
                ref={ref} value={query} 
                variant="solid" 
                rounded={0} 
                w={{ base: 'auto', md: '300px' }} 
                onChange={searchHandler} 
                transition="all 300ms ease" 
                placeholder="Search your favorite anime..."
                _placeholder={{ fontSize: 'xs' }} />
              {
                result && hideResult == false && (
                  <Flex w="300px" flexDir="column" bg="black" pos="fixed" overflow="hidden" zIndex="9999999999999999">
                    { !result && <Spinner size="sm" color="yellow.500" /> }
                    { 
                      result && [...result]
                        .sort((a,b) => a.title.romaji.localeCompare(b.title.romaji) && b.rating - a.rating)
                        .slice(0, 6)
                        .map(res => <QueryCard key={res.id} {...res} /> ) 
                    }
                    { <Button fontSize="xs" bg="yellow.500" rounded={0} rightIcon={<Spinner size="xs" />} onClick={() => loadSearchHandler(query)}>Load More</Button> }
                  </Flex>
                )
              }
            </Box>
          )
        }
        <IconButton variant="ghost" size="sm" icon={<IoSearch size={18} />} onClick={() => setVisible(!visible)} />
        <IconButton variant="ghost" size="sm" icon={ colorMode == 'light' ? <IoMoonOutline size={18} /> : <IoSunnyOutline size={18} /> } onClick={toggleColorMode} />
      </AppHeader>
      {/* <AppSpacer /> */}
      <Box minH="75vh" bg={mode('rgba(255,255,255,0.7)', '#0A0B13')} pb={100}>
        { children }
      </Box>
    </Fragment>
  )
}

export default AppLayout