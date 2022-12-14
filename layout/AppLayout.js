import Head from "next/head"
import styles from '../styles/Layout.module.css'
import { Fragment, useState, useEffect, useRef } from "react"
import Router, { useRouter } from "next/router"
import Link from "next/link"
import { 
  Box, Button, Container, Flex, Heading, HStack, IconButton, Img, 
  Input, Spacer, Spinner, Text, useColorMode, useColorModeValue as mode
} from "@chakra-ui/react"
import { IoChevronDown, IoChevronUp, IoMoonOutline, IoSearch, IoSunnyOutline } from "react-icons/io5"
import { BsChevronDown } from "react-icons/bs"

import { AppBrand, AppHeader, AppLinks, AppSpacer } from "../components/Header"

import useDebounce from "../hooks/useDebounce"
import { capitalizeFirstLetter } from '../lib/capitalizeFirstLetter'
import { useGetAnimeSearchQuery } from "../features/apiSlice"
import { setSearchValue, setSelectedGenre } from "../features/filterSlice"
import { useDispatch, useSelector } from "react-redux"
import filters from '../lib/filters'


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
        <Text fontSize="sm" fontWeight="semibold" color="primary.500" noOfLines={1}>{title.romaji}</Text>
        <Text fontSize="xs" color="gray.300">{status} &bull; {type.split('_').join(' ')} &bull; <Text as="span">{releaseDate}</Text> </Text>
      </Box>
    </HStack>
  </Link>
)

const AppLayout = ({ children, withFooter }) => {
  let result
  const router = useRouter()
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [hideResult, setHideResult] = useState(false)
  const [backdrop, setBackdrop] = useState('0px')
  const { colorMode, toggleColorMode } = useColorMode()

  const dispatch = useDispatch()
  const query = useSelector(state => state.filters.search)
  const debouncedSearchQuery = useDebounce(query, 2000)

  const routes = [
    {
      path: '/anime/top',
      label: 'Top Anime'
    },
    {
      path: '/anime/genres',
      label: 'Genres'
    },
    {
      path: '/anime/format',
      label: 'Formats'
    },
    {
      path: '/my/list',
      label: 'My List'
    },

  ]

  const { data, isLoading, isFetching, isError } = useGetAnimeSearchQuery({ url: query }, { skip: debouncedSearchQuery == '' })
  if(isLoading){
    console.log('is loading', isLoading)
  }else if(isError){
    console.log('Search error?', isError)
  }else if(data){
    const { results } = data
    result = results
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

  const searchHandler = event => {
    dispatch(setSearchValue(event.target.value))
  }

  const submitQueryHandler = event => {
    event.preventDefault()
    router.push({ pathname: '/search', query: { name: query } })
  }

  const backdropHandler = () => {
    window.scrollY > 20 ? setBackdrop('8px') : setBackdrop('0px')
  }

  useEffect(() => {
    window.addEventListener('scroll', backdropHandler)
  }, [])

  useOutsideAlerter(ref)

  return(
    <Fragment>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Amaranth:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,900&display=swap" rel="stylesheet" />
      </Head>
      <AppHeader boxStyle={{ backdropFilter: `blur(${backdrop}) saturate(180%)` }}>
        <AppBrand logo="../../../icon.png" />
        <AppLinks 
          router={router} 
          routes={routes} 
          genreOptions={filters.genres}
          formatOptions={filters.formats}
          btnProps={{ _hover: { color: 'primary.500' }}} 
          menuProps={{ border: '1px solid rgba(255, 255, 255, 0.125)', bgColor: 'rgba(0, 0, 0, 0.95)', backdropFilter: 'blur(16px) saturate(180%)' }} 
          menuItemProps={{ fontSize: 14, fontWeight: 'medium' }}
          menuBtnProps={{ rightIcon: <BsChevronDown size={12} style={{ marginTop: 2 }} />, iconSpacing: 1.5, _hover: { color: 'primary.500' } }}
          />
        <Spacer />
        {
          visible && (
            <Box as="form" method="POST" onSubmit={submitQueryHandler} pos="relative">
              <Input 
                ref={ref} value={query} 
                variant="outline" 
                borderColor="rgba(255, 255, 255, 0.125)"
                rounded={0} 
                w={{ base: 'auto', md: '300px' }} 
                onChange={searchHandler} 
                transition="all 300ms ease" 
                placeholder="Search your favorite anime..."
                _placeholder={{ fontSize: 'xs' }} />
              {
                result && query != '' && hideResult == false && (
                  <Flex 
                    w="300px"
                    flexDir="column" 
                    pos="absolute"
                    overflow="hidden" zIndex="99" 
                    border="1px solid rgba(255, 255, 255, 0.125)" 
                    bgColor="rgba(17, 25, 40, 0.75)" 
                    backdropFilter="blur(16px) saturate(180%)"
                    sx={{
                      '&::-webkit-backdrop-filter': {
                        backdropFilter: 'blur(16px) saturate(180%)'
                      }
                    }}>
                    { !result && <Spinner size="sm" color="yellow.500" /> }
                    { 
                      result && [...result]
                        .sort((a,b) => a.title.romaji.localeCompare(b.title.romaji) && b.rating - a.rating)
                        .slice(0, 6)
                        .map(res => <QueryCard key={res.id} {...res} /> ) 
                    }
                    { <Button fontSize="xs" bg="yellow.500" rounded={0} rightIcon={<Spinner size="xs" />} onClick={submitQueryHandler}>Load More</Button> }
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