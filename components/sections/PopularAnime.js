import { Box, Flex, Grid, Heading, Spinner } from "@chakra-ui/react";
import Router from "next/router";
import { useGetPopularAnimeQuery } from "../../features/apiSlice";

export const PopularCard = ({ animeId, animeImg, animeTitle, releasedDate = '2020' }) => (
  <Flex
    alignItems="flex-end"
    justifyContent="space-between"
    borderRadius="md" 
    minH="50vh"  
    bgSize="cover" bgPos="center center"
    bgImg={animeImg}
    transition="all 300ms ease"
    _hover={{ transform: 'scale(1.03)' }}
    cursor="pointer"
    p={2}
    onClick={() => Router.push(`/anime/${animeId}`)}
    pos="relative">
    <Box 
      pos="absolute" h="full" w="full" 
      bgGradient="linear(0deg, rgba(0,0,0,0.7945772058823529) 6%, rgba(0,0,3,0.46124387254901966) 23%, rgba(244,244,244,0) 100%)"
      bottom={0} left={0}
      />
    <Heading size="xs" fontWeight="black" color="yellow.500" zIndex="99">{animeTitle}</Heading>
    <Heading size="xs" color="white" zIndex="99">{releasedDate}</Heading>
  </Flex>
)

const PopularAnime = ({ title = 'Popular Anime', ...rest }) => {
  const { data: popular, isLoading, isError } = useGetPopularAnimeQuery({})

  if(isError){
    console.log('Popular is error: ', isError)
  }

  return(
    <Box {...rest}>
      <Heading size="md" mb={3}>{title}</Heading>
      <Grid templateColumns={{ base: 'auto', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={4}>
        { !popular && isLoading && <Spinner size="sm" /> }
        { popular && popular.map(item => <PopularCard key={item.animeId} {...item} />) }
      </Grid>
    </Box>
  )
}

export default PopularAnime