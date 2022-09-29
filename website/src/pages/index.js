import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div id="image" style={{display : 'inline-block', paddingRight: '1em'}}>
          <a href="https://www.eeagrants.ro/"><img src="/img/eea-grants.png" title="EEA Grants" width="80" align="center"/></a>
        </div>
        <div id="text" style={{display : 'inline-block'}}>
          <p align="center" style={{fontSize: '0.75em'}}>Project <strong>21-COP-0016</strong> funded by <a href="https://www.eeagrants.ro/" style={{color: 'white'}}>EEA Grants</a> (via <a href="https://www.anpcdefp.ro/" style={{color: 'white'}}>ANPCDEFP</a>)</p>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Website for the Open Education Hub Project">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
