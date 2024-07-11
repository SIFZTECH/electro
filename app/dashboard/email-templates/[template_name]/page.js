import EditorPage from "./EditorPage";

const page = ({ params }) => {
  return <EditorPage template_name={params.template_name} />;
};

export default page;
