import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
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

import "./app/App.css";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router history={history}>
          <Header />
          <Switch>
            <Route exact path={ROUTES.HOME} component={Main} />
            <Route path={ROUTES.LOGIN} component={Signin} />
            <Route path={ROUTES.REGISTER} component={Signup} />
            <Route exact path={ROUTES.EDITOR} component={NewArticle} />
            <Route exact path={ROUTES.EDITARTICLE} component={EditArticle} />
            <Route
              path={ROUTES.ARTICLE_DESCRIPTION}
              component={ArticleDescription}
            />
            <Route path="/:id" component={ListArticle} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
