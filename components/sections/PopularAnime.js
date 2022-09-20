import { Fragment, useEffect, useRef, useState } from "react";
import Router, { useRouter } from "next/router";

import { 
  Box, Text, Heading, Img, Flex, Container, Spinner, 
  Spacer, HStack, Button
} from '@chakra-ui/react'
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

import { ItemCard } from './RecentEpisodes'
import { useGetPopularAnimeQuery } from "../../features/apiSlice";

import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Navigation, Pagination, FreeMode, Autoplay, Lazy, Controller, Grid, Thumbs, A11y, Scrollbar } from "swiper"


const PopularAnime = ({ title = 'All Time Popular Anime', boxStyle }) => {
  var episodes
  const { data, isLoading, isError } = useGetPopularAnimeQuery({ page: 1, perPage: 50 })

  if(data){
    const { results } = data
    episodes = results
  }

  const swiperParams = {
    modules: [Navigation, Controller, FreeMode, Thumbs, Autoplay, Grid, Pagination],
    grid: {
      rows: 2,
      fill: 'row'
    },
    scrollbar: {
      draggable: true
    },
    slidesPerView: 5,
    slidesPerGroup: 10,
    freeMode: true,
    pagination: {
      el: '.custom-pagination',
      clickable: true,
      type: 'bullets'
    },
    spaceBetween: 10
  }
  return(
    <Box {...boxStyle}>
      { !episodes && isLoading && <Spinner /> }
      <Container maxW="container.xl"mb={6}>
        <HStack justifyContent="space-between" mb={6}>
          <Heading size="md">{title}</Heading>
          {/* <Button size="sm" variant="seeMore">Show More</Button> */}
        </HStack>
        <Swiper onSlideChange={() => console.log('slide change')} {...swiperParams}>
          { episodes && [...episodes].sort((a, b) => b.rating - a.rating).map(episode => <SwiperSlide key={episode.id}> <ItemCard {...episode} /> </SwiperSlide>) }
        </Swiper>
      </Container>
      <div className="custom-pagination" style={{ display: 'flex', margin: 'auto', alignItems: 'center', justifyContent: 'center', minHeight: '3vh' }} />
    </Box>
  )
}
export default PopularAnime