import FilePage from "./FilePage";

export const metadata = {
  title: "Leon Cycle | Dealer Resources",
};

const page = ({ params: { folder_id } }) => {
  return <FilePage folder_id={folder_id} />;
};

export default page;
