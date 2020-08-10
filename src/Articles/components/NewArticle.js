import React from "react";
import ArticleForm from "./ArticleForm";

function NewArticle(props) {
  let newArticleFields = {
    title: "",
    description: "",
    body: ""
  };
  let tagListArray = [];
  return (
    <ArticleForm
      newArticleFields={newArticleFields}
      tagListArray={tagListArray}
      update={false}
      {...props}
    />
  );
}

export default NewArticle;
