import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './swiper.scss';

import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { CatalogGrid } from '../../components/catalog-grid/CatalogGrid.tsx';
import { PromocodeLine } from '../../components/promocode-line/PromocodeLine.tsx';
import styles from './styles.module.scss';

export function Home(): JSX.Element {
  const bannerImages = [
    {
      id: 1,
      extraClass: 'avatar',
      link: '/catalog/decor/figures/aang-tubbz',
    },
    {
      id: 2,
      extraClass: 'war',
      link: '/catalog/decor/figures/stormtrooper-mini-tubbz',
    },
  ];

  return (
    <main className={classNames('main', styles.main)}>
      <div className={styles.container}>
        <h1 className={styles.title}>Home page</h1>
        <Swiper
          initialSlide={0}
          spaceBetween={15}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          slidesPerView={1}
          navigation
          lazyPreloadPrevNext={1}
          loop
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Navigation, Pagination]}
          className="modalSwiper"
        >
          {bannerImages &&
            bannerImages.map((bannerItem) => (
              <SwiperSlide key={bannerItem.id} className={classNames(styles.swiperSlide, bannerItem.extraClass)}>
                <Link to={bannerItem.link} className={styles.link}>
                  <div className="hide">Banner</div>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
        <h2 className={styles.h2Title}>Our Products </h2>
        <CatalogGrid />
      </div>
      <PromocodeLine />
    </main>
  );
}
