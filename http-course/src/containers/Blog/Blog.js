import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axiosInstance from '../../axios';

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    error: false
  };
  componentDidMount() {
    axiosInstance
      .get('/posts')
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => ({ ...post, author: 'Carl' }));
        this.setState({ posts: updatedPosts });
      })
      .catch(error => this.setState({ error: true }));
  }

  handlePostSelected = id => {
    this.setState({ selectedPostId: id });
  };

  render() {
    let posts = <p style={{ textAlign: 'center', color: 'red' }}>Something went wrong</p>;
    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return (
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            onSelect={() => this.handlePostSelected(post.id)}
          />
        );
      });
    }

    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost id={this.state.selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
