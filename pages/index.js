import Head from 'next/head'
import Image from 'next/image'
import { Box, Heading } from '@chakra-ui/react'
import AppLayout from '../layout/AppLayout'
import { RecentRelease } from '../components/sections/RecentRelease'
import PopularAnime from '../components/sections/PopularAnime'

export default function Home({ title = 'AniStream'}) {
  return (
    <AppLayout>
      <PopularAnime pt={100} />
    </AppLayout>
  )
}
