import React, { useState, useEffect } from 'react'
import {
  useColorModeValue,
  InputGroup, InputLeftElement, InputRightElement, Tag,
  Input, FormControl, FormLabel, Select, Textarea, Switch,
  Divider
} from '@chakra-ui/react'

// export const Input = () => (
//   <Inp placeholder="Search Creators..." border="2px" maxW="230px" rounded="full" size="sm" _hover={{ borderColor: 'red.500' }} _focus={{ borderColor: 'red.500' }} _active={{ borderColor: 'red.500' }} />
// )
export const FormSwitch = ({ label, left, right, rightProps, controlProps, tag, ...rest }) => (
  <FormControl display="flex" alignItems="center" justifyContent="space-between" {...controlProps}>
    <FormLabel mb={0} fontSize="sm" fontWeight="bold" color={useColorModeValue('gray.700', 'gray.300')}>{label} {tag && <Tag size="sm">{tag}</Tag>}</FormLabel>
    <Switch {...rest} />
  </FormControl>
)

export const FormTags = ({ tags = [], separator = ',' }) => {

  const handleSelect = () => {

  }

  const handleChange = () => {

  }

  return (
    <Box>
      { tags.map(tag => <Tag key={`tag-${tag}`}>{tag}</Tag>) }
      <Inp variant="unstyled" onChange={handleChange} />
    </Box>
  )
}

export const FormInput = ({ label, left, right, rightProps, controlProps, tag, onChange, inputRef, ...rest }) => (
  <FormControl {...controlProps}>
    <FormLabel fontSize="sm" fontWeight="bold">{label} {tag && <Tag size="sm">{tag}</Tag>}</FormLabel>
    <InputGroup>
      { left && <InputLeftElement children={left} /> }
      <Input ref={inputRef} onChange={onChange} {...rest} />
      { right && <InputRightElement {...rightProps}>{right}</InputRightElement> }
    </InputGroup>
  </FormControl>
)

export const FormTextArea = ({ label, left, right, controlProps, tag, ...rest }) => (
  <FormControl {...controlProps}>
    <FormLabel fontSize="lg" fontWeight="bold">{label} {tag && <Tag size="sm">{tag}</Tag>}</FormLabel>
    <InputGroup>
      { left && <InputLeftElement children={left} /> }
      <Textarea {...rest} />
      { right && <InputRightElement width="4.5rem">{right}</InputRightElement> }
    </InputGroup>
  </FormControl>
)

export const FormSelect = ({ label, left, right, rightProps, controlProps, options, disabled, ...rest }) => (
  <FormControl {...controlProps}>
    <FormLabel fontSize="sm" fontWeight="bold">{label}</FormLabel>
    <InputGroup>
      { left && <InputLeftElement children={left} /> }
      <Select {...rest}>
        <option key="selector" value="" hidden>Any</option>
        { (options || []).map(option => <option key={option.value} value={option.value} disabled={disabled}>{option.label}</option>) }
      </Select>
      { right && <InputRightElement w="4.5rem" {...rightProps}>{right}</InputRightElement> }
    </InputGroup>
  </FormControl>
)