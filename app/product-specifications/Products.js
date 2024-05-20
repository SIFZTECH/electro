import Search from "../ui/Search";
import Product from "./Product";

const products = [
  {
    id: 1,
    productName: "NCM T3s",
    productSummary:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, ipsum numquam impedit quo itaque .",
    productImage: "/Cycle.jpg",
  },
  {
    id: 2,
    productName: "NCM T3s 2",
    productSummary:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, ipsum numquam impedit quo",
    productImage: "/Cycle.jpg",
  },
  {
    id: 3,
    productName: "NCM T9d",
    productSummary:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, ipsum numquam",
    productImage: "/Cycle.jpg",
  },
  {
    id: 4,
    productName: "NCM Sts",
    productSummary:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, ipsum numquam",
    productImage: "/Cycle.jpg",
  },
  {
    id: 5,
    productName: "NCM T311s",
    productSummary:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, ipsum numquam",
    productImage: "/Cycle.jpg",
  },
  {
    id: 6,
    productName: "NCM T38s",
    productSummary:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, ipsum numquam",
    productImage: "/Cycle.jpg",
  },
  {
    id: 7,
    productName: "NCM T3s",
    productSummary:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, ipsum numquam",
    productImage: "/Cycle.jpg",
  },
  {
    id: 8,
    productName: "NCM T3s",
    productSummary:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, ipsum numquam",
    productImage: "/Cycle.jpg",
  },
  {
    id: 9,
    productName: "NCM T3s",
    productSummary:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, ipsum numquam",
    productImage: "/Cycle.jpg",
  },
  {
    id: 10,
    productName: "NCM T3s",
    productSummary:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, ipsum numquam",
    productImage: "/Cycle.jpg",
  },
  {
    id: 11,
    productName: "NCM T3s",
    productSummary:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, ipsum numquam",
    productImage: "/Cycle.jpg",
  },
  {
    id: 12,
    productName: "NCM T3s",
    productSummary:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, ipsum numquam",
    productImage: "/Cycle.jpg",
  },
];

const Products = () => {
  return (
    <div>
      <Search />
      <div className="grid grid-cols-4 gap-8 pt-8">
        {products.map((data) => (
          <Product
            key={data.id}
            id={data.id}
            image={data.productImage}
            name={data.productName}
            summary={data.productSummary}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
