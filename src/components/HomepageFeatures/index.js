import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '旧世界崩塌',
    huge:'WORLD',
    description: (
      <>
        1939-1945人世间最接近地狱的时刻
      </>
    ),
  },
  {
    title: '新世界建立',
    huge:'WAR',
    description: (
      <>
        希望从无数人类的尸骨中生出
      </>
    ),
  },
  {
    title: 'Again',
    huge:'II',
    description: (
      <>
        还会再来一次吗？
      </>
    ),
  },
];

function Feature({huge, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
      <Heading as="h1">{huge}</Heading>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
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
