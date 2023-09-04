import { ScreenClass } from "react-grid-system";

import useMediaQuery from "@mui/material/useMediaQuery";

const BREAKPOINTS = {
  xs: 550,
  sm: 760,
  md: 1020,
  lg: 1270,
  xl: 1420,
  xxl: 1600,
  xxxl: 1800,
};

function useBreakpoint(size: { max?: ScreenClass; min?: ScreenClass }) {
  const query: string[] = [];
  if (size.max) query.push(`(max-width:${BREAKPOINTS[size.max]}px)`);
  if (size.min) query.push(`(min-width:${BREAKPOINTS[size.min] + 1}px)`);
  return useMediaQuery(query.join(" and "));
}

export default useBreakpoint;
