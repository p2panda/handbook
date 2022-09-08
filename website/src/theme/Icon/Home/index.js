import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './index.module.css';

export default function IconHome() {
  return (
    <img
      src={useBaseUrl('/images/deepsea-panda.svg')}
      width="30"
      className={styles['icon-home']}
    />
  );
}
