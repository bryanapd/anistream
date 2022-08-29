import Head from 'next/head'
import Image from 'next/image'
import { Box, Heading } from '@chakra-ui/react'
import AppLayout from '../layout/AppLayout'
import { RecentRelease } from '../components/sections/RecentRelease'
import PopularAnime from '../components/sections/PopularAnime'
import Showcase from '../components/Showcase'
import { useGetAnimeDetailsByIdQuery } from '../features/apiSlice'
import { useRouter } from 'next/router'

export default function Home({ title = 'AniStream'}) {
  const router = useRouter()
  const { data: anime, isLoading, isError } = useGetAnimeDetailsByIdQuery(918, { skip: !router })
  
  return (
    <AppLayout>
      <Showcase />
      <PopularAnime pt={100} />
    </AppLayout>
  )
}
