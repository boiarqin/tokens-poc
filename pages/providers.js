'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { extendTheme, ChakraProvider } from '@chakra-ui/react'

import colors from '../build/js/colors.minify.json';

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  colors
})

export function Providers({ 
    children 
  }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </CacheProvider>
  )
}