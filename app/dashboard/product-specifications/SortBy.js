import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

const SortBy = ({ sort: value, setSort: setValue }) => {
  return (
    <div className="flex justify-end mt-3 mr-1">
      <Select value={value} onValueChange={(val) => setValue(val)}>
        <SelectTrigger className="w-fit bg-gray-100 h-8 font-semibold shadow-md focus:ring-0 focus:ring-offset-0 gap-2">
          <SelectValue placeholder="E Bikes" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="e-bikes">E Bikes</SelectItem>
          <SelectItem value="misc13">Misc13</SelectItem>
          <SelectItem value="price-asc">Price: Low to High</SelectItem>
          <SelectItem value="price-desc">Price: High to Low</SelectItem>
          <SelectItem value="stock-asc">Stock: Low to High</SelectItem>
          <SelectItem value="stock-desc">Stock: High to Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortBy;
