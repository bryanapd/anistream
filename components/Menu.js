import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  MenuOptionGroup,
  MenuIcon,
  MenuItem,
  MenuCommand,
  MenuGroup
} from '@chakra-ui/react'

export const FilterMenu = ({ options = [] }) => (
  <Menu>
    <MenuButton>Genres</MenuButton>
    <MenuList>
      { (options || []).map(option => <MenuItem key={option.value}>{option.label}</MenuItem>) }
    </MenuList>
  </Menu>
)