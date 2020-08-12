import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Banner from "../../common/components/Banner";
import PopularTag from "./PopularTag";
import GlobalFeed from "./GlobalFeed";
import Pagination from "../../common/components/Pagination";

import * as tagsActions from "../../common/tagsRedux/tags.actions";
import * as homeActions from "../home.actions";
import * as articleActions from "../../Articles/acticles.actions";
import serverAPi from "../../common/utils/apiUrl";

import * as homeReducer from "../home.reducers";
import * as popularReducer from "../../common/tagsRedux/tags.reducers";

/** Import toastify Library for showing success message */
import { toast } from "react-toastify";

function Main(props) {
  const { history } = props;
  const dispatch = useDispatch();

  const allTags = useSelector(popularReducer.fetchSetTagNameData);
  const allGlobalFeed = useSelector(homeReducer.fetchAllGlobalFeedData);
  const setCurrentPage = useSelector(homeReducer.fetchCurrentPageData);
  const setTagName = useSelector(homeReducer.fetchSetTagNameData);

  const loadingFlag = useSelector(homeReducer.fetchSetLoadingFalg);

  const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;

  let globalFeedUrl = serverAPi.Articles.all + limit(10, 0);

  /**
   * Effect to initiate fetching tags.
   */
  useEffect(() => {
    dispatch(homeActions.setLoadingFlag(true));
    dispatch(homeActions.setTagName(null));
    dispatch(tagsActions.fetchAllTags());
    dispatch(homeActions.fetchAllGlobalFeed(globalFeedUrl));
  }, [dispatch, globalFeedUrl]);

  /**
   *
   * @param {Function to go to all article of particular user} data
   */
  const handleClick = data => {
    if (localStorage.getItem("username")) {
      dispatch(articleActions.setCurrentPageValue(0));
      history.push(`/${data.author.username}`);
    } else {
      toast.error("Please Login first to see the article description pages.");
    }
  };

  const setPagination = value => {
    dispatch(homeActions.setLoadingFlag(true));
    dispatch(homeActions.setCurrentPageValue(value));
    let globalFeedUrl = serverAPi.Articles.all + limit(10, value);
    dispatch(homeActions.fetchAllGlobalFeed(globalFeedUrl));
  };

  /**
   *
   * @param {Function to set Tag Name to default and fetch global feed value}
   */

  const fnFetchGlobalFeedData = () => {
    dispatch(homeActions.setLoadingFlag(true));
    dispatch(homeActions.setCurrentPageValue(0));
    dispatch(homeActions.setTagName(null));
    dispatch(homeActions.fetchAllGlobalFeed(globalFeedUrl));
  };

  /**
   * Fetch Popular tags data
   */

  const fnFetchTagData = tagName => {
    dispatch(homeActions.setLoadingFlag(true));
    dispatch(homeActions.setCurrentPageValue(0));
    dispatch(homeActions.setTagName(tagName));
    let popularTagUrl = serverAPi.Articles.byTag + `${tagName}&` + limit(10, 0);
    dispatch(homeActions.fetchAllGlobalFeed(popularTagUrl));
  };

  /**
   * select favourite article
   */

  const fnFavourite = (e, data) => {
    e.stopPropagation();
    if (localStorage.getItem("username")) {
      let favouriteUrl = serverAPi.Articles.favourite(data.slug);
      dispatch(homeActions.setFavouriteArticle(favouriteUrl));
    } else {
      toast.error("Please Login first to see the article description pages.");
    }
  };

  return (
    <>
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 banner mt-2">
        <Banner
          title="A place to share your knowledge"
          url=""
          heading="Conduit"
        />
      </div>

      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mt-3">
        <div className="row">
          <GlobalFeed
            {...props}
            handleClick={handleClick}
            allGlobalFeed={allGlobalFeed}
            setTagName={setTagName}
            fnFetchGlobalFeedData={fnFetchGlobalFeedData}
            fnFavourite={fnFavourite}
            loadingFlag={loadingFlag}
          />
          <PopularTag allTags={allTags} fnFetchTagData={fnFetchTagData} />
        </div>
      </div>

      {!loadingFlag && allGlobalFeed && (
        <Pagination
          totalPaginationCount={allGlobalFeed.articlesCount}
          setPagination={setPagination}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
}

export default Main;
