import classNames from 'classnames';

import home_figure from '@/assets/images/home_figure.png';
import home_mug from '@/assets/images/home_mug.png';
import home_note from '@/assets/images/home_note.png';
import home_pad from '@/assets/images/home_pad.png';
import home_weapon from '@/assets/images/home_weapon.png';
import home_wig from '@/assets/images/home_wig.png';

import styles from './styles.module.scss';

const sourceArr = [
  {
    title: 'Weapons',
    image: home_weapon,
    link: '/catalog/cosplay/weapon',
  },
  {
    title: 'Wigs',
    image: home_wig,
    link: '/catalog/cosplay/wigs',
  },
  {
    title: 'Figure',
    image: home_figure,
    link: '/catalog/decor/figures',
  },
  {
    title: 'Mugs',
    image: home_mug,
    link: '/catalog/decor/mugs',
  },
  {
    title: 'Pads',
    image: home_pad,
    link: '/catalog/decor/pads',
  },
  {
    title: 'Notepads',
    image: home_note,
    link: '/catalog/stationery/notepads',
  },
];

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
