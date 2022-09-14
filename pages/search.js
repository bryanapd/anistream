import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Box, Heading, Text, Button, useColorModeValue as mode, Container, Spinner, HStack } from "@chakra-ui/react";
import { IoCloseSharp } from "react-icons/io5";

import AppLayout from "../layout/AppLayout";
import { AppSpacer } from "../components/Header";
import { FormInput, FormSelect } from "../components/Form";
import { ItemCard } from "../components/sections/RecentEpisodes";
import { SkeletonItemCard } from "../components/SkeletonCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Lazy, FreeMode, Grid, Pagination, EffectFade } from "swiper";

import useDebounce from "../hooks/useDebounce";
import { useGetAnimeAdvacedSearchQuery, useGetAnimeSearchQuery } from "../features/apiSlice";
import { useSelector } from "react-redux";
import queryString from 'query-string'


const Search = ({ title = '', props }) => {
  let result = []
  const router = useRouter()
  const [query, setQuery] = useState(router.query.name)
  const debouncedSearchQuery = useDebounce(query, 3000)
  const [year, setYear] = useState(null)
  const [season, setSeason] = useState(null)
  const [format, setFormat] = useState(null)
  const [selectedGenre, setSelectedGenre] = useState([])
  const [filter, setFilter] = useState(false)
  const { data, isLoading, isFetching, isError } = useGetAnimeAdvacedSearchQuery({ 
    query: query ? query : undefined, 
    genres: selectedGenre.length > 0 ? selectedGenre.map(genre => `"${genre}"`) : undefined,
    page: 1, 
    perPage: 50, 
    season: season ? season : undefined,
    format: format ? format : undefined,
    year: year ? year : undefined
  })

  console.log("selected", selectedGenre)
  const parsed = queryString.stringify(selectedGenre)
  console.log(parsed, "parsed array")

  const genres = useSelector(state => state.genres)
  const years = useSelector(state => state.years)
  const seasons = useSelector(state => state.seasons)
  const formats = useSelector(state => state.formats)

  if(data){
    const { results } = data
    result = results
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

  const handleQuery = e => {
    setQuery(e.target.value)
  }
  const handleGenre = e => {
    let index = e.nativeEvent.target.selectedIndex;
    let genreLabel = e.nativeEvent.target[index].text;
    const isSelected = selectedGenre.includes(genreLabel)
    if(isSelected){
      setSelectedGenre((prev) => prev.filter((label) => label !== genreLabel))
    }else{
      setSelectedGenre((prev) => [...prev, genreLabel]);
    }
    // setSelectedGenre({...selectedGenre, genre: label })
  }
  const handleYear = e => {
    setYear(e.target.value)
  }
  const handleSeason = e => {
    setSeason(e.target.value)
  }
  const handleFormat = e => {
    setFormat(e.target.value)
  }

  const handleFilter = () => {
    if(query != null || genres.length >= 1 || year != null || season != null || format != null){
      setFilter(true)
    }
    else if (query == '' || query == null) {
      setFilter(false)
    }
  }

  return(
    <AppLayout>
      <AppSpacer />
      <Container maxW="container.xl" mt={20}>
        <HStack spacing={4} mb={10}>
          <FormInput 
            label="Search" 
            defaultValue={query}
            onChange={handleQuery}
            controlProps={{ w: 'auto' }} 
            right={ query != '' && <IoCloseSharp />}
            value={query}
            rightProps={{
              onClick: () => setQuery(''),
              _hover: { transform: 'scale(1.2)', transition: 'all 300ms ease' },
              cursor: 'pointer'
            }} />
          <FormSelect
            label="Genres"
            defaultValue="Any"
            options={genres}
            onChange={handleGenre}
            controlProps={{ w: { base: 'auto', md: '200px' } }} />
          <FormSelect
            label="Year"
            defaultValue="Any"
            options={years}
            onChange={handleYear}
            controlProps={{  w: { base: 'auto', md: '200px' } }}  />
          <FormSelect
            label="Season"
            defaultValue="Any"
            options={seasons}
            onChange={handleSeason}
            controlProps={{  w: { base: 'auto', md: '200px' } }}  />
          <FormSelect
            label="Format"
            defaultValue="Any"
            options={formats}
            onChange={handleFormat}
            controlProps={{  w: { base: 'auto', md: '200px' } }}  />
        </HStack>
        <Box my={10}>
          {/* { result && <Heading size="sm" color="gray.500" mb={4}>TV Shows</Heading> } */}
          <Swiper {...swiperParams}>
            { !data && isLoading && Array.from({ length: 10 }).map((item, itemKey) => <SwiperSlide key={itemKey}> <SkeletonItemCard /> </SwiperSlide>) }
            { result && [...result].sort((a, b) => b.rating - a.rating).map(res => <SwiperSlide key={res.id}> <ItemCard {...res} /> </SwiperSlide>) }
          </Swiper>
        </Box>
        <div className="custom-pagination" style={{ marginTop: 20, display: 'flex', margin: 'auto', alignItems: 'center', justifyContent: 'center', minHeight: '3vh' }} />
      </Container>
    </AppLayout>
  )
}

export default Search