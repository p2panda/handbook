import React from 'react';
import Admonition from '@theme-original/Admonition';

export default function AdmonitionWrapper(props) {
  let icon;
  if (props.type === 'note') {
    icon = '🐧';
  } else if (props.type === 'info') {
    icon = '🐼';
  } else if (props.type === 'caution') {
    icon = '🌩️';
  } else if (props.type === 'danger') {
    icon = '🙈';
  } else if (props.type === 'tip') {
    icon = '🐻‍❄️';
  }

  return <Admonition icon={<span className="panda-icon">{icon}</span>} {...props} />;
}
