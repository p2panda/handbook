import BrowserOnly from '@docusaurus/BrowserOnly';
import Layout from '@theme/Layout';
import React from 'react';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useColorMode } from '@docusaurus/theme-common';

import LogoSVG from '@site/static/images/p2panda.svg';
import styles from './index.module.css';

const BLUE = '#7e8eff';
const CYAN = '#81e0ff';
const GREEN = '#8dffe3';
const PINK = '#ff7dbf';

function Pentagon(props: {
  size: number;
  color: string;
  right?: boolean;
  shift?: boolean;
  margin: number;
  hideOnSmallDevices?: boolean;
  hideOnMediumDevices?: boolean;
}): JSX.Element {
  const { colorMode } = useColorMode();
  const background = colorMode === 'light' ? 'white' : 'transparent';

  const position = props.right
    ? { right: -(props.size / props.margin) }
    : { left: -(props.size / props.margin) };

  const id = `gradient-${props.color.slice(1)}`;

  return (
    <div className={props.shift && styles['pentagon-shift']}>
      <div
        className={clsx(styles['pentagon-container'], {
          [styles['pentagon-container-small-hide']]: props.hideOnSmallDevices,
          [styles['pentagon-container-medium-hide']]: props.hideOnMediumDevices,
        })}
        style={{ height: props.size }}
      >
        <div className={styles['pentagon-position']} style={position}>
          <svg width={props.size} height={props.size} viewBox="0 0 100 100">
            <defs>
              <radialGradient cy="55%" id={id}>
                <stop offset="40%" stopColor={background} />
                <stop offset="80%" stopColor={props.color} />
                <stop offset="100%" stopColor={background} />
              </radialGradient>
            </defs>
            <polygon
              points="26,86 11.2,40.4 50,12.2 88.8,40.4 74,86"
              fill={`url('#${id}')`}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Drawing(props: { url: string }): JSX.Element {
  const { colorMode } = useColorMode();

  return (
    <div
      className={styles['drawing']}
      style={colorMode === 'dark' ? { filter: 'invert(100%)' } : {}}
    >
      <img className={styles['drawing-image']} src={useBaseUrl(props.url)} />
    </div>
  );
}

function Logo(): JSX.Element {
  return (
    <div className={styles['logo']}>
      <LogoSVG />
    </div>
  );
}

function Zoo(): JSX.Element {
  return (
    <div className={styles['zoo']}>
      <div className={styles['zoo-gameboy']}>
        <p className={styles['zoo-title']}>Zoo Adventures</p>
        <div className={styles['zoo-inner']}>
          <BrowserOnly>
            {() => {
              // eslint-disable-next-line @typescript-eslint/no-var-requires
              const { ZooAdventures } = require('zoo-adventures');
              return <ZooAdventures />;
            }}
          </BrowserOnly>
        </div>
        <p className={styles['zoo-about']}>
          Play with the other animals in the zoo. Put 3x in a row to win.{' '}
          <a
            target="_blank"
            href="https://github.com/p2panda/zoo-adventures"
            rel="noreferrer"
          >
            What is this?
          </a>
        </p>
      </div>
    </div>
  );
}

function Title(props: {
  right?: boolean;
  center?: boolean;
  text: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div
      className={clsx(styles['title'], {
        [styles['title-right']]: props.right,
        [styles['title-center']]: props.center,
      })}
    >
      <h1 className={styles['title-heading']}>{props.text}</h1>
      <p className={styles['title-subheading']}>{props.children}</p>
    </div>
  );
}

function Section(props: {
  className?: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <section className={clsx(styles['section'], props.className)}>
      {props.children}
    </section>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Home"
      description="Description will go into a meta tag in <head />"
    >
      <Section className={styles['welcome-section']}>
        <Pentagon size={1000} color={CYAN} right margin={4} />
        <Pentagon size={600} color={CYAN} margin={6} hideOnSmallDevices />
        <Title center text="p2panda is a protocol for local-first applications">
          Read more about it in the <a href="about">introduction</a>
        </Title>
        <Logo />
      </Section>
      <Section className={styles['zoo-section']}>
        <Zoo />
      </Section>
      <Section>
        <Pentagon size={1500} color={PINK} margin={2} shift />
        <Drawing url="/images/panda-artwork-2.png" />
        <Title text="Collaborative peer-to-peer networks" right>
          <a href="learn">Learn</a> more about the concepts of p2panda
        </Title>
        <Pentagon
          size={700}
          color={PINK}
          right
          margin={2}
          hideOnMediumDevices
        />
      </Section>
      <img
        className={styles['red-pandas']}
        src={useBaseUrl('/images/panda-artwork-3.png')}
        width="500"
      />
      <Section>
        <Pentagon size={1000} color={BLUE} margin={4} right />
        <Title text="Open protocol specification and research">
          Read the <a href="specification">specification</a>
        </Title>
        <Drawing url="/images/panda-artwork-1.png" />
      </Section>
      <hr className={styles['separator']} />
      <Section className={styles['play-section']}>
        <Pentagon size={750} color={GREEN} margin={4} right />
        <img src={useBaseUrl('/images/panda-pixel-1.png')} width="200" />
        <Title center text="Play with p2panda in Rust or TypeScript">
          Explore the <a href="tutorials">Tutorials</a> and{' '}
          <a href="libraries">Libraries</a>
        </Title>
        <Pentagon size={500} color={GREEN} margin={2} hideOnSmallDevices />
      </Section>
    </Layout>
  );
}
