const COLORS_OUTLINED = {
  borderColor: "#6877eb",
  hoverBorderColor: "#FE9166",
  controlColor: "#FE9166",
  checkedBG: "transparent",
};

export const outlinedClasses = {
  h: "45px",
  px: "12px",
  borderRadius: "20px",
  transition: "box-shadow 100ms",
  _checked: {
    boxShadow: `0 0 0 1px ${COLORS_OUTLINED.borderColor}`,
    borderColor: ` ${COLORS_OUTLINED.borderColor}`,
  },
  "span[class*='checkbox__control']:not([data-disabled])": {
    borderColor: COLORS_OUTLINED.controlColor,
    borderRadius: "2px",
    _checked: {
      color: COLORS_OUTLINED.borderColor,
      bg: COLORS_OUTLINED.checkedBG,
      borderColor: COLORS_OUTLINED.controlColor,
    },
    _focus: {
      boxShadow: `0 0 0 2px ${COLORS_OUTLINED.focusColor}`,
      _checked: {
        boxShadow: `0 0 0 2px ${COLORS_OUTLINED.focusColor}`,
      },
    },
  },
  _hover: {
    boxShadow: `0 0 0 1px ${COLORS_OUTLINED.hoverBorderColor}`,
    transition: "box-shadow 150ms",
    _checked: {
      boxShadow: `0 0 0 2px ${COLORS_OUTLINED.borderColor}`,
    },
  },
};
