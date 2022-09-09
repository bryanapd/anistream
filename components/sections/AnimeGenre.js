import { Fragment, useState } from "react";
import { Box, Text, Button, Container, Img, Heading, Flex, Grid, Spinner } from "@chakra-ui/react";
import { useGetAnimeGenreQuery, useGetTrendingAnimeQuery } from "../../features/apiSlice";

export const GenreCard = ({ genres = [], image }) => (
  <Flex flexDir="column" overflow="hidden" borderRadius="md">
    <Img
      h="200px"
      src={image} 
      objectFit="cover" objectPosition="center" 
      alt="Genre Image" />
    <Box textAlign="center" bg="white" p={3}>
      <Heading size="xs" color="black">{genres[0]}</Heading>
    </Box>
  </Flex>
)

const AnimeGenre = ({ title = 'Anime Genre', boxStyle }) => {
  let genre
  const { data, isLoading, isError } = useGetTrendingAnimeQuery()

  if(data) {
    const { results } = data
    genre = results
  }

  return(
    <Flex flexDir="column" alignItems="center" justifyContent="center" minH="40vh" bg="secondary.500" {...boxStyle}>
      <Container maxW="container.xl">
        { !data && isLoading && <Spinner size="sm" />}
        <Grid templateColumns="repeat(auto-fit, minmax(10rem, 1fr))" gap={4}>
          <Flex flexDir="column" alignItems="start" justifyContent="center">
            <Heading size="md" mb={4}>{title}</Heading>
            <Text fontSize="xs">Find anime series/movies with genre that you like most</Text>
          </Flex>
          { genre && genre.filter(f => f.genres[0] == 'Action' && f.rating <= 80).slice(0,1).map(genre => <GenreCard key={genre.id} {...genre} />) }
          { genre && genre.filter(f => f.genres[0] == 'Adventure').slice(0,1).map(genre => <GenreCard key={genre.id} {...genre} />) }
          { genre && genre.filter(f => f.genres[0] == 'Comedy').slice(0,1).map(genre => <GenreCard key={genre.id} {...genre} />) }
          { genre && genre.filter(f => f.genres[0] == 'Romance' || f.genres[0] == 'Drama').slice(0,1).map(genre => <GenreCard key={genre.id} {...genre} />) }
        </Grid>
      </Container>
    </Flex>
  )
}

export default AnimeGenre