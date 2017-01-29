import React, { Component } from 'react';
import './App.css';


class CommentBox extends React.Component {
  constructor() {
    super();
    this.state = {
      hideComments: false,
      comments: [
        { id:1, author: 'Morgan Freeman', body: 'This is super informative!' },
        { id:2, author:'Taylor Swift', body:'I have no idea what I\'m doing here.'},
        { id:3, author:'Brian Simmons', body:'I love Fairlife Chocolate Milk'}
      ]
    };
  }

  render() {
    const comments = this._getComments();

    let commentNodes;

    if (!this.state.hideComments) {
      commentNodes = <div className='comment-list'>{comments}</div>;
    }

    let buttonText = 'Hide Comments'
    if (this.state.hideComments) {
      buttonText = 'Show Comments';
    }

    return(
      <div className='comment-box'>

        <h2>Join the Discussion</h2>

        <CommentForm addComment={this._addComment.bind(this)} />

        <div className='comment-count'>
          {this._getCommentCount(comments.length)}
        </div>

        <button onClick={this._toggleComments.bind(this)}>{buttonText}</button>

        {commentNodes}
      </div>
  );
  }

  _getComments() {
    return this.state.comments.map((comment) => {
      return (
          <Comment
            id={comment.id}
            author={comment.author}
            body={comment.body}
            onDelete={this._deleteComment.bind(this)}
            key={comment.id} />
        );
    });
  }

  _getCommentCount(commentCount) {
    if (commentCount === 0) {
      return 'No comments yet, be the first!';
    } else if (commentCount === 1) {
      return '1 comment';
    } else {
      return `${commentCount} comments`
    }
  }

  _toggleComments() {
    this.setState({
      hideComments: !this.state.hideComments
    });
  }

  _addComment(author, body) {
    const comment = {
      id: this.state.comments.length +1,
      author,
      body
    };
    this.setState({ comments: this.state.comments.concat([comment]) });
  }

  _deleteComment(commentId) {
    const comments = this.state.comments.filter(
      comment => comment.id !== commentId);

    this.setState({ comments });
    }

  }

class Comment extends React.Component {
  render() {
    return(
      <div className='comment'>
        <p className='comment-author'>{this.props.author}</p>
        <p className='comment-body'>{this.props.body}</p>
        <div className='comment-footer'>
          <a href='#' className='comment-delete' onClick={this._handleDelete.bind(this)}>
            Delete Comment
          </a>
        </div>
      </div>
    );
  }
  _handleDelete(event){
    event.preventDefault();
    this.props.onDelete(this.props.id);

  }
}

class CommentForm extends React.Component {
  render() {
    return (
      <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
        <div className="comment-fields">
          <input placeholder="Name:" ref={(input) => this._author = input}/>
          <textarea placeholder="Comment:" ref={(textarea) => this._body = textarea}>
          </textarea>
        </div>
        <div className="comment-submit">
          <button type="submit">
            Post comment
          </button>
        </div>
      </form>
    );
  }
  _handleSubmit(event) {
    event.preventDefault();
    let author = this._author;
    let body = this._body;

    this.props.addComment(author.value, body.value);
  }
}

export default CommentBox;
