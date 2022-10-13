import { Fragment, useState, useEffect } from "react";
import {
  Box, Container, useColorModeValue as mode, Grid, Spinner, HStack
} from "@chakra-ui/react";

import AppLayout from "../../../layout/AppLayout";
import { AppSpacer } from "../../../components/Header";
import { PageSectionHeader } from "../../../components/PageHeader";
import { ItemCard } from "../../../components/sections/RecentEpisodes";

import { useSelector } from "react-redux";
import { useGetAnimeAdvancedSearchQuery } from "../../../features/api/apiSlice";
import { capitalizeFirstLetter } from '../../../lib/capitalizeFirstLetter'


export default function Format({ title = 'Format' }) {
  let anime = []
  const format = useSelector(state => state.filters.format)
  const { data, isLoading, isFetching } = useGetAnimeAdvancedSearchQuery({ format: format }, { skip: !format })
  if(data) {
    const { results } = data
    anime = results
  }
  console.log(format, 'slug format')
  return(
    <AppLayout>
      <AppSpacer />
      <AppSpacer />
      <Container maxW="container.xl" minH="75vh">
        <HStack>
          <PageSectionHeader title={format && capitalizeFirstLetter(format)} />
          { (isLoading || isFetching) && <Spinner size="md" color="primary.500" />}
        </HStack>
        <Grid templateColumns="repeat(auto-fit, minmax(13rem, 1fr))" gap={4}>
          { anime && anime.map(anime => <ItemCard key={anime.id} {...anime} />)  }
        </Grid>
      </Container>
    </AppLayout>
  )
}