import { BASE_URL_IMAGE } from "@/app/lib/utils";
import SkeletonProductCards from "@/app/components/ui/SkeletonProductCards";
import SearchProduct from "./SearchProduct";
import NotFoundData from "@/app/components/ui/NotFoundData";
import Product from "@/app/components/_root_ui/Product";
import FilterByStatus from "./FilterByStatus";

const Products = ({
  isLoading,
  isError,
  error,
  products,
  compareList,
  toggleCompare,
  setValue,
  status,
  setStatus,
}) => {
  return (
    <div>
      <div className="hidden md:block">
        <SearchProduct />
      </div>
      <FilterByStatus status={status} setStatus={setStatus} />

      <div className="grid grid-cols-1 sm:grid-cold-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 pt-8">
        {!isLoading && isError && error && (
          <h1>
            {error?.response.data.message
              ? error.response.data.message
              : error.message}
          </h1>
        )}
        {!isLoading && products?.data.data.length === 0 && (
          <NotFoundData message="There is no products!" />
        )}
        {isLoading && !isError && !error && <SkeletonProductCards />}
        {!isLoading &&
          !isError &&
          !error &&
          products?.data?.data?.map((product) => (
            <Product
              key={product.id}
              id={product.id}
              slug={product.slug}
              image={
                product?.images[0]?.image_path.startsWith(
                  "https://www.leoncycle.com.au"
                )
                  ? product?.images[0]?.image_path
                  : `${BASE_URL_IMAGE}${product?.images[0]?.image_path}`
              }
              name={product.name}
              summary={product.introduction}
              isCompared={compareList.some((p) => p.id === product.id)}
              toggleCompare={() => toggleCompare(product)}
              navigateTo={"dashboard/product-specifications"}
              setValue={setValue}
            />
          ))}
      </div>
    </div>
  );
};

export default Products;
