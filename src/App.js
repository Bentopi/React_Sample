import React, { Component } from 'react';
import './App.scss';


class CommentBox extends React.Component {
  constructor() {
    super();
    this.state = {
      hideComments: false,
      comments: [
        { id:1, author: 'Morgan Freeman', body: 'This is super informative!' },
        { id:2, author:'Taylor Swift', body:'I have no idea what I\'m doing here.'},
        { id:3, author:'Batman', body:'I love Chocolate Milk'}
      ]
    };

  }

  render() {
    const comments = this._getComments();

    let commentNodes;

    if (!this.state.hideComments) {
      commentNodes = <div className='comment-list col-xs-12'>{comments}</div>;
    }

    let buttonText = 'Hide Comments'
    if (this.state.hideComments) {
      buttonText = 'Show Comments';
    }

    return(
      <div className='comment-box'>

        <h2 className='comment-box-title text-center'>{this._getCommentCount(comments.length)}</h2>

        <CommentForm addComment={this._addComment.bind(this)} />

        <div className='hide-button text-right col-xs-10 col-xs-offset-1'>
          <button className='btn btn-default' onClick={this._toggleComments.bind(this)}>{buttonText}</button>
        </div>

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
      return 'No comments yet, be the first one!';
    } else if (commentCount === 1) {
      return 'Only 1 comment so far, join in!';
    } else {
      return `${commentCount} comments so far, join in!`
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
      <div className='comment row'>
        <div className='avatar'></div>
        <div className='comment-right'>
          <div className='comment-top'>
            <strong>{this.props.author}</strong> said:
            <div id="delete-a" onClick={this._handleDelete.bind(this)}>
            Delete
            </div>
          </div>
          <div className='comment-bottom'>
            <p className='comment-body'>{this.props.body}</p>
            <hr/>
          </div>
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
      <form className="comment-form col-xs-10 col-xs-offset-1" onSubmit={this._handleSubmit.bind(this)}>
        <div className="comment-fields form-group col-xs-12">
          <input placeholder="Name:" className='form-control' ref={(input) => this._author = input}/>
          <textarea placeholder="Comment:" className='comment-textarea form-control' rows='3' ref={(textarea) => this._body = textarea}>
          </textarea>
        </div>
        <div className="comment-submit text-right col-xs-12">
          <button type="submit" className="btn btn-lg btn-default">
            Post Comment
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
