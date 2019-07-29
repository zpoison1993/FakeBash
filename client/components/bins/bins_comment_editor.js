import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/markdown/markdown';
import { Meteor } from 'meteor/meteor';
import {Link} from 'react-router';
import { browserHistory} from 'react-router'



class BinsCommentsEditor extends Component {

    onCommentClick() {
        const comment = this.refs.comment.value;
        Meteor.call('bins.comment', this.props.bin, comment);
    }
    renderCommentList() {
        return this.props.bin.comments.map(comment => {
            return <li key = {comment}
            className="list-group-item comment">
                {comment}
            </li>
        })
    };
    
    onCancelChange() {
        browserHistory.push('/')
    }
    render() {
        return(
            <div className="col-xs-8 mt-5">
                <h4>Write Your Comment here</h4>
                <textarea ref="comment" rows="10" className="form-control" defaultValue="Let us know, what you think about it..."></textarea>
                 <div className="btn-container">
                    <button onClick={this.onCommentClick.bind(this)}  className="save btn btn-success">Save</button>
                    
                    <button onClick ={this.onCancelChange.bind(this)} className="cancel btn btn-secondary">Cancel</button>
                </div>
                <h4>
                    Comments to the post

                </h4>
                <ul className="list-group ">
                    {this.renderCommentList()}
                </ul>
            </div>
        );
    }
}
export default BinsCommentsEditor;