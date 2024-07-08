import FilePage from "./FilePage";

export const metadata = {
  title: "Leon Cycle | Social Media Assets",
};

const page = ({ params: { folder_id } }) => {
  const filterId = Number(folder_id.at(-1));
  return <FilePage folder_id={filterId} />;
};

export default page;
