import React, { Component } from 'react';

import Modal from '../../components/ui/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = { initialized: false, error: null };
    /**
     * We are using this `this.state.initialized` to handle the fact that these
     * interceptors will not get attached until the wrapped component has mounted.
     * see these questions for more info. https://kutt.it/56IflR.
     */
    componentDidMount() {
      axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      axios.interceptors.response.use(null, error => {
        this.setState({ error });
      });
      this.setState({ initialized: true });
    }

    handleModalClose = () => {
      this.setState({ error: null });
    };

    render() {
      const { initialized } = this.state;
      if (!initialized) return null;
      return (
        <React.Fragment>
          <Modal show={this.state.error} onModalClose={this.handleModalClose}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props}></WrappedComponent>;
        </React.Fragment>
      );
    }
  };
};

export default withErrorHandler;
