/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, {useState, useRef, memo} from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import useIsBrowser from '@docusaurus/useIsBrowser';
import clsx from 'clsx';
import styles from './styles.module.css';

const Dark = ({icon, style}) => (
  <span className={clsx(styles.toggleIcon, styles.dark)} style={style}>
    {icon}
  </span>
);

const Light = ({icon, style}) => (
  <span className={clsx(styles.toggleIcon, styles.light)} style={style}>
    {icon}
  </span>
); // Based on react-toggle (https://github.com/aaronshaf/react-toggle/).

const Toggle = memo(
  ({className, icons, checked: defaultChecked, disabled, onChange}) => {
    const [checked, setChecked] = useState(defaultChecked);
    const [focused, setFocused] = useState(false);
    const inputRef = useRef(null);
    return (
      <div
        className={clsx(styles.toggle, className, {
          [styles.toggleChecked]: checked,
          [styles.toggleFocused]: focused,
          [styles.toggleDisabled]: disabled,
        })}>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <div
          className={styles.toggleTrack}
          role="button"
          tabIndex={-1}
          onClick={() => inputRef.current?.click()}>
          <div className={styles.toggleTrackCheck}>{icons.checked}</div>
          <div className={styles.toggleTrackX}>{icons.unchecked}</div>
          <div className={styles.toggleTrackThumb} />
        </div>

        <input
          ref={inputRef}
          checked={checked}
          type="checkbox"
          className={styles.toggleScreenReader}
          aria-label="Switch between dark and light mode"
          onChange={onChange}
          onClick={() => setChecked(!checked)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              inputRef.current?.click();
            }
          }}
        />
      </div>
    );
  },
);
export default function (props) {
  const {
    colorMode: {
      switchConfig: {darkIcon, darkIconStyle, lightIcon, lightIconStyle},
    },
  } = useThemeConfig();
  const isBrowser = useIsBrowser();
  return (
    <Toggle
      disabled={!isBrowser}
      icons={{
        checked: <Dark icon={darkIcon} style={darkIconStyle} />,
        unchecked: <Light icon={lightIcon} style={lightIconStyle} />,
      }}
      {...props}
    />
  );
}
