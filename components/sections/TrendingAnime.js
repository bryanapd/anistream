import { Fragment, useRef, useState } from "react";
import Router, { useRouter } from "next/router";

import { 
  Box, Text, Heading, Img, Flex, Container, Spinner, 
  Spacer, HStack, IconButton, Tag
} from '@chakra-ui/react'
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Grid } from "@splidejs/splide-extension-grid";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";

import { ItemCard } from './RecentEpisodes'
import { useGetTrendingAnimeQuery } from "../../features/apiSlice";



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
      <Container maxW="95vw">
        { !episodes && isLoading && <Spinner /> }
        <HStack pos="relative" zIndex="999999" mb={-8} mx={12}>
          <Heading size="md">{title}</Heading>
          <Spacer />
          <IconButton size="lg" variant="outline" rounded="2xl" icon={<IoArrowBack />} onClick={handleSplidePrev} />
          <IconButton size="lg" variant="outline" rounded="2xl" icon={<IoArrowForward />} onClick={handleSplideNext} />
        </HStack>
        <Splide extensions={{ Grid }} ref={ref} options={options}>
          { 
            episodes && 
            [...episodes]
              .sort((a, b) => b.rating - a.rating)
              .map(episode => <SplideSlide key={episode.id}> <ItemCard {...episode} /> </SplideSlide>) }
        </Splide>
      </Container>
    </Box>
  )
}
export default TrendingAnime