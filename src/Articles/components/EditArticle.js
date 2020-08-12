import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ArticleForm from "./ArticleForm";

function EditArticle() {
  const dispatch = useDispatch();
  // Selector to fetch all Routes
  const articleDescription = useSelector(
    state => state.article.articleDescription
  );

  if (articleDescription) {
    let newArticleFields = {
      title: articleDescription.article.title,
      description: articleDescription.article.description,
      body: articleDescription.article.body
    };
    let tagListArray = articleDescription.article.tagList;
    return (
      <ArticleForm
        newArticleFields={newArticleFields}
        tagListArray={tagListArray}
        update={true}
        id={articleDescription.article.slug}
      />
    );
  } else {
    return null;
  }
}

export default EditArticle;
