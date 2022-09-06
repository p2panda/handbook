import React from 'react';
import clsx from 'clsx';

import styles from './index.module.css';

interface Props {
  title: string;
  children: JSX.Element;
  icon: string;
  light?: boolean;
}

export default function EmojiBox({ icon, title, children, light }: Props) {
  return (
    <div
      className={clsx('avatar', styles['emoji-box'], {
        [styles['emoji-box-light']]: light,
      })}
    >
      <div className={clsx('avatar__photo', styles['emoji-box-icon'])}>
        {icon}
      </div>
      <div className="avatar__intro">
        <div className="avatar__name">{title}</div>
        <small className="avatar__subtitle">{children}</small>
      </div>
    </div>
  );
}
