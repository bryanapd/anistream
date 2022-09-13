import {
  Skeleton, 
  Box, 
  SkeletonText, 
  HStack
} from "@chakra-ui/react";


export const SkeletonHeroCard = props => (
  <Skeleton minH="50vh" h="60vh" {...props}>
    <Box>
      <Skeleton h="10px" />
      <HStack>
        <Skeleton h="10px" />
        <Skeleton h="10px" />
        <Skeleton h="10px" />
        <Skeleton h="10px" />
      </HStack>
    </Box>
  </Skeleton>
)

export const SkeletonItemCard = props => <Skeleton h="400px" w="auto" mb={3} {...props} />