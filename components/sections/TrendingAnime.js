import { Fragment, useRef, useState } from "react";
import Router, { useRouter } from "next/router";

import { 
  Box, Text, Heading, Img, Flex, Container, Spinner, 
  Spacer, HStack, IconButton, Tag
} from '@chakra-ui/react'
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

import { ItemCard } from './RecentEpisodes'
import { useGetTrendingAnimeQuery } from "../../features/apiSlice";

import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Navigation, Pagination, FreeMode, Autoplay, Lazy, Controller } from "swiper"



const options = {
  type: 'loop',
  rewind: true, 
  rewindByDrag: true, 
  perPage: 5, 
  perMove: 2,
  lazyLoad: true,
  arrows: false, 
  pagination: false, 
  drag: 'free', 
  gap: '1rem',
  // breakpoints: {
  //   500: {
  //     perPage: 1,
  //     perMove: 1
  //   },
  //   723: {
  //     perPage: 2,
  //     perMove: 2
  //   },
  //   935: {
  //     perPage: 3,
  //     perMove: 3
  //   },
  //   1247: {
  //     perPage: 6,
  //     perMove: 4
  //   }
  // }
}

const TrendingAnime = ({ title = 'Trending Anime', boxStyle }) => {
  const ref = useRef()
  const [currentPage, setCurrentPage] = useState(1);

  var episodes
  const { data, isLoading, isError } = useGetTrendingAnimeQuery()

  if(data){
    const { results } = data
    episodes = results
  }

  const handleSplideNext = () => {
    if(ref){
      ref.current.go('>')
    }
  }
  const handleSplidePrev = () => {
    if(ref){
      ref.current.go('<')
    }
  }
  return(
    <Box {...boxStyle}>
        { !episodes && isLoading && <Spinner /> }
        <Container maxW="container.xl" mb={4}>
          <HStack>
            <Heading size="md">{title}</Heading>
            <Spacer />
          </HStack>
        </Container>
        <Swiper
          autoplay={{
            delay: 3000,
            disableOnInteraction: false
          }}
          lazy={true}
          slidesPerView={5}
          spaceBetween={30}
          modules={[Autoplay, Lazy]}
          pagination={false}>
          { episodes && [...episodes].sort((a, b) => b.rating - a.rating).map(episode => <SwiperSlide key={episode.id}> <ItemCard {...episode} /> </SwiperSlide>) }
        </Swiper>
    </Box>
  )
}
export default TrendingAnime