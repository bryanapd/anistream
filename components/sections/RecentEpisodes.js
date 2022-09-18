import { Fragment, useRef, useState } from "react";
import Link from "next/link";

import { 
  Box, Text, Heading, Img, Flex, Container, Spinner, Tag, HStack, Button,
  useColorModeValue as mode 
} from '@chakra-ui/react'

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay, Lazy, Controller, Thumbs, Grid } from "swiper"

import { useGetRecentEpisodesQuery } from "../../features/apiSlice";


export const ItemCard = ({ id, title, image, rating = 100, color, episodeId, episodeTitle, episodeNumber, genres = [], status, h = '400px' }) => {
  const [hovered, setHovered] = useState(false)
  return(
    <Link href={`/anime/${id}`} passHref>
      <Flex 
        p={3} 
        flexDir="column" alignItems="start" justifyContent="flex-end" 
        minH="20vh" h={h}
        w="auto"
        pos="relative"  
        overflow="hidden"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        cursor="pointer">
        <Img
          h="full"
          w="full"
          src={image}
          objectFit="cover"
          opacity={hovered ? 1 : .8}
          pos="absolute"
          top={0} left={0}
          transition="all 300ms ease"
          _hover={{
            transform: 'scale(1.05)'
          }}
          alt={`${title.romaji} image`}
          />
        { !hovered && <Box pos="absolute" h="full" w="full" bgGradient={`linear(to-b, transparent, rgb(10 22 37))`} bottom={0} left={0} /> } 
        <Tag size="sm" bg="primary.500" color="white" fontWeight="bold" rounded="0" zIndex="99" mb={2}>
          { episodeId ? `Ep. ${episodeNumber}` : status }
        </Tag>
        <Heading size="xs" color="white" zIndex="99" noOfLines={2}>{title.romaji}</Heading>
      </Flex>
    </Link>
  )
}

const RecentEpisodes = ({ title = 'Recent Episodes', boxStyle }) => {
  var episodes
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useGetRecentEpisodesQuery()
  if(data){
    const { results } = data
    episodes = results
  }

  const swiperParams = {
    modules: [Controller, FreeMode, Thumbs, Autoplay, Grid],
    grid: {
      rows: 2,
      fill: 'row'
    },
    slidesPerView: 5,
    freeMode: true,
    loop: false,
    pagination: false,
    spaceBetween: 15
  }

  return(
    <Box {...boxStyle}>
      <Container maxW="container.xl">
        { !episodes && isLoading && <Spinner /> }
        <Flex justifyContent="space-between">
          <Heading size="md" mb={6}>{title}</Heading>
          <Button size="sm" variant="seeMore">Show More</Button>
        </Flex>
        <Swiper {...swiperParams}>
          { episodes && episodes.slice(0,10).map(episode => <SwiperSlide key={episode.id}> <ItemCard {...episode} /> </SwiperSlide>) }
        </Swiper>
      </Container>
    </Box>
  )
}
export default RecentEpisodes