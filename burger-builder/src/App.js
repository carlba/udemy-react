import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import { Auth } from './containers/Auth/Auth';
import { Logout } from './containers/Auth/Logout';
import * as actions from './store/actions';

class App extends Component {
  componentDidMount() {
    this.props.onCheckAuth();
  }
  render() {
    /**
     * These are the routes available for a user that is not logged in. If any other routes
     * are accessed the user will be redirected to /.
     */
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth}></Route>
        <Route path="/" exact component={BurgerBuilder}></Route>
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout}></Route>
          <Route path="/orders" component={Orders}></Route>
          <Route path="/logout" component={Logout}></Route>
          <Route path="/" exact component={BurgerBuilder}></Route>
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>
          <Switch>{routes}</Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuth: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
