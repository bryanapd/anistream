import { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import {
  Box, Text, Heading, Container, Button, useColorModeValue as mode, Grid, Spinner, HStack
} from "@chakra-ui/react";

import AppLayout from "../../../layout/AppLayout";
import { AppSpacer } from "../../../components/Header";
import { PageSectionHeader } from "../../../components/PageHeader";

import { useGetAnimeByGenreQuery } from "../../../features/apiSlice";
import { useSelector } from "react-redux";
import { ItemCard } from "../../../components/sections/RecentEpisodes";

import { capitalizeFirstLetter } from '../../../lib/capitalizeFirstLetter'


export default function Genre({ title = 'Genre' }) {
  let anime = []
  const router = useRouter()
  const genre = useSelector(state => state.filters.genre)
  const { data, isLoading, isFetching, isError } = useGetAnimeByGenreQuery(genre, { skip: !genre })
  if(data) {
    const { results } = data
    anime = results
  }

  console.log(genre, 'slug genre')
  return(
    <AppLayout>
      <AppSpacer />
      <AppSpacer />
      <Container maxW="container.xl" minH="75vh">
        <HStack>
          <PageSectionHeader title={genre && capitalizeFirstLetter(genre)} />
          { (isLoading || isFetching) && <Spinner size="md" color="primary.500" />}
        </HStack>
        <Grid templateColumns="repeat(auto-fit, minmax(13rem, 1fr))" gap={4}>
          { anime && anime.map(anime => <ItemCard key={anime.id} {...anime} />)  }
        </Grid>
      </Container>
    </AppLayout>
  )
}