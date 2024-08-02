import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

const FilterByBikes = ({ misc13: value, setMisc13: setValue }) => {
  return (
    <div className="flex justify-end mt-3 mr-1">
      <Select value={value} onValueChange={(val) => setValue(val)}>
        <SelectTrigger className="w-fit bg-gray-100 h-8 font-semibold shadow-md focus:ring-0 focus:ring-offset-0 gap-2">
          <SelectValue placeholder="All Bikes" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Bikes</SelectItem>
          <SelectItem value="e-bikes">E-Bikes</SelectItem>
          <SelectItem value="bikes">Bikes</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterByBikes;
