import Router from "next/router";
import { Box, Flex, Grid, Heading, HStack, Img, Spinner } from "@chakra-ui/react";
import { useGetRecentReleaseQuery } from "../../features/apiSlice";

const RecentCard = ({ animeId, animeImg, animeTitle, episodeNum }) => (
  <Box 
    borderWidth={1} 
    borderRadius="md"
    overflow="hidden"
    pos="relative" 
    onClick={() => Router.push(`/watch/${animeId}`)} 
    transition="all 300ms ease" 
    _hover={{ transform: 'scale(1.03)' }}
    cursor="pointer">
    <Box 
      pos="absolute" h="full" w="full" 
      bgGradient="linear(0deg, rgba(0,0,0,0.7945772058823529) 6%, rgba(0,0,3,0.46124387254901966) 23%, rgba(244,244,244,0) 100%)"
      bottom={0} left={0}
      />
    <Img boxSize="280px" src={animeImg} objectFit="cover" />
    <HStack w="full" pos="absolute" justifyContent="space-between" left={0} bottom={0} p={2}>
      <Heading size="xs" fontWeight="medium" color="white">{animeTitle}</Heading>
      <Heading size="xs" fontWeight="black" color="yellow.500">{episodeNum}</Heading>
    </HStack>
  </Box>
)

export const RecentRelease = props => {
  const { data: recentRelease, isLoading, isError } = useGetRecentReleaseQuery()

  console.log('Error: ', isError)
  
  return(
    <Box {...props}>
      <Heading size="sm" mb={2}>Recent Release</Heading>
      { !recentRelease && isLoading && <Spinner size="sm" /> }
      <Grid templateColumns={{ base: 'auto', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)', lg: 'repeat(6, 1fr)' }} gap={2}>
        { 
          recentRelease && recentRelease.map(anime => <RecentCard key={anime.animeId} {...anime} />) 
        }
      </Grid>
    </Box>
  )
}