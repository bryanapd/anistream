import { Fragment, useState } from "react";
import { 
  Box, Text, Heading, Container, Spinner, HStack, Button
} from '@chakra-ui/react'

import { ItemCard } from './RecentEpisodes'
import { useGetTrendingAnimeQuery } from "../../features/api/apiSlice";

import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Autoplay, Lazy } from "swiper"


const TrendingAnime = ({ title = 'Trending Anime', boxStyle }) => {
  let episodes
  const { data, isLoading, isError } = useGetTrendingAnimeQuery()

  if(data){
    const { results } = data
    episodes = results
  }
  const swiperParams = {
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    lazy: true,
    freeMode: true,
    slidesPerView: 6,
    spaceBetween: 10,
    modules: [Autoplay, Lazy, FreeMode],
    pagination: false
  }
  return(
    <Box {...boxStyle}>
      { !episodes && isLoading && <Spinner /> }
      <Container maxW="container.xl" mb={6}>
        <HStack justifyContent="space-between">
          <Heading size="md">{title}</Heading>
          <Button size="sm" variant="seeMore">Show More</Button>
        </HStack>
      </Container>
      <Swiper {...swiperParams}>
        { episodes && [...episodes].sort((a, b) => b.rating - a.rating).map(episode => <SwiperSlide key={episode.id}> <ItemCard {...episode} /> </SwiperSlide>) }
      </Swiper>
    </Box>
  )
}
export default TrendingAnime