const GalleryCard = ({ image, name }: any) => {
  return (
    <div className="keen-slider__slide">
      <div className="bg-[#FFFAFA] rounded-xl border-[#D3D3D3] border-[0.5px]">
        <img src={image} alt={name} className="w-full" />
        <h4 className="h-12 text-xl font-medium p-6 mb-6">{name}</h4>
      </div>
    </div>
  );
};

export default GalleryCard;
