const SectionTitle = ({ heading, subHeading }: any) => {
  return (
    <div className="mx-auto text-center md:w-4/12 my-6">
      <p className="text-yellow-500 font-bold mb-2">{subHeading}</p>
      <h3 className="text-xl font-bold uppercase border-y-4 py-4">{heading}</h3>
    </div>
  );
};

export default SectionTitle;
