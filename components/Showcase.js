import { Fragment, useEffect, useRef, useState, useCallback } from "react";
import Router, { useRouter } from "next/router";
import '../styles/Showcase.module.css'
import { 
  Box, Text, Heading, Container, Img, Spinner, Stack, 
  HStack, Flex, Divider, Tag, Button, IconButton,
  AspectRatio, Grid, StackDivider
} from "@chakra-ui/react";
import { HiOutlinePlay } from 'react-icons/hi'
import YouTube from "react-youtube";

import { useGetAnimeDetailsByIdQuery, useGetTrendingAnimeQuery } from "../features/apiSlice";

import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Navigation, Pagination, FreeMode, Autoplay, Lazy, Controller } from "swiper"
import { IoPlaySharp } from "react-icons/io5";

const Showcase = ({ }) => {
  let anime
  const router = useRouter()
  const sliderRef = useRef(null)
  const [ isActive, setIsActive] = useState(true)

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const { data, isLoading, isError } = useGetTrendingAnimeQuery()
  if(data){
    const { results } = data
    anime = results
  }else if(isError){
    console.log('Showcase error?: ', isError)
  }

  return(
    <Fragment>
      { !data && isLoading && <Spinner color="primary.500" size="sm" />}
      {
        anime && (
          <Swiper 
            loop={true}
            ref={sliderRef}
            lazy={true}
            spaceBetween={30}
            effect={"fade"}
            pagination={{
              type: 'bullets',
              clickable: true
            }}
            freeMode={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false
            }}
            modules={[EffectFade, Navigation, Pagination, FreeMode, Autoplay, Lazy, Controller ]}
            fadeEffect={{
              crossFade: true
            }}>
            {
              [...anime]
              .sort((a, b) => b.rating - a.rating)
              .filter(f => f.status == 'Ongoing' && f.rating >= 70)
              .map(anime => (
                <SwiperSlide>
                  <Flex flexDir="column" alignItems="start" justifyContent="flex-end" w="full" minH="50vh" h="65vh" pos="relative" pb={4}>
                    <Img pos="absolute" h="full" w="full" top={0} left={0} objectFit="cover" objectPosition="center" alt={`${anime.title.romaji} cover`} src={anime.cover} />
                    <Box layerStyle="showcaseLinearTop" /> 
                    <Box layerStyle="showcaseLinearBottom" /> 
                    <Box layerStyle="showcaseLinearRight" /> 
                    <Container maxW="container.xl" zIndex="99" pos="relative">
                      <Grid templateColumns="auto 400px" gap={4}>
                        <Flex flexDir="column">
                          <Heading size="lg" mb={2}>
                            {anime.title.romaji}
                          </Heading>
                          <HStack spacing={4} mb={4}>
                            { anime.genres.map((genre, genreKey) => <Tag key={genreKey} color="blackAlpha.800" size="md" fontSize="xs" bg="white" rounded="full">{genre}</Tag> ) }
                          </HStack>
                          <Text fontSize="sm" noOfLines={{ base: 5, md: 10 }} whiteSpace="pre-line" mb={10}>{anime.description.replace(/<br\s*[\/]?>/gi, '' || '')}</Text>
                          <Button w="max" size="sm" bg="white" color="black" rounded="sm" iconSpacing={1} leftIcon={<IoPlaySharp size="25px" />}>Play</Button>
                        </Flex>
                      </Grid>
                    </Container>
                  </Flex> 
                </SwiperSlide>)
              )
            }
          </Swiper>
        )
      }
    </Fragment>
  )
}

export default Showcase







// const iframeStyle = {
//   height: '100%', 
//   width: '100%', 
//   position: 'absolute', 
//   top: 0,
//   left: 0,
// }

{/* {
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
} */}

// {
//   trailer != null && state ? 
//     <YouTube 
//       videoId={trailer.id}
//       className={styles.container}
//       iframeClassName={styles.trailer}
//       ref={playerRef}
//       opts={{
//       playerVars: {
//         autoplay: 1,
//         rel: 0,
//         loop: 1,
//         modestbranding: 1,
//         playlist: trailer.id,
//         controls: 0,
//         // mute: 0,
//         showinfo: 0,
//       } 
//     }} />
//   : 
//   <Img pos="absolute" h="full" w="full" top={0} left={0} objectFit="cover" objectPosition="center" alt={`${title.romaji} cover`} src={cover} />
// }