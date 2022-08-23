import { Box, Button, Flex, Grid, Heading, HStack, Img, Spacer, Spinner, Stack, Tag, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useGetAnimeDetailsQuery } from '../../features/apiSlice'
import AppLayout from '../../layout/AppLayout'


const AnimeCard = ({ animeImg, animeTitle, genres, otherNames, releasedDate, status, synopsis, totalEpisodes, type, episodesList = [] }) => (
  <Box>
    <Stack direction={{ base: 'column', md: 'row' }} alignItems="flex-start" minH="30vh" spacing={6}>
      <Img
        h="400px" w="auto"
        src={animeImg} 
        objectFit="cover" 
        />
      <HStack alignItems="flex-start" spacing={2}>
        <VStack alignItems="flex-start" spacing={4}>
          <Heading size="lg">{animeTitle}</Heading>
          <Heading size="md" color="gray.500">{otherNames}</Heading>
          <Text fontSize="sm" fontWeight="medium" maxW={{ base: 'auto', md: '520px' }}>{synopsis}</Text>
          <Heading size="xs">English: <Text as="span" fontWeight="medium">{animeTitle}</Text> </Heading> 
          <Heading size="xs">Season: <Text as="span" fontWeight="medium">{type}</Text> </Heading>
          <Heading size="xs">Episodes: <Text as="span" fontWeight="medium">{totalEpisodes}</Text> </Heading>
          <Heading size="xs">Status: <Text as="span" fontWeight="medium">{status}</Text> </Heading>
          <Heading size="xs">Released Date: <Text as="span" fontWeight="medium">{releasedDate}</Text> </Heading>
          <Grid templateColumns={{ base: 'repeat(3, 1fr)', sm: 'repeat(4, 1fr)', md: 'repeat(5, 1fr)' }} gap={2}>
            { 
              (genres || []).map((genre, genreKey) => <Tag key={genreKey} size="md" rounded="sm" bg="blackAlpha.100" color="yellow.600">{genre}</Tag> ) 
            }
          </Grid>
        </VStack>
      </HStack>
    </Stack>
    <Flex alignItems="center" bg="yellow.400" p={3} my={10}>
      <Heading size="sm">{`Episodes (${totalEpisodes})`}</Heading>
      <Spacer />
      <Button size="sm" rounded="sm" mr={1} onClick={() => [...episodesList].sort((a, b) => a - b )}>asc</Button>
      <Button size="sm" rounded="sm">desc</Button>
    </Flex>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(4rem, 1fr))', gap: '2rem' }}>
      {
        episodesList.map(episode => <Button rounded="lg" bg="yellow.400">{episode.episodeNum}</Button>)
      }
    </div>
  </Box>
)

const Anime = ({ }) => {
  const router = useRouter()
  const { data: details, isLoading, isError } = useGetAnimeDetailsQuery(router.query.id, { skip: !router.query.id })
  if(isError){
    console.log(`Error Anime Id: ${isError}`)
  }
  return(
    <AppLayout>
      { !details && isLoading && <Spinner size="sm" /> }
      { details && <AnimeCard {...details} /> }
    </AppLayout>
  )
}

export default Anime