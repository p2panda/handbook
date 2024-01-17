import Layout from '@theme/Layout';
import React from 'react';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';

import ColorMode from '@site/src/components/ColorMode';

import DeepSeaPanda from '@site/static/images/deepsea-panda.svg';
import GreenPanda from '@site/static/images/green-panda.svg';
import LogoSVG from '@site/static/images/p2panda.svg';
import NeonPanda from '@site/static/images/neon-panda.svg';
import YellowPanda from '@site/static/images/yellow-panda.svg';

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
                <stop offset="40%" stopColor={props.color} stopOpacity={0} />
                <stop offset="80%" stopColor={props.color} />
                <stop offset="100%" stopColor={props.color} stopOpacity={0} />
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
  const url = useBaseUrl(props.url);

  return (
    <ColorMode>
      {(colorMode) => {
        return (
          <div
            className={styles['drawing']}
            style={colorMode === 'dark' ? { filter: 'invert(100%)' } : {}}
          >
            <img className={styles['drawing-image']} src={url} />
          </div>
        );
      }}
    </ColorMode>
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
  const backgroundUrl = useBaseUrl('/images/game-background.jpg');
  const backgroundNightUrl = useBaseUrl('/images/game-background-night.jpg');

  return (
    <div className={styles['zoo']}>
      <div className={styles['zoo-gameboy']}>
        <p className={styles['zoo-title']}>Zoo Adventures</p>
        <ColorMode>
          {(colorMode) => {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const { ZooAdventures } = require('zoo-adventures');

            return (
              <div
                className={styles['zoo-inner']}
                style={{
                  backgroundImage:
                    colorMode === 'dark'
                      ? `url(${backgroundNightUrl})`
                      : `url(${backgroundUrl})`,
                }}
              >
                <ZooAdventures updateIntervalMs={5000} />
              </div>
            );
          }}
        </ColorMode>
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
    <ColorMode>
      {(colorMode) => {
        return (
          <div
            className={clsx(styles['title'], {
              [styles['title-dark']]: colorMode === 'dark',
              [styles['title-right']]: props.right,
              [styles['title-center']]: props.center,
            })}
          >
            <h1 className={styles['title-heading']}>{props.text}</h1>
            <p className={styles['title-subheading']}>{props.children}</p>
          </div>
        );
      }}
    </ColorMode>
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

function PandaParty(): JSX.Element {
  return (
    <div className={styles['panda-party']}>
      <div className={styles['panda-party-floor']}>
        <DeepSeaPanda />
        <GreenPanda />
        <YellowPanda />
        <NeonPanda />
      </div>
    </div>
  );
}

export default function Home(): JSX.Element {
  return (
    <>
      <Layout
        title="Home"
        description="p2panda is a p2p protocol for secure, energy-efficient and local-first web, mobile and desktop applications"
      >
        <Section className={styles['welcome-section']}>
          <Pentagon size={1000} color={CYAN} right margin={4} />
          <Pentagon size={600} color={CYAN} margin={6} hideOnSmallDevices />
          <Title
            center
            text="p2panda is a protocol for local-first applications"
          >
            Read more about it in the <a href="about">introduction</a>
          </Title>
          <Logo />
        </Section>
        <Section className={styles['zoo-section']}>
          <PandaParty />
          <Zoo />
        </Section>
        <Section>
          <Pentagon size={1500} color={PINK} margin={2} shift />
          <Drawing url="/images/panda-school.png" />
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
          src={useBaseUrl('/images/pandas.png')}
          className={styles['many-pandas']}
        />
        <Section>
          <Pentagon size={1000} color={BLUE} margin={4} right />
          <Title text="Open protocol specification and research">
            Read the <a href="specifications">specification</a>
          </Title>
          <Drawing url="/images/panda-artwork-1.png" />
        </Section>
        <hr className={styles['separator']} />
        <Section className={styles['play-section']}>
          <Pentagon size={750} color={GREEN} margin={4} right />
          <img
            src={useBaseUrl('/images/happy-panda.svg')}
            width="200"
            className={styles['happy-panda']}
          />
          <Title center text="Play with p2panda in Rust or TypeScript">
            Explore the <a href="tutorials">tutorials</a> and{' '}
            <a href="sdks">SDKs</a>
          </Title>
          <Pentagon size={500} color={GREEN} margin={2} hideOnSmallDevices />
        </Section>
        <img
          className={styles['red-pandas']}
          src={useBaseUrl('/images/panda-artwork-2.png')}
          width="500"
        />
      </Layout>
    </>
  );
}
