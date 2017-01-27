import React, { Component } from 'react';
import './App.css';

class CommentBox extends Component {
  render() {
    const now = new Date();
    return( <div className="main-title">The time is: {now.toTimeString()} </div> );
  }
}
export default CommentBox;
