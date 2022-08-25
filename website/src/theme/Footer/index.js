import React from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';

function Footer() {
  const { footer: { copyright } } = useThemeConfig();

  return (
    <footer className="footer">
      <img className="panda-footer-img" src={useBaseUrl("/images/panda-pixel-2.png")} width="100" />
      <img className="panda-footer-img" src={useBaseUrl("/images/service-service.png")} width="200" />
      <div className="panda-support">
        <img className="panda-support-img" src={useBaseUrl("/images/ngi-logo.png")} width="200" />
        <img className="panda-support-img" src={useBaseUrl("/images/eu-flag-logo.png")} width="78" />
        <p className="panda-support-text">
          This project has received funding from the European Union’s Horizon 2020 research and innovation programme within the framework of the NGI-POINTER Project funded under grant agreement No 871528
        </p>
      </div>
      <p className="panda-copyright">{copyright}</p>
    </footer>
  );
}

export default React.memo(Footer);
