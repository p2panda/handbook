import Layout from '@theme/Layout';
import React from 'react';
import clsx from 'clsx';
import { ZooAdventures } from 'zoo-adventures';
import LogoSVG from '@site/static/images/p2panda.svg';

import styles from './index.module.css';

const CYAN = '#81e0ff';

function Pentagon(props: {
  size: number;
  color: string;
  position: 'left' | 'right';
  margin: number;
  hideOnSmallDevices?: boolean;
}): JSX.Element {
  const position =
    props.position === 'left'
      ? { left: -(props.size / props.margin) }
      : { right: -(props.size / props.margin) };

  return (
    <div
      className={clsx(styles['pentagon-container'], {
        [styles['pentagon-container-small-hide']]: props.hideOnSmallDevices,
      })}
      style={{ height: props.size }}
    >
      <div className={styles['pentagon-position']} style={position}>
        <svg width={props.size} height={props.size} viewBox="0 0 100 100">
          <defs>
            <radialGradient cy="55%" id="gradient">
              <stop offset="40%" stopColor="white" />
              <stop offset="80%" stopColor={props.color} />
              <stop offset="100%" stopColor="white" />
            </radialGradient>
          </defs>
          <polygon
            points="26,86 11.2,40.4 50,12.2 88.8,40.4 74,86"
            fill="url('#gradient')"
          />
        </svg>
      </div>
    </div>
  );
}

function Logo(): JSX.Element {
  return <LogoSVG />;
}

function Zoo(): JSX.Element {
  return (
    <div className="panda-zoo">
      <div className="panda-zoo-inner">
        <ZooAdventures />
      </div>
    </div>
  );
}

function Title(): JSX.Element {
  return (
    <>
      <h1 className={styles['title']}>
        p2panda is a protocol for local-first applications
      </h1>
      <p className={styles['subtitle']}>
        Read more about it in the <a href="">introduction</a>
      </p>
    </>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Home"
      description="Description will go into a meta tag in <head />"
    >
      <div className={styles['wrapper']}>
        <Pentagon size={1000} color={CYAN} position="right" margin={4} />
        <Pentagon
          size={500}
          color={CYAN}
          position="left"
          margin={6}
          hideOnSmallDevices
        />
        <Title />
        <div className={styles['logo']}>
          <Logo />
        </div>
      </div>
    </Layout>
  );
}
