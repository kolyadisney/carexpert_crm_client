// eslint-disable react-hooks/exhaustive-deps

import React from "react";

export enum BreakPoint {
    SM = 'sm',
    MD = 'md',
    LG = 'lg',
    XL = 'xl',
    XXL = 'xxl'
}

export function getBreakPointSize(breakPoint: BreakPoint): number {
    switch (breakPoint){
        case BreakPoint.SM:
            return 576;
        case BreakPoint.MD:
            return 768;
        case BreakPoint.LG:
            return 992;
        case BreakPoint.XL:
            return 1200;
        case BreakPoint.XXL:
            return 1920;
        default:
            return 576;
    }
}

export const useIsBreakpoint = (widthToCompare: BreakPoint = BreakPoint.MD): boolean => {
    const width = getBreakPointSize(widthToCompare);
    const globalWindow = typeof window !== 'undefined' ? window : ({} as Window);
    const [isLower, setIsLower] = React.useState(
        globalWindow ? globalWindow.innerWidth <= width : false
    )

    React.useEffect(() => {
        const handleResize = (event: MediaQueryListEvent) => {
            setIsLower(event.matches)
        }

        const mediaQuery = `(max-width: ${width}px)`;
        const mediaQueryList = globalWindow.matchMedia(mediaQuery);

        mediaQueryList.addEventListener('change', handleResize);

        return () => mediaQueryList.removeEventListener('change', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width])

    return isLower
}
