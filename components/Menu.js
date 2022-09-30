import Router from 'next/router'
import { 
  Button, Menu, MenuButton, MenuList, MenuDivider, MenuOptionGroup, MenuIcon, MenuItem, 
  MenuCommand, MenuGroup, Icon, useDisclosure, useColorModeValue as mode 
} from '@chakra-ui/react'
import { IoEllipse } from 'react-icons/io5'

import { useDispatch, useSelector } from 'react-redux'
import { setGenre } from '../features/filterSlice'
import { setWatching, setPlanning, setCompleted } from '../features/listsSlice'


export const AddToList = ({ options = [], label = 'Add to List', anime, icon }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch()
  const watching = useSelector(state => state.lists.watching)

  const addToWatching = anime => {
    dispatch(setWatching(anime))
  }
  const addToCompleted = anime => {
    dispatch(setCompleted(anime))
  }
  const addToPlanning = anime => {
    dispatch(setPlanning(anime))
  }

  const menuStyles = {
    fontSize: 'sm',
    variant: 'ghost',
    // icon: watching.filter(f => f.id == anime.id) ? <IoEllipse color="green" /> : null
  }
  
  return(
    <Menu isOpen={isOpen} placement="right">
      <MenuButton 
        as={Button} 
        w="max" size="lg" 
        variant="ghost" 
        leftIcon={<Icon as={icon} fontSize="35px" />} 
        iconSpacing={1} p={0} 
        onMouseEnter={onOpen} 
        onMouseLeave={onClose}
        _hover={{ transform: 'scale(1.1)' }}
        _active={{ bg: 0 }}
        transition="all 300ms ease">
        {label}
      </MenuButton>
      <MenuList color={mode('black', 'white')} bg={mode('white', 'gray.900')} borderWidth={0} onMouseEnter={onOpen} onMouseLeave={onClose}>
        <MenuItem onClick={() => addToWatching(anime)} {...menuStyles}>Set to Watching</MenuItem>
        <MenuItem onClick={() => addToCompleted(anime)} {...menuStyles}>Set to Completed</MenuItem>
        <MenuItem onClick={() => addToPlanning(anime)} {...menuStyles}>Set to Planning</MenuItem>
      </MenuList>
    </Menu>
  )
}

export const GenreMenu = ({ router, route, options = [], menuProps, btnProps, menuBtnProps, menuItemProps }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch()

  const genreHandler = genre => {
    Router.push({ pathname: `/anime/genres/${(genre).toLowerCase()}` })
    dispatch(setGenre(genre))
  }

  return(
    <Menu isOpen={isOpen}>
      <MenuButton as={Button} variant="link" onMouseEnter={onOpen} onMouseLeave={onClose} {...btnProps} {...menuBtnProps}>
        {route.label}
      </MenuButton>
      <MenuList onMouseEnter={onOpen} onMouseLeave={onClose} {...menuProps}>
        { options.map(option => <MenuItem key={option.value} onClick={() => genreHandler(option.value)} {...menuItemProps}>{option.label}</MenuItem> )}
      </MenuList>
    </Menu>
  )
}

