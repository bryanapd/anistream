import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import { 
  Box, Button, Container, Divider, Flex, Grid, Heading, 
  HStack, Img, Spacer, Spinner, Stack, Switch, Tag, Text, VStack 
} from '@chakra-ui/react'

import AppLayout from '../../layout/AppLayout'
import { AppSpacer } from '../../components/Header'

import { useGetAnimeDetailsByIdQuery, useGetAnimeEpisodeByIdQuery} from '../../features/apiSlice'
import { useState } from 'react'



const AnimeCard = ({ anime, blur, setBlur }) => (
  <Box pos="relative" pt={200}>
    {/* <Img h="50vh" w="full" objectFit="cover" src={anime.cover} alt={`${anime.title.romaji} cover`} /> */}
    <Box 
      h="100vh" w="100vw" 
      pos="absolute" top={0}
      bgImg={anime.cover} bgSize="cover"
      bgRepeat="no-repeat" bgPos="center center"
      filter="blur(8px)" 
      />
    <Box pos="absolute" h="100vh" w="100vw" bgGradient="linear-gradient(180deg, rgba(22, 21, 26, 0) 0%, rgba(22, 21, 26, 0.9) 72.92%, #16151A 100%)" />
    <Container maxW="90vw" zIndex="99" pos="relative">
      <Grid templateColumns={{ base: 'auto', md: '300px auto' }} gap={10}>
        <Box>
          <Img 
            h="auto"
            borderRadius="md"
            src={anime.image} 
            objectFit="cover" 
            alt={`${anime.title.romaji} image`}
            mb={4} />
          <Flex justifyContent="space-between" mb={2}>
            <Text fontSize="xs">AVG.SCORE</Text>
            <Heading size="xs">4.8/5</Heading>
          </Flex>
          <Flex justifyContent="space-between" mb={2}>
            <Text fontSize="xs">STATUS</Text>
            <Heading size="xs">{anime.status}</Heading>
          </Flex>
          <Flex justifyContent="space-between" mb={2}>
            <Text fontSize="xs">EPS</Text>
            <Heading size="xs">{anime.totalEpisodes}</Heading>
          </Flex>
          <Flex justifyContent="space-between" mb={2}>
            <Text fontSize="xs">AIRED</Text>
            <Heading size="xs">{`${anime.startDate.month} ${anime.startDate.day} ${anime.startDate.year}`}</Heading>
          </Flex>
          {/* <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(7rem, 1fr))', gap: '1.5rem' }}>
            {
              anime.characters
              .filter(c => c.role == 'MAIN')
              .map(character => (
                <Box key={character.id}>
                  <Img h="20vh" w="full" borderRadius="xl" src={character.image} objectFit="cover" alt={`${character.name.full} image`} mb={2} />
                  <Heading size="sm">{character.name.full}</Heading>
                </Box>
              ))
            }
          </div> */}
        </Box>
        <Flex flexDir="column" mt={10}>
          <Heading size="lg" fontWeight="black" mb={7}>{anime.title.romaji}</Heading>
          <HStack spacing={4}>
            { anime.genres.map((genre, genreKey) => <Tag key={genreKey} color="white" size="lg" fontSize="xs" bg="blackAlpha.500" rounded="full">{genre}</Tag> ) }
          </HStack>
          <Divider my={8} />
          <Text fontSize="sm" whiteSpace="pre-line" mb={10}>{anime.description.replace(/<br\s*[\/]?>/gi, '' || '')}</Text>
        </Flex>
      </Grid>
      <Flex flexDir="column" mt={20}>
        <Switch defaultChecked={true} colorScheme="facebook" alignSelf="flex-end" onChange={() => setBlur(!blur)} mb={4}>Blur</Switch>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {
            anime.episodes.map(episode => (
              <Box key={episode.id}>
                <Img 
                  h="23vh" w="full"
                  objectFit="cover"  
                  src={episode.image} 
                  alt={`${episode.title} cover`} 
                  filter={ blur ? 'blur(4px)' : ''} 
                  onClick={() => Router.push(`/anime/episode/${episode.id}`)}
                  mb={2} />
                <Flex justifyContent="space-between">
                  <Heading size="sm">{`Ep. ${episode.number}`}</Heading>
                  <Heading size="sm" fontWeight="medium">{episode.title}</Heading>
                </Flex>
              </Box>
            ))
          }
        </div>
      </Flex>
    </Container>
  </Box>
)

const Anime = ({ }) => {
  const [blur, setBlur] = useState(true)
  const router = useRouter()
  const { data: details, isLoading, isError } = useGetAnimeDetailsByIdQuery(router.query.id, { skip: !router.query.id })

  if(isError){
    console.log(`Error Anime Id: ${isError}`)
  }

  return(
    <AppLayout>
      { !details && isLoading && <Spinner size="sm" /> }
      { details && <AnimeCard anime={details} blur={blur} setBlur={setBlur} /> }
      <AppSpacer />
    </AppLayout>
  )
}

export default Anime