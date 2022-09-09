import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import {
  useColorMode,
  ColorMode as ColorModeType,
} from '@docusaurus/theme-common';

interface Props {
  children: (colorMode: ColorModeType) => JSX.Element;
}

function InnerColorMode({ children }: Props) {
  const { colorMode } = useColorMode();
  return <>{children(colorMode)}</>;
}

// This is a workaround to fix dark-mode not really working on some devices by
// disabling ssr for the critical components.
//
// Related issue: https://github.com/facebook/docusaurus/issues/7986
export default function ColorMode({ children }: Props) {
  return (
    <BrowserOnly>
      {() => {
        return <InnerColorMode>{children}</InnerColorMode>;
      }}
    </BrowserOnly>
  );
}
