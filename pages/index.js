import Head from 'next/head'
import Image from 'next/image'
import { Box, Heading } from '@chakra-ui/react'

import AppLayout from '../layout/AppLayout'
import PopularAnime from '../components/sections/PopularAnime'
import Showcase from '../components/Showcase'
import RecentEpisodes from '../components/sections/RecentEpisodes'

export default function Home({ title = 'AniStream'}) {

  return (
    <AppLayout>
      <Showcase />
      <PopularAnime pt={100} />
      <RecentEpisodes boxStyle={{ mt: 50 }} />
    </AppLayout>
  )
}
