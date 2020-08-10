import React, { Suspense } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { withErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import store from "./ReduxFiles/store";
import Header from "./Header/components/Header";
import history from "./common/utils/history";
import { ROUTES } from "./common/constants";

import Main from "./Home/components/Main";
import Signin from "./Authentication/component/Signin";
import Signup from "./Authentication/component/Signup";
import ListArticle from "./Articles/components/ListArticle";
import NewArticle from "./Articles/components/NewArticle";
import EditArticle from "./Articles/components/EditArticle";
import ArticleDescription from "./Articles/components/ArticleDescription";
import Loader from "./common/components/Loader";

import CustomeErrorBoundary from "./common/components/CustomeErrorBoundary";

import "./app/App.css";

/**
 * Wraps component with error boundary
 */
function wrapErrorBoundary(Component) {
  return withErrorBoundary(Component, {
    FallbackComponent: CustomeErrorBoundary
  });
}

const HomeWithErrorBoundary = wrapErrorBoundary(Main);
const SigninWithErrorBoundary = wrapErrorBoundary(Signin);
const SignupWithErrorBoundary = wrapErrorBoundary(Signup);
const NewArticleWithErrorBoundary = wrapErrorBoundary(NewArticle);
const EditArticleWithErrorBoundary = wrapErrorBoundary(EditArticle);
const ArticleDescriptionWithErrorBoundary = wrapErrorBoundary(
  ArticleDescription
);
const AListArticleWithErrorBoundary = wrapErrorBoundary(ListArticle);

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <div className="container">
        <Provider store={store}>
          <Router history={history}>
            <Header />
            <Switch>
              <Route
                exact
                path={ROUTES.HOME}
                component={HomeWithErrorBoundary}
              />
              <Route path={ROUTES.LOGIN} component={SigninWithErrorBoundary} />
              <Route
                path={ROUTES.REGISTER}
                component={SignupWithErrorBoundary}
              />
              <Route
                exact
                path={ROUTES.EDITOR}
                component={NewArticleWithErrorBoundary}
              />
              <Route
                exact
                path={ROUTES.EDITARTICLE}
                component={EditArticleWithErrorBoundary}
              />
              <Route
                path={ROUTES.ARTICLE_DESCRIPTION}
                component={ArticleDescriptionWithErrorBoundary}
              />
              <Route path="/:id" component={AListArticleWithErrorBoundary} />
            </Switch>
          </Router>
        </Provider>
      </div>
    </Suspense>
  );
}

export default App;
