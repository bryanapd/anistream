import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { 
  Box, Heading, Text, Button, useColorModeValue as mode, Container, Spinner
} from "@chakra-ui/react";

import AppLayout from "../layout/AppLayout";
import { AppSpacer } from "../components/Header";
import { ItemCard } from "../components/sections/RecentEpisodes";
import { SkeletonItemCard } from "../components/SkeletonCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Lazy, FreeMode, Grid, Pagination, EffectFade } from "swiper";

import useDebounce from "../hooks/useDebounce";
import { useGetAnimeSearchQuery } from "../features/apiSlice";


const Search = ({ title = '', props }) => {
  let result
  const router = useRouter()
  const [search, setSearch] = useState('')
  const debouncedSearchQuery = useDebounce(search, 1000)

  const { data, isLoading, isFetching, isError } = useGetAnimeSearchQuery({ url: router.query.name, page: 1, perPage: 50 }, { skip: !router.query })

  if(data){
    const { results } = data
    result = results
    console.log("data", data)
    console.log(data.currentPage)
    console.log("search res", results)
  }else if(isError){
    console.log(isError)
  }

  const swiperParams = {
    lazy: true,
    // freeMode: true,
    slidesPerView: 5,
    spaceBetween: 10,
    modules: [Autoplay, Lazy, FreeMode, Grid, Pagination, EffectFade],
    pagination: {
      el: '.custom-pagination',
      clickable: true,
      type: 'bullets'
    },
    slidesPerGroup: 10,
    grid: {
      rows: 3,
      fill: 'row'
    },
  }

  return(
    <AppLayout>
      <AppSpacer />
      <Container maxW="container.xl" mt={20}>
        <Heading size="md" mb={6}>
          Search results for <Text as="span" color="primary.500">{router.query.name}</Text> 
          { isLoading || isFetching ? <Spinner size="sm" color="primary.500" /> : '' } 
          : 
        </Heading>
        <Swiper {...swiperParams}>
          { !data && isLoading && Array.from({ length: 10 }).map((item, itemKey) => <SwiperSlide key={itemKey}> <SkeletonItemCard /> </SwiperSlide>) }
          { result && [...result].sort((a, b) => b.rating - a.rating).map(res => <SwiperSlide key={res.id}> <ItemCard {...res} /> </SwiperSlide>) }
        </Swiper>
        <div className="custom-pagination" style={{ marginTop: 20, display: 'flex', margin: 'auto', alignItems: 'center', justifyContent: 'center', minHeight: '3vh' }} />
      </Container>
    </AppLayout>
  )
}

export default Search