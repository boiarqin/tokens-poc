import { extendTheme } from '@chakra-ui/react'
import nestedColors from '../build/js/colors.minify.json';
import flattenedColors from '../build/js/colors.flat.json'

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
//   colors: nestedColors,
  colors: flattenedColors
})
