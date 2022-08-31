import { Fragment, useEffect, useState } from "react";
import Router, { useRouter } from "next/router";

import { 
  Box, Text, Heading, Container, Img, Spinner, Stack, 
  HStack, Flex, Divider, Tag, Button, IconButton,
  AspectRatio
} from "@chakra-ui/react";
import { HiOutlinePlay } from 'react-icons/hi'
import { Splide, SplideSlide } from "@splidejs/react-splide";
import YouTube from "react-youtube";

import { useGetAnimeDetailsByIdQuery } from "../features/apiSlice";
import { IoVolumeHigh, IoVolumeHighOutline } from "react-icons/io5";

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

const iframeStyle = {
  height: '100%', 
  width: '100%', 
  position: 'absolute', 
  top: 0,
  left: 0,
}

const ItemCard = ({ 
  image, title, id, description, status, cover, rating, releaseDate, trailer,
  genres = [], totalEpisodes, season, studios = [], characters = [],
  boxStyle, ...rest
}) => {

  const [state, setState] = useState({
    isLoading: true,
    isMuted: true
  })

  const backgroundHandler = () => {
    Router.push(`/anime/${id}`)
  }
  const muteHandler = () => {
    setState({
      isMuted: 0
    })
  }

  useEffect(() => {
    setTimeout(() => {
      setState({
        isLoading: false
      })
    }, 3000);
  }, [state.isLoading])

  return(
    <Flex flexDir="column" alignItems="start" justifyContent="flex-end" minH="50vh" h="75vh" pos="relative" {...boxStyle}>
      
        {
          trailer != null && !state.isLoading ? (
            <Box pos="absolute" w="100%" pb="56.25%" overflow="hidden" h={0}>
              <iframe 
                style={iframeStyle} 
                src={`https://www.youtube.com/embed/${trailer.id}?enablejsapi=1&wmode=opaque&autoplay=1&controls=0&playlist=${trailer.id}&loop=1&modestbranding=1&mute=${state.isMuted}`} 
                frameborder="0"
                allow="autoplay"
                allowFullScreen 
                />
            </Box>
          )
            :
            <Img pos="absolute" h="full" w="full" top={0} left={0} objectFit="cover" objectPosition="center" alt={`${title.romaji} cover`} src={cover} />
        }
      {/* {
        trailer != null && state ? 
        // <AspectRatio pos="absolute" h="100%" w="100%" ratio={16 / 9}>
          <YouTube 
            style={{
              position: 'absolute',
              height: '100%',
              border: '2px solid red',
              width: '100%',
              // top: 0,
              // bottom: 0,
              // left: 0,
              // right: 0
            }}
            videoId={trailer.id}
            
            opts={{
            height: '100%',
            width: '100%',
            playerVars: {
              autoplay: 1,
              rel: 0,
              loop: 1,
              modestbranding: 1,
              playlist: trailer.id,
              controls: 0,
              mute: 0,
              showinfo: 0,
            },
          }} />
        // </AspectRatio>
        : <Img pos="absolute" h="full" w="full" top={0} left={0} objectFit="cover" objectPosition="center" alt={`${title.romaji} cover`} src={cover} />
      } */}
      {/* <Box pos="absolute" h="full" w="full" bgGradient="linear-gradient(180deg, rgba(22, 21, 26, 0) 0%, rgba(22, 21, 26, 0.9) 72.92%, #16151A 100%)" /> */}
      <Container display="flex" maxW="container.xl" zIndex="99" pos="relative">
        <Stack flexDir={{ base: 'column-reverse', md: 'row' }} justifyContent="space-between" direction={{ base: 'column', md: 'row' }}>
          <Box maxW="60%">
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
                  <Img boxSize="90px" borderRadius="53% 47% 70% 30% / 30% 59% 41% 70%" objectFit="cover" al={`${character.name.first} image`}  src={character.image} mb={1} />
                  <Heading size="sm">{`${character.name.full}`}</Heading>
                </Box> 
              </SplideSlide> ))
            }
          </Splide>
        </Stack>
        <Flex pos="absolute" bottom={5} right={5}>
          <IconButton variant="ghost" onClick={backgroundHandler} icon={<HiOutlinePlay size="35px" />} />
          <IconButton variant="ghost" onClick={muteHandler} icon={<IoVolumeHighOutline size="30px" />} />
        </Flex>
      </Container>
    </Flex>
  )
}

const Showcase = ({ }) => {
  const router = useRouter()
  const { data: anime, isLoading, isError } = useGetAnimeDetailsByIdQuery(143270)

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