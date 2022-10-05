import { Fragment, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { 
  Box, Text, Heading, Button, Container, Grid, useColorModeValue as mode,
  Flex
} from "@chakra-ui/react";


import AppLayout from '../../../layout/AppLayout'
import { ItemCard } from '../../../components/sections/RecentEpisodes'
import { AppSpacer } from "../../../components/Header";
import { useSelector } from "react-redux";


function Lists({ title = 'My Bookmarks' }) {
  const router = useRouter()
  const favorites = useSelector(state => state.lists.favorites)
  return(
    <AppLayout>
      <AppSpacer /> <AppSpacer />
      <Container maxW="container.xl">
        <Heading size="lg" mb={6}>{title}</Heading>
        <Grid templateColumns="repeat(auto-fit, minmax(14rem, 1fr))" gap={4}>
          {
            favorites && favorites.map(anime => <ItemCard key={anime.id} {...anime} />)
          }
        </Grid>
      </Container>
    </AppLayout>
  )
}

export default Lists