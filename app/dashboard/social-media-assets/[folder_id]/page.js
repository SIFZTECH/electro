import FilePage from "./FilePage";

export const metadata = {
  title: "Leon Cycle | Social Media Assets",
};

const page = ({ params: { folder_id } }) => {
  return <FilePage folder_id={folder_id} />;
};

export default page;
