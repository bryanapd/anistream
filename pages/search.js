import { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { 
  Box, Heading, Text, Button, useColorModeValue as mode, Container, Spinner, 
  HStack, Icon, Flex, Grid, 
} from "@chakra-ui/react";
import Select from 'react-select'
import { IoCloseSharp, IoPricetags } from "react-icons/io5";

import AppLayout from "../layout/AppLayout";
import { AppSpacer } from "../components/Header";
import { FormInput, FormSelect } from "../components/Form";
import { ItemCard } from "../components/sections/RecentEpisodes";
import { SkeletonItemCard } from "../components/SkeletonCard";

import { useGetAnimeAdvacedSearchQuery, useGetAnimeSearchQuery } from "../features/apiSlice";
import { setSearchValue, setYear, setFormat, setSeason, setSelectedGenre, removeSelectedGenre, removeSearchQuery } from "../features/filterSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import useDebounce from "../hooks/useDebounce";
import filtersValue from '../lib/filters'


const Search = ({ title = '', props }) => {
  let result = []
  const dispatch = useDispatch()
  // const debouncedSearchQuery = useDebounce(query, 3000)
  const filters = useSelector(state => state.filters)
  const anime = useSelector(state => state.filters.search)
  const genres = useSelector(state => state.filters.genres)
  const season = useSelector(state => state.filters.season)
  const year = useSelector(state => state.filters.year)
  const format = useSelector(state => state.filters.format)

  console.log(filters, 'filters')
  console.log("selected genres from store", genres)

  const { data, isLoading, isFetching, isError } = useGetAnimeAdvacedSearchQuery({ 
    query: anime ? anime : undefined,
    genres: genres.length > 0 ? genres.map(genre => `"${genre.value}"`) : undefined,
    page: 1, 
    perPage: 50, 
    season: season ? season : undefined,
    format: format ? format : undefined,
    year: year ? year : undefined
  })
  if(data){
    const { results } = data
    result = results
  }else if(isError){
    console.log(isError)
  }

  const handleQuery = event => {
    dispatch(setSearchValue(event.target.value))
  }
  const handleSeason = event => {
    dispatch(setSeason(event.target.value))
  }
  const handleYear = event => {
    dispatch(setYear(event.target.value))
  }
  const handleFormat = event => {
    dispatch(setFormat(event.target.value))
  }
  const handleGenre = event => {
    let index = event.nativeEvent.target.selectedIndex;
    let genreLabel = event.nativeEvent.target[index].text;
    const isSelected = genres.includes(genreLabel)
    console.log("selected genre is?", isSelected)
    if(isSelected){
      dispatch(removeSelectedGenre(genreLabel))
    }else{
      dispatch(setSelectedGenre(genreLabel))
    }
    // if(isSelected){
    //   setSelectedGenre((prev) => prev.filter((label) => label !== genreLabel))
    // }else{
    //   setSelectedGenre((prev) => [...prev, genreLabel]);
    // }
  }

  const selectProps = {
    controlProps: { w: { base: 'auto', md: '200px' } },
    rounded: 'sm',
    bg: mode('gray.100', 'white'),
    color: 'black'
  }

  return(
    <AppLayout>
      <AppSpacer />
      <Container maxW="container.xl" minH="90vh" mt={20}>
        <HStack spacing={4} mb={10}>
          <FormInput 
            label="Search" 
            defaultValue={anime}
            value={anime}
            onChange={handleQuery}
            right={anime != '' && <IoCloseSharp />}
            rightProps={{ onClick: () => dispatch(removeSearchQuery()) }} 
            {...selectProps} />
          <FormSelect label="Genres" options={filtersValue.genres} onChange={handleGenre} {...selectProps} />
          <FormSelect label="Year" options={filtersValue.years} onChange={handleYear} {...selectProps} />
          <FormSelect label="Season" options={filtersValue.seasons} onChange={handleSeason} {...selectProps} />
          <FormSelect label="Format" options={filtersValue.formats} onChange={handleFormat} {...selectProps} />
        </HStack>
        <Box>
         <HStack mb={4}>
          <Icon as={IoPricetags} />
          <Heading size="sm">Tags </Heading>
         </HStack>
         <HStack>
          { anime && <Button size="xs" variant="primary">{anime}</Button> }
          { genres.length != 0 && (genres || []).map((genre, gKey) => <Button key={gKey} size="xs" variant="primary">{genre}</Button> )}
         </HStack>
        </Box>
        <Box my={10}>
          <Grid templateColumns="repeat(auto-fit, minmax(13rem, 1fr))" gap={4}>
            { !data && isLoading && Array.from({ length: 10 }).map((item, itemKey) => <SkeletonItemCard key={itemKey} /> ) }
            { result && [...result].sort((a, b) => b.rating - a.rating).map(res => <ItemCard key={res.id} {...res} /> ) }
          </Grid>
        </Box>
      </Container>
    </AppLayout>
  )
}
export default Search


// const swiperParams = {
//   lazy: true,
//   // freeMode: true,
//   slidesPerView: 5,
//   spaceBetween: 10,
//   modules: [Autoplay, Lazy, FreeMode, Grid, Pagination, EffectFade],
//   pagination: {
//     el: '.custom-pagination',
//     clickable: true,
//     type: 'bullets'
//   },
//   slidesPerGroup: 10,
//   grid: {
//     rows: 3,
//     fill: 'row'
//   },
// }

// <Swiper {...swiperParams}>
//   { !data && isLoading && Array.from({ length: 10 }).map((item, itemKey) => <SwiperSlide key={itemKey}> <SkeletonItemCard /> </SwiperSlide>) }
//   { result && [...result].sort((a, b) => b.rating - a.rating).map(res => <SwiperSlide key={res.id}> <ItemCard {...res} /> </SwiperSlide>) }
// </Swiper>

// <div className="custom-pagination" style={{ marginTop: 20, display: 'flex', margin: 'auto', alignItems: 'center', justifyContent: 'center', minHeight: '3vh' }} />