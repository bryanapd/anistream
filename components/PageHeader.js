import Link from "next/link";
import { 
  Box, 
  Text,
  Heading,
  HStack,
  IconButton,
  useColorModeValue as mode,
  Button,
} from "@chakra-ui/react";
import { BsArrowLeftCircle } from "react-icons/bs";

export const PageSectionHeader = ({ title = 'Section Title', icon, href = '/', ...rest }) => (
  <HStack mb={6} spacing={4} {...rest}>
    <Link href={href}> 
      <IconButton size="xl" variant="ghost" icon={<BsArrowLeftCircle size={50} />} />  
    </Link>
    <Heading size="lg">{title}</Heading>
  </HStack>
)