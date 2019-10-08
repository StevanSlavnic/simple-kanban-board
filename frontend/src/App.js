import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/indexActions";
import * as container from "./containers/indexContainers";

import Layout from "./components/Layout/Layout";
import "./App.scss";

class App extends React.PureComponent {

  render() {

    const loadingApp = this.props.loadingApp;


    // public routes
    let publicRoutes = [];

    // exclusively public routes

      publicRoutes.push(
          // { path: "/register", component: container.SignUp },
          // {
          //   path: "/auth",
          //   exact: true,
          //   component: container.Auth
          // },

          { path: "/", exact: true, component: container.HomePage }
      );


    let routes = [...publicRoutes];

    let redirection = <Redirect to={"/"} />;

    const appMarkup = (
        <Layout>
          <Switch>
            {/* List all the routes user is able to access to */}
            {routes.map((route, index) => (
                <Route
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                    key={index}
                />
            ))}

            {/* Redirect if some path is not undefined */}
            {redirection}
          </Switch>
        </Layout>
    );

    // console.log(this.props);
    return (
        // @TODO h1 loader is just a placeholder
        <React.Fragment>
          {loadingApp ? (
              <h1 style={{ padding: "20px" }}>Loading...</h1>
          ) : (
              appMarkup
          )}
        </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
   
  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(App)
);
