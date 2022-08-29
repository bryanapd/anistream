import { Box, Flex, Grid, Heading, Img, Spinner } from "@chakra-ui/react";
import Router from "next/router";
import { useState } from "react";

import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useGetPopularAnimeQuery } from "../../features/apiSlice";

export const PopularCard = ({ image, title, id, genres = [], rating, cover, status, totalEpisodes, duration, type, releaseDate, trailer }) => {
  const [hover, setHover] = useState(false)
  return(
    <Flex minH="23vh" p={3} alignItems="flex-end" justifyContent="space-between" transition="all 300ms ease" _hover={{ transform: 'scale(1.03)' }} cursor="pointer" pos="relative" onClick={() => Router.push(`/anime/${id}`)}>
      <Img 
        pos="absolute" h="full" w="full"
        objectFit="cover" objectPosition="center"
        top={0} left={0}
        src={cover} alt={`${title.romaji} cover`}
        />
      <Box 
        pos="absolute" h="full" w="full" 
        bgGradient="linear(0deg, rgba(0,0,0,0.7945772058823529) 6%, rgba(0,0,3,0.46124387254901966) 23%, rgba(244,244,244,0) 100%)"
        bottom={0} left={0}
        /> 
      <Heading size="xs" fontWeight="black" zIndex="99">{title.romaji}</Heading>
      <Flex flexDir="column" alignItems="flex-end" pos="relative" zIndex="9999">
        <Img h="90px" w="auto" objectFit="cover" src={image} alt={`${title.romaji} image`} mb={2} />
        <Heading size="xs" color="white" zIndex="99">{releaseDate}</Heading>
      </Flex>
    </Flex>
  )
}

const PopularAnime = ({ title = 'Popular Anime', ...rest }) => {
  var popular
  const { data, isLoading, isError } = useGetPopularAnimeQuery({})

  if(isError){
    console.log('Popular is error: ', isError)
  }else if(data){
    const { results } = data
    popular = results
  }

  return(
    <Box {...rest}>
      <Heading size="md" mb={-8} mx={12}>{title}</Heading>
      { !popular && isLoading && <Spinner size="sm" /> }
      <Splide 
        options={{ 
          type: 'loop',
          rewind: true, 
          rewindByDrag: true, 
          perPage: 4, 
          arrows: false, 
          pagination: false, 
          drag: 'free', 
          gap: '1rem', 
          breakpoints: {
            500: {
              perPage: 1,
              perMove: 1
            },
            723: {
              perPage: 2,
              perMove: 2
            },
            935: {
              perPage: 3,
              perMove: 3
            },
            1247: {
              perPage: 4,
              perMove: 4
            }
          }
        }}>
        { popular && popular.map(item => <SplideSlide key={item.animeId}> <PopularCard {...item} /> </SplideSlide> ) }
      </Splide>
    </Box>
  )
}

export default PopularAnime

{/* <Grid templateColumns="repeat(auto-fit, minmax(350px, 1fr))" gap={4}>
    { popular && popular.map(item => <PopularCard key={item.animeId} {...item} />) }
  </Grid> */}