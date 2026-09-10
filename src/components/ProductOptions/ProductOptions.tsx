import cn from 'classnames';

type ProductOptionsProps = {
  colorsAvailable: string[];
  capacityAvailable: string[];
  color: string;
  capacity: string;
  onColorChange: (color: string) => void;
  onCapacityChange: (capacity: string) => void;
};

export const ProductOptions = ({
  colorsAvailable,
  capacityAvailable,
  color,
  capacity,
  onColorChange,
  onCapacityChange,
}: ProductOptionsProps) => {
  return (
    <>
      {colorsAvailable.map(productColor => (
        <button
          key={productColor}
          className={cn({
            active: color === productColor,
          })}
          onClick={() => {
            if (productColor !== color) {
              onColorChange(productColor);
            }
          }}
        >
          {productColor}
        </button>
      ))}

      {capacityAvailable.map(productCapacity => (
        <button
          key={productCapacity}
          className={cn({
            active: capacity === productCapacity,
          })}
          onClick={() => {
            if (capacity !== productCapacity) {
              onCapacityChange(productCapacity);
            }
          }}
        >
          {productCapacity}
        </button>
      ))}
    </>
  );
};
