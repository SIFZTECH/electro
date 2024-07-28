import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

const FilterByStatus = ({ status: value, setStatus: setValue }) => {
  return (
    <div className="flex justify-end mt-3 mr-1">
      <Select value={value} onValueChange={(val) => setValue(val)}>
        <SelectTrigger className="w-fit bg-gray-100 h-8 font-semibold shadow-md focus:ring-0 focus:ring-offset-0 gap-2">
          <SelectValue placeholder="All" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="Active">Active</SelectItem>
          <SelectItem value="Pending">Pending</SelectItem>
          <SelectItem value="Out of Stock">Out of Stock</SelectItem>
          <SelectItem value="Discontinued">Discontinued</SelectItem>
          <SelectItem value="Draft">Draft</SelectItem>
          <SelectItem value="Pre-order">Pre-order</SelectItem>
          <SelectItem value="Backorder">Backorder</SelectItem>
          <SelectItem value="On Hold">On Hold</SelectItem>
          <SelectItem value="Featured">Featured</SelectItem>
          <SelectItem value="Custom">Custom</SelectItem>
          <SelectItem value="Inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterByStatus;
