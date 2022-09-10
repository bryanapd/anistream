import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import { 
  Box, Heading, Text, Button, Grid, useColorModeValue as mode, Container
} from "@chakra-ui/react";

import AppLayout from "../layout/AppLayout";
import useDebounce from "../hooks/useDebounce";
import { useGetAnimeSearchQuery } from "../features/apiSlice";
import { AppSpacer } from "../components/Header";
import { ItemCard } from "../components/sections/RecentEpisodes";


const Search = ({ title = '', props }) => {
  let result
  const router = useRouter()
  const [search, setSearch] = useState('')
  const debouncedSearchQuery = useDebounce(search, 1000)

  const { data, isLoading, isError } = useGetAnimeSearchQuery(router.query.name)

  if(data){
    const { results } = data
    result = results
    console.log("data", data)
    console.log("search res", results)
  }else if(isError){
    console.log(isError)
  }

  return(
    <AppLayout>
      <AppSpacer />
      <Container maxW="container.xl" mt={20}>
        <Heading size="md" mb={6}>Search results for <Text as="span" color="primary.500">{router.query.name}</Text> : </Heading>
        <Grid templateColumns="repeat(auto-fit, minmax(15rem, 1fr))" gap={3}>
          {
            result && [...result].sort((a, b) => b.rating - a.rating).map(res => <ItemCard key={res.id} {...res} />)
          }
        </Grid>
      </Container>
    </AppLayout>
  )
}

export default Search