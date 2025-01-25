import React, { Component, useEffect, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Logout } from './containers/Auth/Logout';
import * as actions from './store/actions';


const Checkout = React.lazy(()=> import('./containers/Checkout/Checkout'));

const Orders = React.lazy(()=> import('./containers/Orders/Orders'));

const Auth = React.lazy(()=> import('./containers/Auth/Auth'));


const App = props => {
  useEffect (()=> {
    props.onCheckAuth();
  }, [])
    /**
     * These are the routes available for a user that is not logged in. If any other routes
     * are accessed the user will be redirected to /.
     */
  let routes = (
    <Switch>
      <Route path="/auth" render ={()=> <Auth/>}/>
      <Route path="/" exact component={BurgerBuilder}></Route>
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={()=><Checkout/>}/>
        <Route path="/orders" render={()=><Orders/>}/>
        <Route path="/logout" render={Logout}/>
        <Route path="/auth" render ={()=> <Auth/>}/>
        <Route path="/" exact component={BurgerBuilder}/>
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading ...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
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
