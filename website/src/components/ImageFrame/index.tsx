import React from 'react';

import styles from './index.module.css';

export default function ImageFrame({ title, url }) {
  return url ? (
    <div className={styles['image-frame']}>
      <div className={styles['image-frame-inner']}>
        <img alt={title} title={title} src={url} />
      </div>
      {title && <div className={styles['image-frame-title']}>{title}</div>}
    </div>
  ) : null;
}
