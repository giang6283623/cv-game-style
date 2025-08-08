import { useState, useEffect } from "react";

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

export interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  breakpoint: Breakpoint;
}

// Breakpoint values in pixels
const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

export default function useResponsive(): ResponsiveState {
  const [responsive, setResponsive] = useState<ResponsiveState>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    breakpoint: "xl",
  });

  useEffect(() => {
    // Initialize with current window size
    const handleResize = () => {
      const width = window.innerWidth;
      
      // Determine current breakpoint
      let currentBreakpoint: Breakpoint = "xs";
      if (width >= breakpoints.xl) {
        currentBreakpoint = "xl";
      } else if (width >= breakpoints.lg) {
        currentBreakpoint = "lg";
      } else if (width >= breakpoints.md) {
        currentBreakpoint = "md";
      } else if (width >= breakpoints.sm) {
        currentBreakpoint = "sm";
      }
      
      setResponsive({
        isMobile: width < breakpoints.md,
        isTablet: width >= breakpoints.md && width < breakpoints.lg,
        isDesktop: width >= breakpoints.lg,
        breakpoint: currentBreakpoint,
      });
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return responsive;
}
