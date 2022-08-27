import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useColorMode } from '@docusaurus/theme-common';
import { useThemeConfig } from '@docusaurus/theme-common';

import styles from './index.module.css';

function Footer() {
  const {
    footer: { copyright },
  } = useThemeConfig();
  const { colorMode } = useColorMode();

  return (
    <footer className={styles['footer']}>
      <img
        className={styles['footer-img']}
        src={useBaseUrl('/images/panda-pixel-2.png')}
        width="100"
      />
      <img
        className={styles['footer-img']}
        style={colorMode === 'dark' ? { filter: 'invert(100%)' } : {}}
        src={useBaseUrl('/images/service-service.png')}
        width="200"
      />
      <div className={styles['supporters']}>
        <img
          className={styles['supporters-img']}
          src={useBaseUrl('/images/ngi-logo.png')}
          width="200"
        />
        <img
          className={styles['supporters-img']}
          src={useBaseUrl('/images/eu-flag-logo.png')}
          width="78"
        />
        <p className={styles['footer-text']}>
          This project has received funding from the European Union’s Horizon
          2020 research and innovation programme within the framework of the
          NGI-POINTER Project funded under grant agreement No 871528
        </p>
      </div>
      <p className={styles['footer-text']}>{copyright}</p>
    </footer>
  );
}

export default Footer;
