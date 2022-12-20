export const ButtonStyles = {
  defaultStyle: {
    bg: "softprim",
    color: "dark",
    _hover: {
      bg: "green",
      border: "none",
    },
    _active: {
      background: "none",
      border: "none",
    },
    _focus: {
      outline: "none",
      borderColor: "none",
    },
  },
  sizes: {
    bg: "18px",
  },
  variants: {
    primary: (props) => ({
      bg: "softprim",
      color: "softark",
      _hover: {
        bg: "none",
        border: "none",
      },
      _focus: {
        outline: "none",
        borderColor: "none",
      },
    }),
    secondary: (props) => ({
      bg: "soft-primary",
      color: "softark",
      _hover: {
        bg: "primary",
        border: "none",
      },
      _focus: {
        outline: "none",
        borderColor: "none",
      },
    }),
  },
  //default value de size y variant
  defaultProps: {
    bg: "softprim",
    color: "dark",
    _hover: {
      bg: "green",
      border: "none",
    },
    _active: {
      background: "none",
      border: "none",
    },
    _focus: {
      outline: "none",
      borderColor: "none",
    },
  },
};
