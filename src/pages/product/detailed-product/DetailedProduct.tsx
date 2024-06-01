import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './swiper.scss';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import productsData from '@/router/mock-products.json';

import styles from './styles.module.scss';

const OPACITY_DELAY_MS = 500;

function DetailedProduct(): JSX.Element {
  const { productName: productId } = useParams();
  const product = productsData
    .flatMap((category) => category.subcategories.flatMap((subcategory) => subcategory.products))
    .find((productItem) => productItem.id === productId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleImageClick = (index: number): void => {
    setActiveImageIndex(index);
    setIsModalOpen(true);
  };

  const handleModalClose = (): void => {
    modalRef.current?.classList.remove(styles.modalOpaque!);
    setTimeout(() => {
      setIsModalOpen(false);
    }, OPACITY_DELAY_MS);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        modalRef.current?.classList.add(styles.modalOpaque!);
      }, 0);

      const handleEscKey = (e: KeyboardEvent): void => {
        if (e.key === 'Escape') {
          handleModalClose();
        }
      };

      document.addEventListener('keydown', handleEscKey);

      return (): void => {
        document.removeEventListener('keydown', handleEscKey);
      };
    }

    document.body.style.overflow = 'auto';

    return (): void => {};
  }, [isModalOpen]);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <div className={styles.productDetails}>
        <div className={styles.imageSlider}>
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            navigation
            lazyPreloadPrevNext={1}
            loop
            pagination={{
              clickable: true,
            }}
            modules={[Navigation, Pagination]}
            className="pageSwiper"
          >
            {product.images.map((image, index) => (
              <SwiperSlide
                key={image}
                tabIndex={0}
                className={styles.swiperSlide}
                onClick={() => handleImageClick(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleImageClick(index);
                  }
                }}
              >
                <img
                  src={`/src/assets/products/${image}`}
                  alt={`${product.name} ${index + 1}`}
                  className={styles.productImage}
                  loading="lazy"
                />
                <div className="swiper-lazy-preloader" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={styles.productInfo}>
          <h1 className={styles.productName}>{product.name}</h1>
          <p className={styles.productDescription}>{product.description}</p>
          <div className={styles.productPrice}>
            {product.salePrice ? (
              <>
                <span className={styles.salePrice}>${product.salePrice}</span>
                <span className={styles.originalPrice}>${product.price}</span>
              </>
            ) : (
              <span className={styles.price}>${product.price}</span>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modal} onClick={handleModalClose} ref={modalRef}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={handleModalClose}>
              <span className="visually-hidden">Close modal</span>
            </button>
            <Swiper
              initialSlide={activeImageIndex}
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
              {product.images.map((image, index) => (
                <SwiperSlide key={image} className={styles.swiperSlide}>
                  <img
                    src={`/src/assets/products/${image}`}
                    alt={`${product.name} ${index + 1}`}
                    className={styles.modalImage}
                    loading="lazy"
                  />
                  <div className="swiper-lazy-preloader" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
}

export default DetailedProduct;
