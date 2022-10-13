import { Fragment, useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { 
  Box, Text, Heading, Container, Img, Spinner, Stack, 
  HStack, Flex, Divider, Tag, Button, Grid, StackDivider, 
} from "@chakra-ui/react";
import { BsPlay, BsPlayCircle, BsPlu, BsHeart, BsFillHeartFill } from "react-icons/bs"

import toast from 'react-hot-toast'
import ReactStars from "react-rating-stars-component";
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Navigation, Pagination, FreeMode, Autoplay, Lazy, Controller, Thumbs } from "swiper"

import { SkeletonHeroCard } from "./SkeletonCard";

import { useSelector, useDispatch } from "react-redux";
import { setFavorite, setWatching } from "../features/slices/listsSlice";
import { useGetTrendingAnimeQuery } from "../features/api/apiSlice";


const ShowcaseCard = ({ id, title, cover, genres, description, rating, starsProps, onClick, filled = false }) => (
  <Flex  color="white" flexDir="column" alignItems="start" justifyContent="flex-end" w="full" minH="50vh" h="60vh" pos="relative" pb={4}>
    <Img filter="blur(2px)" pos="absolute" h="full" w="full" top={0} left={0} objectFit="cover" objectPosition="center" alt={`${title.romaji} cover`} src={cover} />
    <Box layerStyle="showcaseLinearBottom" /> 
    <Box layerStyle="showcaseLinearTop" /> 
    <Box layerStyle="showcaseLinearRight" /> 
    <Container maxW="container.xl" pos='relative' zIndex="999">
      <Grid templateColumns="auto 400px" gap={4}>
        <Flex flexDir="column">
          <Heading size="lg" mb={2}>{title.romaji}</Heading>
          <Stack direction="row" divider={<StackDivider />} spacing={4} mb={4}>
            <ReactStars value={(rating / 100) * 5} {...starsProps}  />
            <HStack>
              { genres.map((genre, genreKey) => <Tag key={genreKey} size="lg" fontSize="xs" color="white" bg="blackAlpha.600" rounded="full">{genre}</Tag> ) }
            </HStack>
          </Stack>
          <Text fontSize="sm" noOfLines={{ base: 5, md: 5 }} whiteSpace="pre-line" mb={6}>{description && description.replace(/<[^>]*>?/gm, '')}</Text>
          <HStack spacing={8}>
            <Link href={`/anime/${id}`}>
              <Button w="max" size="lg" variant="ghost" leftIcon={<BsPlayCircle size="40px" />} iconSpacing={2} p={0} transition="all 300ms ease" _hover={{ transform: 'scale(1.1)'}}>
                Play
              </Button>
            </Link> {/* <AddToList anime={anime} icon={BsPlus} /> */}
            <Button 
              w="max" size="lg" 
              variant="ghost" 
              leftIcon={filled == false ? <BsHeart color="red" fontSize="35px" /> : <BsFillHeartFill color="red" fontSize="35px" /> } 
              iconSpacing={2} p={0} 
              onClick={onClick} 
              _hover={{ transform: 'scale(1.1)' }} 
              transition="all 300ms ease">
              Favorite
            </Button>
          </HStack>
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
  const dispatch = useDispatch()
  const favorites = useSelector(state => state.lists.favorites)
  const { data, isLoading, isFetching, isError } = useGetTrendingAnimeQuery()
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
    // autoplay: {
    //   delay: 3500,
    //   disableOnInteraction: true
    // },
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

  const starsProps = {
    size: 18,
    count: 5,
    color: 'black',
    activeColor: 'yellow',
    isHalf: true,
    edit: false,
    // emptyIcon: <i className="far fa-star" />,
    // halfIcon: <i className="fa fa-star-half-alt" />,
    // filledIcon: <i className="fa fa-star" />,
  }

  const addToFavorites = anime => {
    dispatch(setFavorite(anime))
  }

  const notify = ({ id, title = 'Successfully' }) => {
    const exist = favorites.find(f => f.id === id)
    if(exist){
      toast(`${title} remove from favorites!`, {
        duration: 1500,
        icon: '💔'
      })
    } else {
      toast(`${title} added to favorites!`, {
        duration: 1500,
        icon: '👏'
      })
    }
  }

  return(
    <Fragment>
      { 
      anime && (
        <Fragment>
          <Box>
            <Swiper {...swiperParams}>
              { !data && isLoading && <SwiperSlide> <SkeletonHeroCard /> </SwiperSlide> }
              { 
                [...anime]
                .sort((a, b) => b.rating - a.rating)
                .filter(f => f.status == 'Ongoing') //&& f.rating >= 70
                .map(anime => (
                  <SwiperSlide key={`slide_${anime.id}`}>
                    <ShowcaseCard 
                      starsProps={starsProps} 
                      onClick={() => { addToFavorites(anime); notify({ id: anime.id, title: anime.title.romaji }) }} 
                      filled={favorites.find(f => f.id == anime.id) ? true : false}
                      {...anime} 
                      />
                  </SwiperSlide>)
                )
              }
            </Swiper>
          </Box>
          <Box mt={10}>
            <Heading size="md" textAlign="center" mb={6}>Top Trending Weekly</Heading>
            <Swiper onSwiper={setThumbsSwiper} {...thumbsParams}>
              {
                [...anime]
                .sort((a, b) => b.rating - a.rating)
                .filter(f => f.status == 'Ongoing')
                .map((anime, aniKey) => (
                  <SwiperSlide key={`slide_${anime.id}`}>
                    <ThumbCard opacity={swiperIndex == aniKey ? 1 : .8}  {...anime} /> {/* mt={swiperIndex == aniKey ? -10 : 0} */}
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