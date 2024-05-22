import Stocks from "./Stocks";
import UploadModal from "./UploadModal";

const page = () => {
  return (
    <div className="p-3">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h1 className="heading-h1">Stock in Store</h1>
        <div className="flex items-center mb-8 mt-4 gap-3">
          <UploadModal />
          <button className="btn-primary">Edit Stoke</button>
        </div>
      </div>
      <Stocks />
    </div>
  );
};

export default page;
