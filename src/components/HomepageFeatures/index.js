import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Old World Collapsed',
    huge:'WORLD',
    description: (
      <>
        Everything desdroied
      </>
    ),
  },
  {
    title: 'New World Built',
    huge:'WAR',
    description: (
      <>
        Through the ugest way.
      </>
    ),
  },
  {
    title: 'Again',
    huge:'II',
    description: (
      <>
        Will this coming again?
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
