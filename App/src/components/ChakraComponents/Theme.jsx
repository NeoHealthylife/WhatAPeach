import { extendTheme } from "@chakra-ui/react";
import { ButtonStyles as Button } from "./ButtonStyles";
import { IconButtonStyles as IconButton } from "./IconButtonStyles";
import { HeadingStyles as Heading } from "./HeadingStyles";

export const myTheme = extendTheme({
  styles: {
    global: {
      "html, body": {
        bg: "whitesmoke",
      },
    },
  },
  colors: {
    primary: "#FF562d",
    "soft-primary": "#fe9166",
    secondary: "#024b42",
    "soft-secondary": "#12b396",
    dark: "#100102",
    "soft-dark": "#4B1E19",
    label: "#ffa787",
  },
  fontSizes: {
    lg: "22px",
    md: "16px",
    sm: "13px",
    xsm: "12px",
  },
  sizes: {
    lg: "18px",
    md: "13px",
    sm: "10px",
  },
  components: {
    Button,
    IconButton,
    Heading,
  },
});
