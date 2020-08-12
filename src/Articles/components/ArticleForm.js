import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as articleActions from "../acticles.actions";
import serverAPi from "../../common/utils/apiUrl";

import * as articleReducer from "../articles.reducers";

function ArticleForm(props) {
  const { newArticleFields, tagListArray, update, id } = props;
  const dispatch = useDispatch();
  const [articleFields, setArticleFields] = useState(newArticleFields);
  const [tagList, setTagList] = useState(tagListArray);
  const [tagInputField, setTagInputField] = useState("");

  const loadingFlag = useSelector(articleReducer.fetchSetLoadingFalg);

  /***
   * below function handle article input value
   */

  const handleArticleInputchange = e => {
    setArticleFields({ ...articleFields, [e.target.name]: e.target.value });
  };

  /**
   * Below function handle tag input field
   */

  const handleTagInputField = e => {
    setTagInputField(e.target.value);
  };

  /**
   * Below function is to create the tag
   */

  const checkingForEnter = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      setTagList([...tagList, tagInputField]);
      setTagInputField("");
    }
  };

  /**
   * Save article on database
   */

  const createArticle = e => {
    dispatch(articleActions.setLoadingFlag(true));
    if (!update) {
      let payload = {};
      let createArticleUrl = serverAPi.Articles.createArticles();
      let data = {};
      articleFields.tagList = tagList;
      data.article = articleFields;
      payload.url = createArticleUrl;
      payload.data = data;
      dispatch(articleActions.saveArticle(payload));
    } else {
      let payload = {};
      let createArticleUrl = serverAPi.Articles.updateArticle(id);
      let data = {};
      articleFields.tagList = tagList;
      data.article = articleFields;
      payload.url = createArticleUrl;
      payload.data = data;
      dispatch(articleActions.updateArticle(payload));
    }
  };

  return (
    <div className="article-form mt-3">
      <div className="form-group">
        <input
          type="text"
          className="form-control articleformInput"
          aria-describedby="emailHelp"
          placeholder="Article Title"
          name="title"
          value={articleFields.title}
          onChange={handleArticleInputchange}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          aria-describedby="emailHelp"
          placeholder="What's this article about?"
          name="description"
          value={articleFields.description}
          onChange={handleArticleInputchange}
        />
      </div>
      <div className="form-group">
        <textarea
          type="text"
          height="100"
          className="form-control articleformTextarea"
          placeholder="Write your article (in markdown)"
          name="body"
          value={articleFields.body}
          onChange={handleArticleInputchange}
        ></textarea>
      </div>

      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="enter tags"
          name="tagInputField"
          value={tagInputField}
          onChange={handleTagInputField}
          onKeyUp={checkingForEnter}
        />
      </div>
      <div className="mt-2">
        <ul className="tag-list">
          {tagList.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </div>
      <button
        className="btn btn-success article-button"
        onClick={createArticle}
        disabled={
          !(
            articleFields.title &&
            articleFields.description &&
            articleFields.body
          ) || loadingFlag
        }
      >
        {loadingFlag && (
          <>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          </>
        )}
        <span className="pl-2">Publish Article</span>
      </button>
    </div>
  );
}

export default ArticleForm;
