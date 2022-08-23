import { Grid } from "@chakra-ui/react";
import { Fragment, useState } from "react";
import { useGetAnimeSearchQuery } from "../features/apiSlice";
import useDebounce from "../hooks/useDebounce";
import AppLayout from "../layout/AppLayout";


const Search = ({ }) => {
  const [search, setSearch] = useState('')
  const debouncedSearchQuery = useDebounce(search, 1000)

  const { data: searchResult, isLoading, isError } = useGetAnimeSearchQuery(undefined, { skip: debouncedSearchQuery == '' })

  return(
    <AppLayout>
      <Grid templateColumns={{ base: 'auto', md: 'repeat(3, 1fr)', lg: 'repeat(5, 1fr)' }}>
        {
          
        }
      </Grid>
    </AppLayout>
  )
}