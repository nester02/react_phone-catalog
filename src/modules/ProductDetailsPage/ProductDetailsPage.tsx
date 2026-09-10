import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { ProductDetails } from '../../types';
import { getProductDetails } from '../../api';
import { Loader } from '../../components/Loader';
import { ProductGallery } from '../../components/ProductGallery';
import { ProductOptions } from '../../components/ProductOptions';
import { ProductTechSpecs } from '../../components/ProductTechSpecs';
import { ProductAbout } from '../../components/ProductAbout';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [fullProductDetails, setFullProductDetails] =
    useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const navigate = useNavigate();

  const normalizeCapacity = (capacity: string) => capacity.toLowerCase();

  const normalizeColor = (color: string) =>
    color.replaceAll(' ', '-').toLowerCase();

  const handleCapacityChange = (capacity: string) => {
    if (!fullProductDetails) {
      return;
    }

    const newProductId = `${fullProductDetails.namespaceId}-${normalizeCapacity(
      capacity,
    )}-${normalizeColor(fullProductDetails.color)}`;

    navigate(`/product/${newProductId}`);
  };

  const handleColorChange = (color: string) => {
    if (!fullProductDetails) {
      return;
    }

    const newProductId = `${fullProductDetails.namespaceId}-${normalizeCapacity(
      fullProductDetails.capacity,
    )}-${normalizeColor(color)}`;

    navigate(`/product/${newProductId}`);
  };

  const loadProductDetails = () => {
    if (!productId) {
      setIsLoading(false);

      return;
    }

    setIsLoading(true);
    setIsError(false);
    setFullProductDetails(null);
    setSelectedImageIndex(0);

    getProductDetails(productId)
      .then(product => {
        setFullProductDetails(product ?? null);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadProductDetails();
  }, [productId]);

  return (
    <div>
      {isLoading && <Loader />}

      {!isLoading && isError && (
        <>
          <h1>Something went wrong</h1>
          <button type="button" onClick={loadProductDetails}>
            Try again
          </button>
        </>
      )}

      {!isLoading && !isError && fullProductDetails === null && (
        <h1>Product was not found</h1>
      )}

      {!isLoading && !isError && fullProductDetails && (
        <>
          <h1>{fullProductDetails.name}</h1>

          <div className="details-row">
            <ProductGallery
              productName={fullProductDetails.name}
              productImages={fullProductDetails.images}
              onSelectImage={setSelectedImageIndex}
              imageIndex={selectedImageIndex}
            />

            <ProductOptions
              colorsAvailable={fullProductDetails.colorsAvailable}
              capacityAvailable={fullProductDetails.capacityAvailable}
              color={fullProductDetails.color}
              capacity={fullProductDetails.capacity}
              onColorChange={handleColorChange}
              onCapacityChange={handleCapacityChange}
            />

            <p>{`$${fullProductDetails.priceDiscount}`}</p>
            <del>{`$${fullProductDetails.priceRegular}`}</del>
          </div>

          <div className="description-row">
            <ProductAbout description={fullProductDetails.description} />

            <ProductTechSpecs
              screen={fullProductDetails.screen}
              resolution={fullProductDetails.resolution}
              processor={fullProductDetails.processor}
              ram={fullProductDetails.ram}
              capacity={fullProductDetails.capacity}
              camera={fullProductDetails.camera}
              zoom={fullProductDetails.zoom}
              cell={fullProductDetails.cell}
            />
          </div>
        </>
      )}
    </div>
  );
};
