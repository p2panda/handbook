import React from 'react';
import Image from '@theme/IdealImage';

import styles from './index.module.css';

export default function ImageFrame({ title, url }) {
  return url ? (
    <div className={styles['image-frame']}>
      <div className={styles['image-frame-inner']}>
        <Image alt={title} title={title} img={url} />
      </div>
      {title && <div className={styles['image-frame-title']}>{title}</div>}
    </div>
  ) : null;
}
