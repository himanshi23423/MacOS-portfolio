import PostmanRequestBuilder from "../components/PostmanRequestBuilder";

const PostmanRequestSection = ({
  method,
  setMethod,
  url,
  setUrl,
  handleSend,
  loading,
  activeTab,
  setActiveTab,
  reqBody,
  setReqBody,
}) => (
  <PostmanRequestBuilder
    method={method}
    setMethod={setMethod}
    url={url}
    setUrl={setUrl}
    handleSend={handleSend}
    loading={loading}
    activeTab={activeTab}
    setActiveTab={setActiveTab}
    reqBody={reqBody}
    setReqBody={setReqBody}
  />
);

export default PostmanRequestSection;
