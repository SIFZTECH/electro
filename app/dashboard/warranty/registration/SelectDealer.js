import { useUsers } from "@/app/_features/users/useUsers";
import SelectUser from "@/app/components/ui/SearchAndSelect";

const SelectDealer = () => {
  const { data } = useUsers();

  return (
    <SelectUser
      data={data?.data}
      label="Purchase From"
      placeholder="Select Dealer"
      name="purchase_from"
    />
  );
};

export default SelectDealer;
