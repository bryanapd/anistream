import { Fragment } from "react";
import Router, { useRouter } from "next/router";

import { 
  Box, Text, Heading, Container, Img, Spinner, Stack, 
  HStack, Flex, Divider, Tag 
} from "@chakra-ui/react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useGetAnimeDetailsByIdQuery } from "../features/apiSlice";

const options = {
  // type: 'loop',
  // rewind: true, 
  // rewindByDrag: true, 
  perPage: 3, 
  arrows: false, 
  pagination: false, 
  drag: 'free', 
  gap: '1rem', 
  breakpoints: {
    500: {
      perPage: 3,
      perMove: 1
    },
    723: {
      perPage: 4,
      perMove: 2
    },
    1247: {
      perPage: 3,
      perMove: 1
    }
  }
}

const ItemCard = ({ 
  image, title, id, description, status, cover, rating, releaseDate, 
  genres = [], totalEpisodes, season, studios = [], characters = [],
  boxStyle, ...rest
}) => {
  return(
    <Flex flexDir="column" alignItems="start" justifyContent="flex-end" minH="50vh" h="75vh" pos="relative" {...boxStyle}>
      <Img pos="absolute" h="full" w="full" top={0} left={0} objectFit="cover" objectPosition="center" alt={`${title.romaji} cover`} src={cover} />
      <Box pos="absolute" h="full" w="full" bgGradient="linear-gradient(180deg, rgba(22, 21, 26, 0) 0%, rgba(22, 21, 26, 0.9) 72.92%, #16151A 100%)" />
      <Container display="flex" maxW="container.xl" zIndex="99" pos="relative">
        <Stack flexDir={{ base: 'column-reverse', md: 'row' }} justifyContent="space-between" direction={{ base: 'column', md: 'row' }}>
          <Box>
            <Heading w="max" size="lg" transition="all 300ms ease" _hover={{ textDecor: 'underline' }} onClick={() => Router.push(`/anime/${id}`)} cursor="pointer" mb={2}>{title.romaji}</Heading>
            <HStack spacing={4} mb={3}>
              { genres.map((genre, genreKey) => <Tag key={genreKey} color="white" size="lg" fontSize="xs" bg="blackAlpha.500" rounded="full">{genre}</Tag> ) }
            </HStack>
            <Text fontSize="sm" noOfLines={{ base: 5, md: 10 }} whiteSpace="pre-line" mb={10}>{description.replace(/<br\s*[\/]?>/gi, '' || '')}</Text>
          </Box>
          <Splide options={options}>
            { characters.filter(f => f.role == 'MAIN').map(character => (
              <SplideSlide key={character.id}>
                <Box>
                  <Img boxSize="90px" rounded="xl" objectFit="cover" al={`${character.name.first} image`}  src={character.image} mb={1} />
                  <Heading size="sm">{`${character.name.full}`}</Heading>
                </Box> 
              </SplideSlide> ))
            }
          </Splide>
        </Stack>
      </Container>
    </Flex>
  )
}

const Showcase = ({ }) => {
  const router = useRouter()
  const { data: anime, isLoading, isError } = useGetAnimeDetailsByIdQuery(918)

  if(isError){
    console.log('Showcase error?: ', isError)
  }else if(anime){
    console.log('anime', anime)
  }
  return(
    <Fragment>
      { !anime && isLoading && <Spinner color="primary.500" size="sm" />}
      { anime && <ItemCard key={anime.id} {...anime} /> }
    </Fragment>
  )
}

export default Showcase