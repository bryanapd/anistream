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
  Icon
} from '@chakra-ui/react'

export const AddToList = ({ options = [], label = 'Add to List', icon }) => (
  <Menu placement="right">
    <MenuButton as={Button} w="max" size="lg" variant="ghost" leftIcon={<Icon as={icon} fontSize="35px" />} iconSpacing={1} p={0}>{label}</MenuButton>
    <MenuList>
     { (options || []).map((option, optKey) => <MenuItem key={optKey}>{option}</MenuItem>)}
    </MenuList>
  </Menu>
)

export const FilterMenu = ({ options = [] }) => (
  <Menu>
    <MenuButton>Genres</MenuButton>
    <MenuList>
      { (options || []).map(option => <MenuItem key={option.value}>{option.label}</MenuItem>) }
    </MenuList>
  </Menu>
)