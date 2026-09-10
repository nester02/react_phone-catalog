type ProductTechSpecsProps = {
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  capacity: string;
  camera?: string;
  zoom?: string;
  cell: string[];
};

export const ProductTechSpecs = ({
  screen,
  resolution,
  processor,
  ram,
  capacity,
  camera,
  zoom,
  cell,
}: ProductTechSpecsProps) => {
  return (
    <dl>
      <dt>Screen</dt>
      <dd>{screen}</dd>

      <dt>Resolution</dt>
      <dd>{resolution}</dd>

      <dt>Processor</dt>
      <dd>{processor}</dd>

      <dt>RAM</dt>
      <dd>{ram}</dd>

      <dt>Capacity</dt>
      <dd>{capacity}</dd>

      {camera && (
        <>
          <dt>Camera</dt>
          <dd>{camera}</dd>
        </>
      )}

      {zoom && (
        <>
          <dt>Zoom</dt>
          <dd>{zoom}</dd>
        </>
      )}

      {cell.length > 0 && (
        <>
          <dt>Cell</dt>
          <dd>
            {cell.map(type => (
              <span key={type}>{type}</span>
            ))}
          </dd>
        </>
      )}
    </dl>
  );
};
