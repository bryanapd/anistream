import { Fragment, useState, useEffect } from "react";
import { 
  Box, Heading, Container, useColorModeValue as mode, Grid, Tag 
} from '@chakra-ui/react'

import AppLayout from "../../../layout/AppLayout";
import { AppSpacer } from "../../../components/Header";
import { PageSectionHeader } from "../../../components/PageHeader";

import filters from '../../../lib/filters'


export default function Genres(props) {
  const { title = 'title?', items = [] } = props
  return(
    <AppLayout>
      <AppSpacer />
      <AppSpacer />
      <Container maxW="container.xl">
        <PageSectionHeader title="Genres" href="/" />
        <Grid templateColumns="repeat(auto-fit, minmax(5rem, 1rem))" gap={4}>
          {filters && filters.genres.map(genre => 
            <Tag key={genre.value} size="sm" variant="ghost" alignItems="center" justifyContent="center">{genre.label}</Tag> 
            )
          }
        </Grid>
      </Container>
    </AppLayout>
  )
}