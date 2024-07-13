import classNames from 'classnames';

import { sourceArr } from './data.ts';
import styles from './styles.module.scss';

export function CatalogGrid(): JSX.Element {
  return (
    <div className={styles.catalogBlock}>
      {sourceArr.map((item) => (
        <div key={item.title} className={styles.catalogItem}>
          <a href={item.link} className={styles.link}>
            <img src={item.image} alt={item.title} className={styles.catalogImage} />
            <h3 className={styles.catalogTitle}>{item.title}</h3>
          </a>
        </div>
      ))}
      <div key="to catalog" className={classNames(styles.catalogItem, styles.catalogItemMore)}>
        <a href="/catalog" className={styles.link}>
          <h3 className={styles.catalogTitle}>Show more at Catalog</h3>
        </a>
      </div>
    </div>
  );
}

export default CatalogGrid;
