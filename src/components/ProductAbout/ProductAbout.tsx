type DescriptionItem = {
  title: string;
  text: string[];
};

type ProductAboutProps = {
  description: DescriptionItem[];
};

export const ProductAbout = ({ description }: ProductAboutProps) => {
  return (
    <div className="description-about">
      {description.map((detail, index) => (
        <section key={detail.title} className="description-col">
          <h2 className="description-title">{detail.title}</h2>

          {detail.text.map((text, textIndex) => (
            <p key={`${detail.title}-${index}-${textIndex}`}>{text}</p>
          ))}
        </section>
      ))}
    </div>
  );
};
