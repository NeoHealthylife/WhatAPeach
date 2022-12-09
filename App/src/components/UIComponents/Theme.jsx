import { extendTheme } from '@chakra-ui/react'
import {ButtonUI as Button } from "./ButtonUI"

export const myTheme = extendTheme ({
    colors: {
      "primary": '#FF562d',
      "soft-primary": "#fe9166",
      "secondary": '#024b42',
      "soft-secondary": '#b31212',
      "dark": "#100102",
      "sof-tdark": "#4B1E19"
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
    boxShadow: {
      shadoww: "3px 6px 0 0 #fe9166"
    },
    variants: {
      shadow: {
        boxShadow: "3px 6px 0 #fe9166"
      }
    },
    components: {
      Button
    }
  });
  




import { useBoolean } from '@chakra-ui/react'

export function ButtonToggle() {
  const [flag, setFlag] = useBoolean()

  return (
    <div onClick={setFlag.toggle}>
      {flag ? 'The flag is ON!' : 'Hover me to turn ON'}
    </div>
  )
}
