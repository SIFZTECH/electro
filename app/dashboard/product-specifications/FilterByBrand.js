const FilterByBrand = () => {
  return (
    <div className="border-b border-grey-0 py-6 px-3">
      <legend className="font-bold mb-2 font-serif">By Brand</legend>
      <div className="flex gap-1 items-center">
        <input type="checkbox" id="bnc2" name="bnc2" defaultChecked />
        <label htmlFor="bnc2">NCM Moscow 2</label>
      </div>
      <div className="flex gap-1 items-center">
        <input type="checkbox" id="bnc3" name="ncm-3" />
        <label htmlFor="bnc3">NCM Moscow 3</label>
      </div>
      <div className="flex gap-1 items-center">
        <input type="checkbox" id="bncmilano" name="ncm-milano" />
        <label htmlFor="bncmilano">NCM Milano Plus</label>
      </div>
      <div className="flex gap-1 items-center">
        <input type="checkbox" id="bncaspen" name="ncm-aspen" />
        <label htmlFor="bncaspen">NCM Aspen</label>
      </div>
    </div>
  );
};

export default FilterByBrand;
