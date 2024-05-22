const FilterByModal = () => {
  return (
    <div className="border-b border-grey-0 py-6 px-3">
      <legend className="font-bold mb-2 font-serif">By Model</legend>
      <div className="flex gap-1 items-center">
        <input type="checkbox" id="ncm-2" name="ncm-2" defaultChecked />
        <label htmlFor="ncm-2">NCM Moscow 2</label>
      </div>
      <div className="flex gap-1 items-center">
        <input type="checkbox" id="ncm-3" name="ncm-3" />
        <label htmlFor="ncm-3">NCM Moscow 3</label>
      </div>
      <div className="flex gap-1 items-center">
        <input type="checkbox" id="ncm-milano" name="ncm-milano" />
        <label htmlFor="ncm-milano">NCM Milano Plus</label>
      </div>
      <div className="flex gap-1 items-center">
        <input type="checkbox" id="ncm-aspen" name="ncm-aspen" />
        <label htmlFor="ncm-aspen">NCM Aspen</label>
      </div>
    </div>
  );
};

export default FilterByModal;
