import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/markdown/markdown';
import { Meteor } from 'meteor/meteor';
import {Link} from 'react-router';
import { browserHistory} from 'react-router'



class BinsEditor extends Component {


    onEditorChange() {

        const title = this.refs.title.value;
        const content = this.refs.content.value;
        Meteor.call('bins.update_title', this.props.bin, title);
        Meteor.call('bins.update', this.props.bin, content);
        Meteor.call('bins.update_date', this.props.bin);
        browserHistory.push('/');
        // this.props.history.push('/dashboard');
        // alert('The Post has been successfully updated');
    };
    onCancelChange() {
        browserHistory.push('/')
    }
    render() {
        return(
            <div className="col-xs-8 mt-5">
                <h4>Write title here</h4>
                <input ref="title" className="form-control" defaultValue={this.props.bin.title}/>
                <h4>Write Your Post here</h4>
                <textarea ref="content" rows="10" className="form-control" defaultValue={this.props.bin.content}></textarea>
                 <div className="btn-container">
                    <button onClick={this.onEditorChange.bind(this)}  className="save btn btn-success">Save</button>
                    
                    <button onClick ={this.onCancelChange.bind(this)} className="cancel btn btn-secondary">Cancel</button>
                </div>
            </div>
        );
    }
}
export default BinsEditor;