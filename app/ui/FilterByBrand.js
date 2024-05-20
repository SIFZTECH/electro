const FilterByBrand = () => {
  return (
    <div className="border-b border-grey-0 py-6 px-3">
      <legend className="font-bold mb-2 font-serif">By Brand</legend>
      <div className="flex gap-1 items-center">
        <input type="checkbox" id="nc2" name="nc2" defaultChecked />
        <label htmlFor="nc2">NCM Moscow 2</label>
      </div>
      <div className="flex gap-1 items-center">
        <input type="checkbox" id="nc3" name="ncm-3" />
        <label htmlFor="nc3">NCM Moscow 3</label>
      </div>
      <div className="flex gap-1 items-center">
        <input type="checkbox" id="ncmilano" name="ncm-milano" />
        <label htmlFor="ncmilano">NCM Milano Plus</label>
      </div>
      <div className="flex gap-1 items-center">
        <input type="checkbox" id="ncaspen" name="ncm-aspen" />
        <label htmlFor="ncaspen">NCM Aspen</label>
      </div>
    </div>
  );
};

export default FilterByBrand;
