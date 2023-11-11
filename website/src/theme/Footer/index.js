import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useThemeConfig } from '@docusaurus/theme-common';

import ColorMode from '@site/src/components/ColorMode';

import styles from './index.module.css';

function Footer() {
  const {
    footer: { copyright },
  } = useThemeConfig();

  const serviceUrl = useBaseUrl('/images/service-service.png');

  return (
    <footer className={styles['footer']}>
      <img
        className={styles['footer-img']}
        src={useBaseUrl('/images/deepsea-panda.svg')}
        width="100"
      />
      <ColorMode>
        {(colorMode) => {
          return (
            <img
              className={styles['footer-img']}
              style={colorMode === 'dark' ? { filter: 'invert(100%)' } : {}}
              src={serviceUrl}
              width="200"
            />
          );
        }}
      </ColorMode>
      <div className={styles['supporters']}>
      <img
          className={styles['supporters-img']}
          src={useBaseUrl('/images/nlnet-logo.svg')}
          width="140"
        />
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
          NGI-POINTER Project funded under grant agreement No 871528,
          NGI-ASSURE No 957073 and NGI0-ENTRUST No 101069594
        </p>
      </div>
      <p className={styles['footer-text']}>
        {copyright} - <a href="mailto:contributors@p2panda.org">Contact</a>
      </p>
    </footer>
  );
}

export default Footer;
