import {
    Box,
    IconButton,
  } from '@chakra-ui/react';
import {RiUserAddLine} from 'react-icons/ri';
import React from 'react'

const AgnosticIconBtn = () => {
  return (
    <Box

        boxShadow='3px 6px 0 orange'>
    <IconButton boxShadow="#101010 4px 4px 0 0" bg="orange" variant="ghost" icon={ <RiUserAddLine color="white" fontSize={'24px'} />} />
    </Box>
  )
}

export default AgnosticIconBtn
