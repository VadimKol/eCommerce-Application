import styles from './styles.module.scss';

const sourceArr = [
  {
    title: 'Weapons',
    image: '/src/assets/images/home_weapon.jpg',
    link: '/catalog/cosplay/weapon',
  },
  {
    title: 'Wigs',
    image: '/src/assets/images/home_wig.jpg',
    link: '/catalog/cosplay/wigs',
  },
  {
    title: 'Mugs',
    image: '/src/assets/images/home_mug.png',
    link: '/catalog/decor/mugs',
  },
  {
    title: 'Pads',
    image: '/src/assets/images/home_pad.jpg',
    link: '/catalog/decor/pads',
  },
  {
    title: 'Notebooks',
    image: '/src/assets/images/home_note.jpg',
    link: '/catalog/stationery/notepads',
  },
];

export function CatalogGrid(): JSX.Element {
  return (
    <div className={styles.catalogBlock}>
      {sourceArr.map((item) => (
        <div key={item.title} className={styles.catalogItem}>
          <a href={item.link}>
            <img src={item.image} alt={item.title} className={styles.catalogImage} />
            <h3 className={styles.catalogTitle}>{item.title}</h3>
          </a>
        </div>
      ))}
    </div>
  );
}

export default CatalogGrid;
