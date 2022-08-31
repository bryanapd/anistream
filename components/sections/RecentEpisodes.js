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

import { useGetRecentEpisodesQuery } from "../../features/apiSlice";


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

const RecentCard = ({ id, title, image, rating, color, episodeId, episodeTitle, episodeNumber, genres = [] }) => {
  const [hovered, setHovered] = useState(false)
  return(
    <Flex 
      p={3} 
      flexDir="column" alignItems="start" justifyContent="flex-end" 
      minH="20vh" h="47vh" 
      w="auto"
      pos="relative"  
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      transition="all 300ms ease"
      _hover={{
        transform: 'scale(1.05)'
      }}
      onClick={() => Router.push(`/anime/${id}`)}
      cursor="pointer">
      <Img
        src={image}
        h="full"
        w="full"
        objectFit="cover"
        pos="absolute"
        top={0} left={0}
        alt={`${title.romaji} image`}
        />
      {
        hovered == false && (
          <Box 
            pos="absolute" h="full" w="full" 
            bgGradient={`linear(to-b, transparent, rgb(10 22 37))`}
            bottom={0} left={0}
            />
        )
      } 
      <Tag size="sm" bg="#436bf1" color="white" fontWeight="bold" rounded="0" zIndex="99" mb={2}>{`Ep. ${episodeNumber}`}</Tag>
      <Heading size="sm" zIndex="99">{title.romaji}</Heading>
    </Flex>
  )
}

const RecentEpisodes = ({ title = 'Recent Release', boxStyle }) => {
  const ref = useRef()
  const [currentPage, setCurrentPage] = useState(1);
  

  var episodes
  const { data, isLoading, isError } = useGetRecentEpisodesQuery()

  if(data){
    const { results } = data
    episodes = results
    console.log("episodes", episodes)
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
          { episodes && episodes.map(episode => <SplideSlide key={episode.id}> <RecentCard {...episode} /> </SplideSlide>) }
        </Splide>
      </Container>
    </Box>
  )
}
export default RecentEpisodes