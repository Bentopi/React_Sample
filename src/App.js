import React, { Component } from 'react';
import './App.css';

class App extends React.Component {
  render() {
    const now = new Date();
    return(
      <div className="app-body">
        <div className="main-title">The time is: {now.toTimeString()} </div>
        <CommentBox />
      </div>
  );
  }

}
class CommentBox extends React.Component {
  render() {
    const comments = this._getComments();
    return(
      <div className="comment-box">
        <h2>Join the Discussion</h2>
        <div className="comment-count">
          {this._getCommentCount(comments.length)}
        </div>
        <div className="comment-list">
          {comments}
        </div>
      </div>
  );
  }

  // This function can be modified to accept JSON objects from an API
  _getComments() {
    const commentList = [
      { id:1, author: 'Morgan Freeman', body: 'This is super informative!' },
      { id:2, author:'Taylor Swift', body:'I have no idea what I\'m doing here.'},
      { id:3, author:'Brian Simmons', body:'I love Fairlife Chocolate Milk'}
    ];

    return commentList.map((comment) => {
      return (
        <Comment
          author={comment.author} body={comment.body} key={comment.id} />
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
}



class Comment extends React.Component {
  render() {
    return(
      <div className="comment">
        <p className="comment-author">{this.props.author}</p>
        <p className="comment-body">{this.props.body}</p>
        <div className="comment-footer">
          <a href="#" className="comment-delete">
            Delete Comment
          </a>
        </div>
      </div>

    );
  }
}

export default App;
