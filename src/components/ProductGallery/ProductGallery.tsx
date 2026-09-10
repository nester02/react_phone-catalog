import cn from 'classnames';
import styles from './ProductGallery.module.scss';

type ProductGalleryProps = {
  productName: string;
  productImages: string[];
  onSelectImage: (index: number) => void;
  imageIndex: number;
};

export const ProductGallery = ({
  productName,
  productImages,
  onSelectImage,
  imageIndex,
}: ProductGalleryProps) => {
  return (
    <div className={styles.gallery}>
      <ul className={styles.thumbs}>
        {productImages.map((image, index) => (
          <li key={image}>
            <button
              type="button"
              onClick={() => onSelectImage(index)}
              className={cn(styles.thumb, {
                [styles.thumbActive]: imageIndex === index,
              })}
              aria-label={`${productName}, view ${index + 1}`}
            >
              <img src={image} alt="" className={styles.thumbImage} />
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.mainImageWrapper}>
        <img
          src={productImages[imageIndex]}
          alt={productName}
          className={styles.mainImage}
        />
      </div>
    </div>
  );
};
