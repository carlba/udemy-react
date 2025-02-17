import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    isSideDrawerVisible: false
  };

  handleSideDrawerOpen = () => {
    this.setState({ isSideDrawerVisible: true });
  };

  handleSideDrawerClose = () => {
    this.setState({ isSideDrawerVisible: false });
  };

  handleMenuButtonClick = () => {
    this.setState(prevState => ({ isSideDrawerVisible: !prevState.isSideDrawerVisible }));
  };

  render() {
    return (
      <React.Fragment>
        <Toolbar
          isAuthenticated={this.props.isAuthenticated}
          onMenuButtonClick={this.handleMenuButtonClick}
        />
        <SideDrawer
          isAuthenticated={this.props.isAuthenticated}
          show={this.state.isSideDrawerVisible}
          onOpen={this.handleSideDrawerOpen}
          onClose={this.handleSideDrawerClose}
        />
        <main className={styles.Content}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = state => {
  return { isAuthenticated: !!state.auth.token };
};

export default connect(mapDispatchToProps)(Layout);

HOW

1. Goto FQDN/onboarding2. Enter a 10000 characters long company name

Expected Result

A length limitation should be enforced on the field.

Actual Result

It is possibly to enter a company name of any length.


