import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { ProductDetails } from '../../types';
import { getProductDetails } from '../../api';
import { Loader } from '../../components/Loader';
import cn from 'classnames';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [fullProductDetails, setFullProductDetails] =
    useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
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
  }, [productId]);

  return (
    <div>
      {isLoading && <Loader />}

      {!isLoading && isError && <h1>Something went wrong</h1>}

      {!isLoading && !isError && fullProductDetails === null && (
        <h1>Product was not found</h1>
      )}

      {!isLoading && !isError && fullProductDetails && (
        <>
          <h1>{fullProductDetails.name}</h1>
          <div className="details-row">
            <div className="details-gallery">
              {fullProductDetails.images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setSelectedImageIndex(index)}
                  className={cn({ active: selectedImageIndex === index })}
                >
                  <img
                    src={image}
                    alt={`${fullProductDetails.name}, view ${index + 1}`}
                  />
                </button>
              ))}
            </div>
            <img
              src={fullProductDetails.images[selectedImageIndex]}
              alt={fullProductDetails.name}
            />
            <p>{`$${fullProductDetails.priceDiscount}`}</p>
            <del>{`$${fullProductDetails.priceRegular}`}</del>
            <dl>
              <dt>Screen</dt>
              <dd>{fullProductDetails.screen}</dd>
              <dt>Resolution</dt>
              <dd>{fullProductDetails.resolution}</dd>
              <dt>Processor</dt>
              <dd>{fullProductDetails.processor}</dd>
              <dt>RAM</dt>
              <dd>{fullProductDetails.ram}</dd>
            </dl>
          </div>
          <div className="description-row">
            <div className="description-about">
              {fullProductDetails.description.map((detail, index) => (
                  <section key={detail.title} className="description-col">
                    <h2 className="description-title">{detail.title}</h2>
                    {detail.text.map(text => (
                      <p key={`${detail.title}-${index}`}>{text}</p>
                    )}
                  </section>
              ))}
              </div>
              <div className="description-speks">
              <dl>
                  <dt>Screen</dt>
                  <dd>{fullProductDetails.screen}</dd>
                  <dt>Resolution</dt>
                  <dd>{fullProductDetails.resolution}</dd>
                  <dt>Processor</dt>
                  <dd>{fullProductDetails.processor}</dd>
                  <dt>RAM</dt>
                  <dd>{fullProductDetails.ram}</dd>
                  <dt>Сapacity</dt>
                  <dd>{fullProductDetails.capacity}</dd>
                  <dt>Сamera</dt>
                  <dd>{fullProductDetails.camera}</dd>
                  <dt>Zoom</dt>
                  <dd>{fullProductDetails.zoom}</dd>
                  <dt>Cell</dt>
                  <dd>
                      {fullProductDetails.cell.map(type => (

                   <span>{type}</span>
                    ))}
                  </dd>
              </dl>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
