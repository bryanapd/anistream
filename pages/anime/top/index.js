import { Fragment, useEffect, useState, useCallback } from "react";
import Router from "next/router";
import Link from "next/link";
import { 
  Box, Text, Heading, Button, Container, useColorModeValue as mode,
  Grid, HStack, IconButton
} from '@chakra-ui/react'

import AppLayout from "../../../layout/AppLayout";
import { AppSpacer } from '../../../components/Header'
import { SkeletonItemCard } from '../../../components/SkeletonCard'
import { ItemCard } from '../../../components/sections/RecentEpisodes'
import { BsArrowLeftCircle} from 'react-icons/bs'

import { useGetPopularAnimeQuery } from "../../../features/apiSlice";


export default function TopAnime ({ title = 'Top Anime' }){
  let topAnime = []
  const { data, isLoading, isError } = useGetPopularAnimeQuery()

  if(data){
    const { results } = data
    topAnime = results
  }

  return(
    <AppLayout>
      <AppSpacer />
      <AppSpacer />
      <Container maxW="container.xl">
        <HStack mb={6} spacing={4}>
          <Link href="/"> 
            <IconButton size="lg" variant="ghost" icon={<BsArrowLeftCircle size={40} />} />  
          </Link>
          <Heading size="md">{title}</Heading>
        </HStack>
        <Grid templateColumns="repeat(auto-fit, minmax(14rem, 1fr))" gap={4}>
          { !data && isLoading && Array.from({ length: 10 }).map((item, itemKey) => <SkeletonItemCard key={itemKey} /> ) }
          { topAnime && topAnime.map(anime => <ItemCard key={anime.id} {...anime} /> ) }
        </Grid>
      </Container>
    </AppLayout>
  )
}