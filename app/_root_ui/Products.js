import { BASE_URL_IMAGE } from "../lib/utils";
import Product from "./Product";
import SearchProduct from "./SearchProduct";

const Products = ({ products, compareList, toggleCompare }) => {
  const data = products.data.data;

  return (
    <div>
      <SearchProduct />
      <div className="grid grid-cols-1 sm:grid-cold-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 pt-8">
        {data.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            slug={product.slug}
            image={`${BASE_URL_IMAGE}${product?.images[0]?.image_path}`}
            name={product.name}
            summary={product.introduction}
            isCompared={compareList.some((p) => p.id === product.id)}
            toggleCompare={() => toggleCompare(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
