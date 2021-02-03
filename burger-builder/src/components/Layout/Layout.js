import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    isSideDrawerVisible: true
  };

  handleSideDrawerClose = () => {
    this.setState({ isSideDrawerVisible: false });
  };

  handleSideDrawerOpen = () => {
    this.setState({ isSideDrawerVisible: false });
  };

  render() {
    return (
      <React.Fragment>
        <Toolbar />
        <SideDrawer
          show={this.state.isSideDrawerVisible}
          onOpen={this.handleSideDrawerOpen}
          onClose={this.handleSideDrawerClose}
        />
        <main className={styles.Content}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}

export default Layout;
