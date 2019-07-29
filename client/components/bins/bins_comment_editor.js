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
        this.refs.comment.value = '';
    }
    renderCommentList() {
        if(!this.props.bin.comments) {return}
        else {
            return this.props.bin.comments.map((comment,index) => {
                return  <li ref={index} key = {comment}
                        className="list-group-item comment">
                        {comment}
                            <div className="pull-right">
                                <button onClick={() => this.handleLog(comment,index)} className="btn btn-danger">Remove</button>
                            </div>  
                        </li>
        })
        }
       
    };

    handleLog(comment,ind) {
        console.log(ind);
        Meteor.call('bins.remove_comment',this.props.bin,comment);

    }

    
    onCancelChange() {
        browserHistory.push('/')
    }
    render() {
        return(
            <div className="col-xs-8 mt-5">
                <h4>Write Your Comment here</h4>
                <textarea ref="comment" rows="10" className="form-control" placeholder="Let us know, what you think about it..."></textarea>
                 <div className="btn-container">
                    <button onClick={this.onCommentClick.bind(this)}  className="save btn btn-success">Save</button>
                    
                    <button onClick ={this.onCancelChange.bind(this)} className="cancel btn btn-secondary">Back</button>
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