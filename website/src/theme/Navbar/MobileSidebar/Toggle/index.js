import React from 'react';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { useThemeConfig } from '@docusaurus/theme-common';

// This shows our "Wild Plant Book" instead of the hamburger menu
export default function MobileSidebarToggle() {
  const mobileSidebar = useNavbarMobileSidebar();

  const {
    navbar: { title, logo },
  } = useThemeConfig();

  const sources = {
    light: useBaseUrl(logo.src),
    dark: useBaseUrl(logo.srcDark || logo.src),
  };

  return (
    <button
      onClick={mobileSidebar.toggle}
      onKeyDown={mobileSidebar.toggle}
      aria-label="Navigation bar toggle"
      className="navbar__toggle clean-btn"
      type="button"
      tabIndex={0}
    >
      <div className="navbar__brand">
        <div className="navbar__logo">
          <ThemedImage
            className={logo.className}
            sources={sources}
            height={logo.height}
            width={logo.width}
            alt={title}
            style={logo.style}
          />
        </div>
      </div>
    </button>
  );
}
