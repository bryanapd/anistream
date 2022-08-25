import { Fragment, useState, useEffect, useRef } from "react"
import { useRouter } from "next/router"
import { Box, Button, Container, Flex, Heading, HStack, IconButton, Img, Input, Spacer, Spinner, Text } from "@chakra-ui/react"

import { AppBrand, AppHeader, AppLinks, AppSpacer } from "../components/Header"

import useDebounce from "../hooks/useDebounce"
import { useGetAnimeSearchQuery } from "../features/apiSlice"
import { IoChevronDown, IoChevronUp } from "react-icons/io5"


const routes = [
  {
    path: '/',
    label: 'Explore'
  },
]
const AppLayout = ({ children, withFooter }) => {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [showMore, setShowMore] = useState(false)
  const debouncedSearchQuery = useDebounce(search, 2000)
  const inputRef = useRef()

  const { data: searchResult, isLoading, isFetching, isError } = useGetAnimeSearchQuery(search, { skip: debouncedSearchQuery == '' })

  if(isError){
    console.log('Search error?', isError)
  }else if(searchResult){
    console.log(searchResult)
  }else if(isLoading){
    console.log('is loading', isLoading)
  }

  const searchHandler = e => {
    setSearch(e.target.value)
  }
  const handleShowMore = () => {
    setShowMore(!showMore)
  }
  const numberOfItems = showMore ? searchResult.length : 6
  
  const focusHandler = () => {
    inputRef.current.focus
  }

  return(
    <Fragment>
      <AppHeader boxStyle={{ bg: 'yellow.500' }}>
        <AppBrand title="AniStream" />
        <AppLinks
          routes={routes}
          router={router} 
          />
        <Spacer />
        <Box pos="relative">
          <Input 
            variant="solid" 
            ref={inputRef}
            w={ search != '' ? '500px' : 'auto' } 
            transition="all 300ms ease"
            placeholder="Search your favorite anime..."
            _placeholder={{ fontSize: 'xs' }}
            _focus={{ w: '500px' }}
            mb={.5}
            onChange={searchHandler}
            />
            { !searchResult && isLoading && <Spinner size="sm" color="yellow.500" /> }
            <Flex flexDir="column" pos="absolute" bg="blackAlpha.800">
              { 
                searchResult && searchResult.slice(0, numberOfItems).map(result => (
                  <HStack key={result.animeId} w="500px" p={2} _hover={{ bg: 'yellow.400' }} cursor="pointer" onClick={() => router.push(`/anime/${result.animeId}`)}>
                    <Img boxSize="60px" src={result.animeImg} objectFit="cover" />
                    <Box>
                      <Heading size="xs" color="yellow.500" mb={2}>{result.animeTitle}</Heading>
                      <Heading size="xs" color="white">{result.status}</Heading>
                    </Box>
                  </HStack> )
                )
              }
              {searchResult && searchResult.length >= 6 && (
                <Button bg="yellow.500" rounded={0} onClick={handleShowMore}  rightIcon={showMore ? <IoChevronUp size={20} /> : <IoChevronDown size={20} />}>
                  { showMore ? 'Show less' : 'Show more' }
                </Button> 
              )}
            </Flex>
        </Box>
      </AppHeader>
      <AppSpacer />
      <Box minH="75vh">
        <Container maxW="container.xl">
        { children }
        </Container>
      </Box>
    </Fragment>
  )
}

export default AppLayout