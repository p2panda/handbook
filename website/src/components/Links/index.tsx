import React from 'react';
import Link from '@docusaurus/Link';

import ColorMode from '@site/src/components/ColorMode';

interface Link {
  name: string;
  url: string;
  description: JSX.Element;
}

function LinkCard({ name, url, description }: Link) {
  const { hostname, pathname } = new URL(url);

  return (
    <ColorMode>
      {() => {
        return (
          <div className="col col--4 margin-bottom--lg">
            <div className="card">
              <div className="card__body">
                <h3>{name}</h3>
                <p>{description}</p>
              </div>
              <div className="card__footer">
                <div className="button-group button-group--block">
                  <Link className="button button--secondary truncate" to={url}>
                    {hostname}
                    {pathname}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </ColorMode>
  );
}

export default function Links(props: { links: Link[] }): JSX.Element {
  return (
    <div className="row">
      {props.links.map((link) => (
        <LinkCard key={link.name} {...link} />
      ))}
    </div>
  );
}
