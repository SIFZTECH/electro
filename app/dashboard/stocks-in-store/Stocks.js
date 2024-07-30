import { useProducts } from "@/app/_features/products/useProducts";
import Spinner from "@/app/components/ui/Spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";

const dummyData = [
  {
    id: "dyyds735363",
    products: "NTM T3s",
    myEBikes: "50",
    clicks: "50",
  },
  {
    id: "dyyds735364",
    products: "NTM Tcs",
    myEBikes: "50",
    clicks: "50",
  },
  {
    id: "dyyds735365",
    products: "NTM Tcs",
    myEBikes: "50",
    clicks: "50",
  },
  {
    id: "dyyds735366",
    products: "NTM Tcs",
    myEBikes: "50",
    clicks: "50",
  },
  {
    id: "dyyds735367",
    products: "OLD Tcs",
    myEBikes: "50",
    clicks: "50",
  },
  {
    id: "dyyds735368",
    products: "SST Tcs",
    myEBikes: "50",
    clicks: "50",
  },
  {
    id: "dyyds735369",
    products: "NTM 4ST",
    myEBikes: "50",
    clicks: "50",
  },
];

const Stocks = ({ products }) => {
  const data = products?.data?.data;

  return (
    <Table className="mt-3">
      <TableHeader>
        <TableRow>
          <TableHead>Products</TableHead>
          <TableHead>E Bikes</TableHead>
          <TableHead>Clicks</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((data, i) => {
          return (
            <TableRow key={i + 1}>
              <TableCell data-label="Products">{data.name}</TableCell>
              <TableCell data-label="MyEBikes">{data.stock}</TableCell>
              <TableCell data-label="Clicks">-</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
export default Stocks;
