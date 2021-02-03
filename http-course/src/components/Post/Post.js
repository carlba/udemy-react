import React from 'react';
import PropTypes from 'prop-types';

import './Post.css';

const Post = props => (
  <article className="Post">
    <h1>{props.title}</h1>
    <div className="Info">
      <div className="Author">Author</div>
    </div>
  </article>
);

Post.propTypes = {
  title: PropTypes.string
};

export default Post;
