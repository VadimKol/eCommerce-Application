import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './swiper.scss';

import classNames from 'classnames';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { CatalogGrid } from '../../components/catalog-grid/CatalogGrid.tsx';
import { PromocodeLine } from '../../components/promocode-line/PromocodeLine.tsx';
import styles from './styles.module.scss';

export function Home(): JSX.Element {
  const bannerImages = [
    {
      image: '/src/assets/images/avatar_banner.png',
      link: '/catalog/decor/figures/aang-tubbz',
    },
    {
      image: '/src/assets/images/war_banner.png',
      link: '/catalog/decor/figures/stormtrooper-mini-tubbz',
    },
  ];

  return (
    <main className={classNames('main', styles.main)}>
      <div className={styles.container}>
        <h1 className={styles.title}>Home page</h1>
        <Swiper
          initialSlide={0}
          spaceBetween={100}
          slidesPerView={1}
          navigation
          lazyPreloadPrevNext={1}
          loop
          pagination={{
            clickable: true,
          }}
          modules={[Navigation, Pagination]}
          className="modalSwiper"
        >
          {bannerImages &&
            bannerImages.map((bannerItem, index) => (
              <SwiperSlide key={bannerItem.image} className={styles.swiperSlide}>
                <a href={bannerItem.link}>
                  <img
                    src={bannerItem.image}
                    alt={`banner number ${index + 1}`}
                    className={styles.modalImage}
                    loading="lazy"
                  />
                  <div className="swiper-lazy-preloader" />
                </a>
              </SwiperSlide>
            ))}
        </Swiper>
        <CatalogGrid />
        <PromocodeLine />
      </div>
    </main>
  );
}
