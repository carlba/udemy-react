import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
  state = { post: null };
  async componentDidUpdate() {
    if (this.props.id) {
      if (!this.state.post || (this.state.post && this.state.post.id !== this.props.id)) {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${this.props.id}`
        );
        this.setState({ post: response.data });
      }
    }
  }
  render() {
    let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
    if (this.props.id) {
      post = <p style={{ textAlign: 'center' }}>Loading...</p>;
    }

    if (this.state.post) {
      post = (
        <div className="FullPost">
          <h1>{this.state.post.title}</h1>
          <p>{this.state.post.body}</p>
          <div className="Edit">
            <button className="Delete">Delete</button>
          </div>
        </div>
      );
    }
    return post;
  }
}

FullPost.propTypes = {
  id: PropTypes.number
};

export default FullPost;
