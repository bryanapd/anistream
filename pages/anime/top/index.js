import { Fragment, useEffect, useState, useCallback } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { 
  Box, Text, Heading, Button, Container, useColorModeValue as mode,
  Grid, HStack, IconButton, Center
} from '@chakra-ui/react'
import { BsArrowLeft, BsArrowLeftCircle, BsArrowRight } from 'react-icons/bs'

import AppLayout from "../../../layout/AppLayout";
import { AppSpacer } from '../../../components/Header'
import { SkeletonItemCard } from '../../../components/SkeletonCard'
import { ItemCard } from '../../../components/sections/RecentEpisodes'

import { useGetPopularAnimeQuery } from "../../../features/api/apiSlice";
import { PageSectionHeader } from "../../../components/PageHeader";


export default function TopAnime ({ title = 'Top Anime' }){
  let topAnime = []
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const { data, isLoading, isError } = useGetPopularAnimeQuery({ page: currentPage, perPage: 20 })
  if(data){
    const { results } = data
    topAnime = results
  }

  useEffect(() => {
    router.push({ pathname: '/anime/top', query: { page: currentPage }}, undefined, { shallow: true })
  }, [currentPage])

  const handlePrev = () => {
    setCurrentPage(prev => prev - 1)
  }

  const handleNext = () => {
    setCurrentPage(prev => prev + 1)
  }

  return(
    <AppLayout>
      <AppSpacer />
      <AppSpacer />
      <Container maxW="container.xl">
        <PageSectionHeader title={title} />
        <Grid templateColumns="repeat(auto-fit, minmax(14rem, 1fr))" gap={4}>
          { !data && isLoading && Array.from({ length: 10 }).map((item, itemKey) => <SkeletonItemCard key={itemKey} /> ) }
          { topAnime && topAnime.map(anime => <ItemCard key={anime.id} {...anime} /> ) }
        </Grid>
        {
          data && (
            <Center mt={10}>
              <Button variant="ghost" size="sm" leftIcon={<BsArrowLeft />} disabled={currentPage == 1 ? true : false} onClick={handlePrev} mr={2}>Previous</Button>
              <Button variant="ghost" size="sm" rightIcon={<BsArrowRight />} disabled={data.hasNextPage == false ? true : false} onClick={handleNext}>Next</Button>
            </Center>
          )
        }
      </Container>
    </AppLayout>
  )
}