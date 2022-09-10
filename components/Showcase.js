import { Fragment, useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { 
  Box, Text, Heading, Container, Img, Spinner, Stack, 
  HStack, Flex, Divider, Tag, Button, Grid,
} from "@chakra-ui/react";
import { IoPlaySharp } from "react-icons/io5";

import { useGetAnimeDetailsByIdQuery, useGetTrendingAnimeQuery } from "../features/apiSlice";

import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Navigation, Pagination, FreeMode, Autoplay, Lazy, Controller, Thumbs } from "swiper"



const ShowcaseCard = ({ title, cover, genres, description }) => (
  <Flex flexDir="column" alignItems="start" justifyContent="flex-end" w="full" minH="50vh" h="60vh" pos="relative" pb={4}>
    <Img filter="blur(2px)" pos="absolute" h="full" w="full" top={0} left={0} objectFit="cover" objectPosition="center" alt={`${title.romaji} cover`} src={cover} />
    <Box layerStyle="showcaseLinearBottom" /> 
    <Box layerStyle="showcaseLinearTop" /> 
    <Box layerStyle="showcaseLinearRight" /> 
    <Container maxW="container.xl" pos='relative' zIndex="999">
      <Grid templateColumns="auto 400px" gap={4}>
        <Flex flexDir="column">
          <Heading size="lg" mb={2}>{title.romaji}</Heading>
          <HStack spacing={4} mb={4}>
            { genres.map((genre, genreKey) => <Tag key={genreKey} bg="primary.500" fontSize="xs" color="white" fontWeight="bold" rounded="sm">{genre}</Tag> ) }
          </HStack>
          <Text fontSize="sm" noOfLines={{ base: 5, md: 10 }} whiteSpace="pre-line" mb={10}>{description.replace(/<[^>]*>?/gm, '' || '')}</Text>
          <Button variant="primary" w="max" iconSpacing={1} leftIcon={<IoPlaySharp size="25px" />}>Play</Button>
        </Flex>
      </Grid>
    </Container>
  </Flex> 
)

const ThumbCard = ({ opacity, image, title, mt }) => (
  <Box pos="relative" transition="all 300ms ease" _hover={{ transform: 'scale(1.05)', opacity: 1 }} mt={mt} cursor="pointer" opacity={opacity}>
    <Img 
      h="400px"
      src={image} 
      objectFit="cover" objectPosition="center center" 
      alt={`${title.romaji} thumb image`} 
      />
  </Box>
)

const Showcase = ({ }) => {
  let anime
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [swiperIndex, setSwiperIndex] = useState(0)
  const { data, isLoading, isError } = useGetTrendingAnimeQuery()

  if(data){
    const { results } = data
    anime = results
  }else if(isError){
    console.log('Showcase error?: ', isError)
  }

  // const handlePrev = useCallback(() => {
  //   if (!sliderRef.current) return
  //   sliderRef.current.swiper.slidePrev()
  // }, [])

  // const handleNext = useCallback(() => {
  //   if (!sliderRef.current) return
  //   sliderRef.current.swiper.slideNext()
  // }, [])

  const swiperParams = {
    loop: true,
    lazy: true,
    preloadImages: false,
    spaceBetween: 30,
    effect: 'fade',
    autoplay: {
      delay: 3500,
      disableOnInteraction: false
    },
    freeMode: true,
    modules: [EffectFade, Navigation, FreeMode, Autoplay, Lazy, Controller, Thumbs ],
    fadeEffect: {
      crossFade: true
    },
    onActiveIndexChange: swiper => setSwiperIndex(swiper.realIndex),
    thumbs: { swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }
  }
  
  const thumbsParams = {
    modules: [Controller, FreeMode, Thumbs, Autoplay],
    slidesPerView: 6,
    freeMode: true,
    loop: true,
    watchSlidesProgress: true,
    pagination: false,
    spaceBetween: 10
  }

  return(
    <Fragment>
      { 
      anime && (
        <Fragment>
          { !data && isLoading && <Spinner color="primary.500" size="sm" />}
          <Swiper {...swiperParams}>
            { 
              [...anime]
              .sort((a, b) => b.rating - a.rating)
              .filter(f => f.status == 'Ongoing' && f.rating >= 70)
              .map(anime => (
                <SwiperSlide key={`slide_${anime.id}`}>
                  <ShowcaseCard {...anime} />
                </SwiperSlide>)
              )
            }
          </Swiper>
          <Box mt={10}>
            <Heading size="md" textAlign="center" mb={6}>Top Trending Weekly</Heading>
            <Swiper onSwiper={setThumbsSwiper} {...thumbsParams}>
              {
                [...anime]
                .sort((a, b) => b.rating - a.rating)
                .filter(f => f.status == 'Ongoing' && f.rating >= 70)
                .map((anime, aniKey) => (
                  <SwiperSlide key={`slide_${anime.id}`}>
                    <ThumbCard opacity={swiperIndex == aniKey ? 1 : .5} mt={swiperIndex == aniKey ? -10 : 0} {...anime} />
                  </SwiperSlide>)
                )
              }
            </Swiper>
          </Box>
        </Fragment> )
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