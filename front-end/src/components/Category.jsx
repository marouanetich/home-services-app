function Category({ name, image, description }) {
  return (
    <div className="grid cursor-pointer bg-orange-50 p-4 rounded-md shadow-sm" title={description}>
      <img src={image} alt={name} className="w-[50px] mx-auto" />
      <div className="mt-2 text-sm">{name}</div>
    </div>
  );
}

export default Category;