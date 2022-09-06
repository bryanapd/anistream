import Head from 'next/head'
import Image from 'next/image'
import { Box, Heading } from '@chakra-ui/react'

import AppLayout from '../layout/AppLayout'
import PopularAnime from '../components/sections/PopularAnime'
import Showcase from '../components/Showcase'
import RecentEpisodes from '../components/sections/RecentEpisodes'
import TrendingAnime from '../components/sections/TrendingAnime'
import AnimeGenre from '../components/sections/AnimeGenre'

export default function Home({ title = 'AniStream'}) {

  return (
    <AppLayout>
      <Showcase />
      <PopularAnime boxStyle={{ mt: 20 }} />
      <TrendingAnime boxStyle={{ mt: 20 }} />
      <AnimeGenre boxStyle={{ mt: 50 }} />
      <RecentEpisodes boxStyle={{ my: 50 }} />
    </AppLayout>
  )
}
