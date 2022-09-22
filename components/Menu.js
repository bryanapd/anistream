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
  useDisclosure
} from '@chakra-ui/react'

import Router from 'next/router'
import { setGenre } from '../features/filterSlice'
import { useDispatch, useSelector } from 'react-redux'


export const AddToList = ({ options = [], label = 'Add to List', icon }) => (
  <Menu placement="right">
    <MenuButton as={Button} w="max" size="lg" variant="ghost" leftIcon={<Icon as={icon} fontSize="35px" />} iconSpacing={1} p={0}>{label}</MenuButton>
    <MenuList>
     { (options || []).map((option, optKey) => <MenuItem key={optKey}>{option}</MenuItem>)}
    </MenuList>
  </Menu>
)

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

