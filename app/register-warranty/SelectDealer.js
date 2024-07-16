import { useDealerUsers } from "@/app/_features/users/useUsers";
import SelectUser from "@/app/components/ui/SearchAndSelect";

const SelectDealer = ({ value, setDealer }) => {
  const { data } = useDealerUsers();

  return (
    <SelectUser
      data={data?.data?.data}
      label="Purchase From"
      name="purchase_from"
      value={value}
      setDealer={setDealer}
    />
  );
};

export default SelectDealer;
