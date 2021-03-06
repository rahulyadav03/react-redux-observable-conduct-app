import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import serverApi from "../../common/utils/apiUrl";

import * as articleActions from "../acticles.actions";

import Pagination from "../../common/components/Pagination";

import Feed from "../../common/components/Feed";
import Loader from "../../common/components/Loader";

import * as articleReducer from "../articles.reducers";

function FavouriteArticles(props) {
  const { history } = props;
  const dispatch = useDispatch();
  const id = props.match.path.split("/")[1];
  let favouriteArticleUrl = serverApi.Articles.favouriteAuthor(id, 0);

  const userArticle = useSelector(state => state.article.userArticles);

  const setCurrentPage = useSelector(state => state.article.setCurrentPage);

  const loadingFlag = useSelector(articleReducer.fetchSetLoadingFalg);

  /**
   * Effect to initiate fetching tags.
   */
  useEffect(() => {
    dispatch(articleActions.setLoadingFlag(true));
    dispatch(articleActions.fetchAllAuthorArticles(favouriteArticleUrl));
  }, [dispatch, favouriteArticleUrl]);

  const setPagination = value => {
    dispatch(articleActions.setLoadingFlag(true));
    dispatch(articleActions.setCurrentPageValue(value));
    favouriteArticleUrl = serverApi.Articles.articlesAuthor(id, value);
    dispatch(articleActions.fetchAllAuthorArticles(favouriteArticleUrl));
  };

  const handleClick = data => {
    history.push("/article/" + data.slug);
  };

  /**
   * select favourite article
   */

  const fnFavourite = (e, data) => {
    e.stopPropagation();
    let favouriteUrl = serverApi.Articles.favourite(data.slug);
    dispatch(articleActions.setFavouriteArticle(favouriteUrl));
  };

  if (!loadingFlag && userArticle) {
    return (
      <>
        {userArticle.articles.length === 0 && (
          <h1 className="mt-2 titleColor">No articles to show</h1>
        )}
        {userArticle.articles.map((data, index) => (
          <Feed
            {...props}
            key={data.slug}
            data={data}
            handleClick={handleClick}
            fnFavourite={fnFavourite}
          />
        ))}
        <Pagination
          totalPaginationCount={userArticle.articlesCount}
          setPagination={setPagination}
          setCurrentPage={setCurrentPage}
        />
      </>
    );
  } else {
    return (
      <div className="mt-5">
        <Loader />
      </div>
    );
  }
}

export default FavouriteArticles;
