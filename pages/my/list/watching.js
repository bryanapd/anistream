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


function Watching({ title = 'Watching' }) {
  const router = useRouter()

  return(
    <AppLayout>
      <AppSpacer />
      <Container maxW="container.xl">
        <Heading size="lg">{title}</Heading>
      </Container>
    </AppLayout>
  )
}

export default Watching