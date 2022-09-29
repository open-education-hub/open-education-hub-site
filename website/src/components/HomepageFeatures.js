import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Retain',
    Svg: require('../../static/img/retain.drawio.svg').default,
    description: (
      <>
        Make, own and control copies
      </>
    ),
  },
  {
    title: 'Reuse',
    Svg: require('../../static/img/reuse.drawio.svg').default,
    description: (
      <>
        Use in a wide range of ways
      </>
    ),
  },
  {
    title: 'Revise',
    Svg: require('../../static/img/revise.drawio.svg').default,
    description: (
      <>
        Adapt, adjust and improve
      </>
    ),
  },
  {
    title: 'Remix',
    Svg: require('../../static/img/remix.drawio.svg').default,
    description: (
      <>
        Combine two or more
      </>
    ),
  },
  {
    title: 'Redistribute',
    Svg: require('../../static/img/redistribute.drawio.svg').default,
    description: (
      <>
        Share with others
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
