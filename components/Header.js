import { Fragment } from 'react'
import Link from 'next/link'
import {
  Box, HStack, Container, Img, Button, Spacer, Heading, Text, 
  IconButton, Stack, Divider, CloseButton, useColorModeValue, 
  Menu, MenuButton, MenuList, MenuItem, useDisclosure, MenuDivider
} from '@chakra-ui/react'

import { IoMenu } from 'react-icons/io5'
import { BsArrowBarDown, BsArrowDown, BsArrowLeft, BsChevronDown } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { setGenre } from '../features/filterSlice'

export const AppHeader = ({ children, boxStyle, ...rest }) => (
  <Box>
    <Box 
      borderTopWidth={2} 
      // borderBottomWidth={2}
      // backdropFilter="blur(8px)"
      borderColor="transparent"
      pos="fixed" 
      // bg={useColorModeValue('white', 'secondary.500')}
      w="full" zIndex="1000" p={1}
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
  <HStack w={{ base: 'full', md: 'auto' }} minH="50px" overflow="hidden">
    <Link href="/">
      <Box as="a" cursor="pointer" pr={5}>
        {
          logo
          ? <Img src={logo} boxSize="60px" borderRadius="xl" />
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

export const AppLinks = ({ routes = [], router, direction = 'row', children, options = [], btnProps, menuProps, menuBtnProps, menuItemProps, onMenuItemClick, ...rest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure() 
  const dispatch = useDispatch()
  const selectedGenre = useSelector(state => state.filters.genres)

  const genreHandler = genre => {
    router.push({ pathname: `/anime/genres/${(genre).toLowerCase()}` })
    dispatch(setGenre(genre))
  }

  return(
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
            {
              route.path == '/anime/genres' ? 
              <Menu isOpen={isOpen}>
                <MenuButton as={Button} variant="link" color={router.route == route.path ? 'primary.500' : ''} onMouseEnter={onOpen} onMouseLeave={onClose} {...btnProps} {...menuBtnProps}>
                  {route.label}
                </MenuButton>
                <MenuList onMouseEnter={onOpen} onMouseLeave={onClose} {...menuProps}>
                  { options.map(option => <MenuItem key={option.value} onClick={() => genreHandler(option.value)} {...menuItemProps}>{option.label}</MenuItem> )}
                </MenuList>
              </Menu>
              :
              <Button 
                size="md" 
                variant="link" 
                color={router.route == route.path ? 'primary.500' : ''}
                {...route.btnProps} 
                {...btnProps}>
                {route.label}
              </Button>
            }
          </Link>
        )
      }
      {children}
    </Stack>
  )
}