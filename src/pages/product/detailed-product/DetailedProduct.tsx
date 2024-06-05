import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './swiper.scss';

import { useEffect, useRef, useState } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { ProductDetails } from '@/common/types';

import styles from './styles.module.scss';

const OPACITY_DELAY_MS = 500;

interface DetailedProductProps {
  product: ProductDetails | null;
  loading: boolean;
}

function DetailedProduct({ product, loading }: DetailedProductProps): JSX.Element {
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

  if (loading) {
    return <div className={styles.infoMessage}>Loading product data...</div>;
  }

  if (!product) {
    return <div className={styles.infoMessage}>Product not found</div>;
  }

  const { name, description, price, discountedPrice, currency, images, attributes, availability } = product;

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
            {images &&
              images.map((image, index) => (
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
                  <img src={image} alt={`${name} ${index + 1}`} className={styles.productImage} loading="lazy" />
                  <div className="swiper-lazy-preloader" />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        <div className={styles.productInfo}>
          <h1 className={styles.productName}>{name}</h1>
          <p className={styles.productDescription}>{description}</p>
          <div className={styles.productPrice}>
            {discountedPrice ? (
              <>
                <p className={styles.salePrice}>
                  <span>{currency}</span>
                  <span>{discountedPrice}</span>
                </p>
                <p className={styles.originalPrice}>
                  <span>{currency}</span>
                  <span>{price}</span>
                </p>
              </>
            ) : (
              <span className={styles.price}>
                {currency} {price}
              </span>
            )}
          </div>
          <div className={styles.productQuantity}>
            <strong>Available Quantity:</strong> {availability?.availableQuantity}
          </div>
          <div className={styles.productAttributes}>
            {attributes &&
              attributes.map(
                (attribute) =>
                  attribute.name !== 'Description' && (
                    <div key={attribute.name} className={styles.attribute}>
                      <strong className={styles.attributeName}>{attribute.name}:</strong>
                      <span className={styles.attributeValue}>
                        {Array.isArray(attribute.value) ? attribute?.value[0]?.key : attribute.value}
                      </span>
                    </div>
                  ),
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
              {images &&
                images.map((image, index) => (
                  <SwiperSlide key={image} className={styles.swiperSlide}>
                    <img src={image} alt={`${name} ${index + 1}`} className={styles.modalImage} loading="lazy" />
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
