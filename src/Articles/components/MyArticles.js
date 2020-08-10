import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import serverApi from "../../common/utils/apiUrl";

import * as articleActions from "../acticles.actions";

import Pagination from "../../common/components/Pagination";

import Feed from "../../common/components/Feed";

function MyArticles(props) {
  const { history } = props;
  const dispatch = useDispatch();

  const id = props.match.path.split("/")[1];

  let AuthorUrl = serverApi.Articles.articlesAuthor(id, 0);

  const userArticle = useSelector(state => state.article.userArticles);

  const setCurrentPage = useSelector(state => state.article.setCurrentPage);

  /**
   * Effect to initiate fetching tags.
   */
  useEffect(() => {
    dispatch(articleActions.fetchAllAuthorArticles(AuthorUrl));
  }, [dispatch, AuthorUrl]);

  const handleClick = data => {
    history.push("/article/" + data.slug);
  };

  const setPagination = value => {
    dispatch(articleActions.setCurrentPageValue(value));
    AuthorUrl = serverApi.Articles.articlesAuthor(id, value);
    dispatch(articleActions.fetchAllAuthorArticles(AuthorUrl));
  };

  /**
   * select favourite article
   */

  const fnFavourite = (e, data) => {
    e.stopPropagation();
    let favouriteUrl = serverApi.Articles.favourite(data.slug);
    dispatch(articleActions.setFavouriteArticle(favouriteUrl));
  };

  if (userArticle) {
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
    return null;
  }
}

export default MyArticles;
