import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  MenuOptionGroup,
  MenuIcon,
  MenuItem,
  MenuCommand,
  MenuGroup,
  Icon,
  useDisclosure,
  useColorModeValue as mode
} from '@chakra-ui/react'

import Router from 'next/router'
import { setWatching } from '../features/listsSlice'
import { setGenre } from '../features/filterSlice'
import { useDispatch, useSelector } from 'react-redux'


export const AddToList = ({ options = [], label = 'Add to List', icon, onClick }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return(
    <Menu isOpen={isOpen} placement="right">
      <MenuButton 
        as={Button} 
        w="max" size="lg" 
        variant="ghost" 
        leftIcon={<Icon as={icon} fontSize="35px" />} 
        iconSpacing={1} p={0} 
        transition="all 300ms ease"
        onMouseEnter={onOpen} 
        onMouseLeave={onClose}
        _hover={{ 
          transform: 'scale(1.1)'
        }}
        _active={{
          bg: 0
        }}>
          {label}
      </MenuButton>
      <MenuList color={mode('black', 'white')} bg={mode('white', 'gray.900')} borderWidth={0} onMouseEnter={onOpen} onMouseLeave={onClose}>
      { (options || []).map(option => <MenuItem key={option.value} onClick={onClick}>{option.label}</MenuItem> )}
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

