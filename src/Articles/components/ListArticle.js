import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Redirect } from "react-router-dom";
import Logo from "../../assets/smiley-cyrus.jpg";
import MyArticles from "./MyArticles";
import FavouriteArticles from "./FavouriteArticles";

import * as articleActions from "../acticles.actions";

import * as profileActions from "../../common/ProfileStore/profile.actions";

import serverAPi from "../../common/utils/apiUrl";

import Banner from "../../common/components/Banner";

function ListArticle(props) {
  const dispatch = useDispatch();
  const { id } = props.match.params;
  const [activeArticle, setActiveArticle] = useState("myArticle");

  let ProfileUrl = serverAPi.Profile.getProfile(id);

  const userInfo = useSelector(state => state.profile.userData);
  /**
   * Effect to initiate fetching User data.
   */
  useEffect(() => {
    dispatch(profileActions.fetchUserData(ProfileUrl));
  }, [dispatch]);

  const fnSetArticleName = articleName => {
    dispatch(articleActions.setCurrentPageValue(0));
    setActiveArticle(articleName);
  };

  return (
    <div>
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 artileBanner mt-2">
        {userInfo && userInfo.profile && (
          <Banner
            title={userInfo.profile.username ? userInfo.profile.username : null}
            url={userInfo.profile.image ? userInfo.profile.image : Logo}
            heading=""
          />
        )}

        <div className="d-flex mt-5">
          <Link to={`/${id}/myArticle`} className="disabled-link">
            <p
              className={activeArticle === "myArticle" ? "activeArticle" : null}
              onClick={() => fnSetArticleName("myArticle")}
            >
              My Articles
            </p>
          </Link>
          <Link to={`/${id}/myFavourite`} className="disabled-link">
            <p
              className={
                activeArticle === "favouriteArticle"
                  ? "activeArticle ml-2"
                  : "ml-2"
              }
              onClick={() => fnSetArticleName("favouriteArticle")}
            >
              Favourite Articles
            </p>
          </Link>
        </div>
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mt-3">
          {activeArticle === "myArticle" && (
            <>
              <Route path={`/${id}/myArticle`} component={MyArticles} />
              <Redirect from={`/${id}`} to={`/${id}/myArticle`} />
            </>
          )}
          {activeArticle === "favouriteArticle" && (
            <Route path={`/${id}/myFavourite`} component={FavouriteArticles} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ListArticle;
