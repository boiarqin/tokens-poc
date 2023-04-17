import { extendTheme } from '@chakra-ui/react'
import colors from '../build/js/colors.minify.json';

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors
})
