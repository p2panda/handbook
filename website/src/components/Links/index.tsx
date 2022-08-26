import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

interface Link {
  name: string;
  url: string;
  description: JSX.Element;
}

function LinkCard({ name, url, description }: Link) {
  return (
    <div className="col col--4 margin-bottom--lg">
      <div className={clsx('card')}>
        <div className="card__body">
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
        <div className="card__footer">
          <div className="button-group button-group--block">
            <Link className="button button--secondary truncate" to={url}>
              {url.replace('https://', '')}
            </Link>
          </div>
        </div>
      </div>
    </div>
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
