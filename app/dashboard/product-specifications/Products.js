import Search from "@/app/components/ui/Search";
import Pagination from "./Pagination";
import Product from "./Product";

const Products = ({ products }) => {
  const data = products.data;

  return (
    <div>
      <Search />
      <div className="grid grid-cols-1 sm:grid-cold-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 pt-8">
        {data.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            slug={product.slug}
            image={`${product?.images[0].image_path}`}
            name={product.name}
            summary={product.introduction}
          />
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default Products;
