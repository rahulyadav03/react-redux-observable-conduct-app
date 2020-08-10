import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import serverApi from "../../common/utils/apiUrl";

import * as articleActions from "../acticles.actions";

function ArticleDescription(props) {
  const { history } = props;
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const id = props.match.params.id;

  let articleDescriptionUrl = serverApi.Articles.singleArticleDescription + id;

  let articleCommentUrl = serverApi.Articles.articleComments(id);

  const articleDescription = useSelector(
    state => state.article.articleDescription
  );

  const articleComments = useSelector(state => state.article.articleComments);

  let username = localStorage.getItem("username");
  /**
   * Effect to initiate fetching User data.
   */
  useEffect(() => {
    dispatch(articleActions.fetchArticleDescription(articleDescriptionUrl));
    dispatch(articleActions.fetchArticleComments(articleCommentUrl));
  }, [dispatch, articleDescriptionUrl]);

  const handleChange = () => {};

  const fnDeleteComment = commentId => {
    let deleteCommentUrl = serverApi.Articles.deleteComment(id, commentId);
    const UpdatedArticle = articleComments.comments.filter(data => {
      return data.id !== commentId;
    });
    let data = { comments: UpdatedArticle };

    dispatch(articleActions.setUpdateComment(data));
    dispatch(articleActions.deleteComment(deleteCommentUrl));
  };

  const fnPostComment = e => {
    e.preventDefault();
    let saveCommentUrl = serverApi.Articles.addComments(id);
    let data = {
      url: saveCommentUrl,
      commentData: { comment: { body: comment } }
    };
    dispatch(articleActions.saveComment(data));
    setComment("");
  };

  const deleteArticle = slug => {
    let deleteUrl = serverApi.Articles.deleteArticle(slug);

    dispatch(articleActions.deleteArticle(deleteUrl));
  };

  if (articleDescription) {
    return (
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 banner mt-2 article-decp">
        <h1 className="pt-2">{articleDescription.article.title}</h1>
        <div className="d-flex">
          <img
            src={
              articleDescription.article.image
                ? articleDescription.article.image
                : "https://static.productionready.io/images/smiley-cyrus.jpg"
            }
            className="feed-details-header-left-section-img"
            alt="description"
          />
          <div className="feed-details-header-left-section-title">
            <span className="spanTitle">
              {articleDescription.article.author.username}
            </span>
            <span>
              {new Date(articleDescription.article.createdAt).toDateString()}
            </span>
          </div>
          {username === articleDescription.article.author.username && (
            <>
              <button
                className="ml-3 btn btn-sm btn-outline-primary"
                onClick={() =>
                  history.push(`/editor/${articleDescription.article.slug}`)
                }
              >
                <i className="fa fa-pencil" aria-hidden="true"></i>
                Edit Article
              </button>
              <button
                className="ml-3 btn btn-sm btn-outline-danger"
                onClick={() => deleteArticle(articleDescription.article.slug)}
              >
                <i className="fa fa-trash" aria-hidden="true"></i>
                Delete Article
              </button>
            </>
          )}
        </div>

        <div className="mt-2">
          <p className="blackColor">{articleDescription.article.body}</p>

          <div>
            <ul className="tag-list">
              {articleDescription.article.tagList.map((value, index) => (
                <li key={index}>{value}</li>
              ))}
            </ul>
          </div>
        </div>
        <hr />

        <div className="mt-2">
          <div className="d-flex justify-content-center">
            <div className="feed-details-header">
              <div className="feed-details-header-left-section">
                <img
                  src="https://static.productionready.io/images/smiley-cyrus.jpg"
                  className="feed-details-header-left-section-img"
                  alt="description"
                />
                <div className="feed-details-header-left-section-title">
                  <span className="spanTitle">
                    {articleDescription.article.username}
                  </span>
                  <span>
                    {new Date(
                      articleDescription.article.createdAt
                    ).toDateString()}
                  </span>
                </div>
              </div>

              <div className="feed-details-header-right-section ml-5">
                <button className="btn btn-sm btn-outline-primary">
                  <i className="fa fa-heart" aria-hidden="true"></i>
                  <span className="pl-2">
                    Favourite Article (
                    {articleDescription.article.favoritesCount})
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center">
            <form onSubmit={fnPostComment}>
              <div className="form-group mt-3">
                <textarea
                  style={{ width: "40rem", height: "120px" }}
                  type="text"
                  className="form-control"
                  placeholder="Write comment"
                  name="comment"
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                ></textarea>
              </div>
              <div className="card-footer">
                <button
                  type="submit"
                  className="btn btn-success article-button"
                >
                  Post comment
                </button>
              </div>
            </form>
          </div>

          <div className="d-flex justify-content-center">
            <form>
              {articleComments &&
                articleComments.comments.map((comment, index) => (
                  <React.Fragment key={index}>
                    <div className="form-group mt-3">
                      <textarea
                        style={{ width: "40rem", height: "70px" }}
                        type="text"
                        className="form-control"
                        placeholder="Write comment"
                        value={comment.body}
                        onChange={() => handleChange()}
                      ></textarea>
                    </div>
                    <div className="card-footer">
                      <div className="d-flex justify-content-between">
                        <div className="d-flex">
                          <img
                            src={comment.author.image}
                            width="30"
                            height="30"
                          />
                          <p className="blackColor ml-2">
                            {comment.author.username}
                          </p>

                          <p className="blackColor ml-2">
                            {new Date(comment.createdAt).toDateString()}
                          </p>
                        </div>

                        <div
                          className="blackColor"
                          onClick={() => fnDeleteComment(comment.id)}
                        >
                          <i className="fa fa-trash-o" aria-hidden="true"></i>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default ArticleDescription;
