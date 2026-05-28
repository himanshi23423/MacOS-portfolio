import PostmanResponseViewer from "../components/PostmanResponseViewer";

const PostmanResponseSection = ({ loading, response }) => (
  <PostmanResponseViewer loading={loading} response={response} />
);

export default PostmanResponseSection;
