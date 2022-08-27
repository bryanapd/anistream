import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import { 
  Box, Button, Container, Divider, Flex, Grid, Heading, 
  HStack, Img, Spacer, Spinner, Stack, Switch, Tag, Text, VStack 
} from '@chakra-ui/react'

import AppLayout from '../../layout/AppLayout'
import { AppSpacer } from '../../components/Header'

import { useGetAnimeDetailsByIdQuery } from '../../features/apiSlice'
import { useState } from 'react'



const AnimeCard = ({ anime, blur, setBlur }) => (
  <Box>
    {/* <Img h="50vh" w="full" objectFit="cover" src={anime.cover} alt={`${anime.title.romaji} cover`} /> */}
    <Box 
      h="50vh" 
      bgImg={anime.cover} 
      bgSize="cover" bgPos="center center"
      pos="relative">
    <Box pos="absolute" h="full" w="full" bgGradient="linear(0deg, rgba(0,0,0,0.7945772058823529) 6%, rgba(0,0,3,0.46124387254901966) 23%, rgba(244,244,244,0) 100%)" bottom={0} left={0} />
    </Box>
    <Container maxW="container.xl" mt={-20} zIndex="99" pos="relative">
      <Grid templateColumns={{ base: 'auto', md: '350px auto' }} gap={10}>
        <Box>
          <Img h="auto" w="auto" src={anime.image} objectFit="cover" alt={`${anime.title.romaji} image`} mb={4} />
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
          <Divider my={10} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(7rem, 1fr))', gap: '1.5rem' }}>
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
          </div>
        </Box>
        <Flex flexDir="column" mt={10}>
          <Heading size="lg" fontWeight="black" mb={7}>{anime.title.romaji}</Heading>
          <HStack spacing={4}>
            { anime.genres.map((genre, genreKey) => <Tag key={genreKey} size="lg" fontSize="xs" variant="outline" rounded="sm">{genre}</Tag> ) }
          </HStack>
          <Divider my={8} />
          <Text fontSize="sm" whiteSpace="pre-line" mb={10}>{anime.description.replace(/<br\s*[\/]?>/gi, '' || '')}</Text>
          <Switch alignSelf="flex-end" onChange={() => setBlur(!blur)} mb={4}>Blur</Switch>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(17rem, 1fr))', gap: '1.5rem' }}>
          {
            anime.episodes.map(episode => (
              <Box key={episode.id} filter={ blur ? 'blur(4px)' : ''}>
                <Img h="23vh" objectFit="cover" w="full" src={episode.image} alt={`${episode.title} cover`} mb={2} />
                <Flex justifyContent="space-between">
                  <Heading size="sm">{`Ep. ${episode.number}`}</Heading>
                  <Heading size="sm" fontWeight="medium">{episode.title}</Heading>
                </Flex>
              </Box>
            ))
          }
          </div>
        </Flex>
      </Grid>
    </Container>
  </Box>
)

const Anime = ({ }) => {
  const [blur, setBlur] = useState(false)
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