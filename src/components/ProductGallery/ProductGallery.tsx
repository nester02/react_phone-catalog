import cn from 'classnames';

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
    <>
      <div className="details-gallery">
        {productImages.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => onSelectImage(index)}
            className={cn({ active: imageIndex === index })}
          >
            <img src={image} alt={`${productName}, view ${index + 1}`} />
          </button>
        ))}
      </div>
      <img src={productImages[imageIndex]} alt={productName} />
    </>
  );
};
