import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        <Toolbar onMenuButtonClick={this.handleMenuButtonClick} />
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
