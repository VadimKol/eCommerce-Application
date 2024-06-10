import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './swiper.scss';

import classNames from 'classnames';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './styles.module.scss';

export function Home(): JSX.Element {
  const images = [
    '../../assets/images/promo_banner.png',
    '../../assets/images/avatar_banner.png',
    '../../assets/images/war_banner.png',
  ];
  return (
    <main className={classNames('main', styles.main)}>
      <div className={styles.container}>
        <h1 className={styles.title}>Home page</h1>
        <Swiper
          initialSlide={0}
          spaceBetween={10}
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
          {images &&
            images.map((image, index) => (
              <SwiperSlide key={image} className={styles.swiperSlide}>
                <img src={image} alt={`banner number ${index + 1}`} className={styles.modalImage} loading="lazy" />
                <div className="swiper-lazy-preloader" />
              </SwiperSlide>
            ))}
        </Swiper>
        <div className={styles.animateBlock}>
          <div className={classNames(styles.animateLine, styles.animateLineFirst)}>
            Apply Promo Code &quot;GEEK-SHOP&quot; and get 10% discount
          </div>
          <div className={classNames(styles.animateLine, styles.animateLineSecond)}>
            Apply Promo Code &quot;GEEK-SHOP&quot; and get 10% discount
          </div>
        </div>
      </div>
    </main>
  );
}
