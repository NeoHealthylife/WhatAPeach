import { extendTheme } from '@chakra-ui/react'
import {ButtonStyles as Button } from "./ButtonStyles"
import { IconButtonStyles as IconButton } from "./IconButtonStyles"
import  { HeadingStyles as Heading } from "./HeadingStyles"

export const myTheme = extendTheme ({
    colors: {
      "primary": '#FF562d',
      "soft-primary": "#fe9166",
      "secondary": '#024b42',
      "soft-secondary": '#b31212',
      "dark": "#100102",
      "sof-dark": "#4B1E19"
    },
    fontSizes: {
      lg: "18px",
      md: "13px",
      sm: "10px"
    },
    sizes: {
      lg: "18px",
      md: "13px",
      sm: "10px"
    },
    components: {
      Button,
      IconButton,
      Heading
    }
  });
  




