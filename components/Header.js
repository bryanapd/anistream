import { Fragment } from 'react'
import Link from 'next/link'
import {
  Box, HStack, Container, Img, Button, Spacer, Heading, Text, 
  IconButton, Stack, Divider, CloseButton, useColorModeValue
} from '@chakra-ui/react'

import { IoMenu } from 'react-icons/io5'

export const AppHeader = ({ children, boxStyle, ...rest }) => (
  <Box>
    <Box 
      borderTopWidth={2} 
      backdropFilter="blur(20px)"
      borderColor="transparent"
      py={2} pos="fixed" w="full" zIndex="1000"
      {...boxStyle}>
      <Container maxW="container.xl">
        <HStack {...rest}>
          {children}
        </HStack>
      </Container>
    </Box>
  </Box>
)

export const AppSpacer = () => <Box h="72px" />

export const AppBrand = ({ logo, title = '', onMenuClick }) => (
  <HStack w={{ base: 'full', md: 'auto' }} minH="50px">
    <Link href="/">
      <Box as="a" cursor="pointer" pr={5}>
        {
          logo
          ? <Img src={logo} boxSize="60px" borderRadius="full" />
          : <Heading size="md">{title}</Heading>
        }
      </Box>
    </Link>
    <Spacer />
    <IconButton
      display={{ base: 'flex', md: 'none' }}
      variant="ghost"
      mr={0}
      onClick={onMenuClick}
      icon={<IoMenu fontSize="30px" />}
      />
  </HStack>
)

export const AppLinks = ({ routes = [], router, direction = 'row', children, btnProps, ...rest }) => (
  <Stack
    fontWeight="bold"
    direction={direction}
    spacing={10}
    alignItems="center"
    display={{ base: (direction == 'column' ? 'flex' : 'none'), md: 'flex' }}
    {...rest}>
    {
      routes.map((route, rId) =>
        route.isDivider
        ? <Divider key={route.key} orientation={direction === 'row' ? 'vertical' : 'horizontal'} h={direction == 'column' ? 'auto' : '30px'} alignSelf="center" borderWidth="1px" />
        : route.render ? <Fragment key={rId}>{route.render()}</Fragment> : 
        <Link href={route.path} key={rId}>
          <Button size="md" variant="ghost" {...route.btnProps} {...btnProps}>{route.label}</Button>
        </Link>)
    }
    {children}
  </Stack>
)