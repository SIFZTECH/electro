import { BASE_URL_IMAGE } from "@/app/lib/utils";
import SkeletonProductCards from "@/app/components/ui/SkeletonProductCards";
import Product from "./Product";
import SearchProduct from "./SearchProduct";
import NotFoundData from "@/app/components/ui/NotFoundData";
import SortBy from "@/app/dashboard/product-specifications/SortBy";
import FilterByBikes from "@/app/dashboard/product-specifications/FilterByBikes";

const Products = ({
  isLoading,
  isError,
  error,
  products,
  compareList,
  toggleCompare,
  setValue,
  sort,
  setSort,
  misc13,
  setMisc13,
}) => {
  return (
    <div>
      <div className="hidden md:block">
        <SearchProduct />
      </div>

      <div className="flex gap-4 items-center justify-end">
        <FilterByBikes misc13={misc13} setMisc13={setMisc13} />
        <SortBy sort={sort} setSort={setSort} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cold-2 xl:grid-cols-4 2xl:grid-cols-5 gap-8 pt-8">
        {!isLoading && isError && error && (
          <h1>
            {error?.response?.data
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
          products &&
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
              setValue={setValue}
              compareList={compareList}
            />
          ))}
      </div>
    </div>
  );
};

export default Products;
