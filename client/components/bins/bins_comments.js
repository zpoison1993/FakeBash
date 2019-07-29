import React, { Component } from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Bins} from '../../../imports/collections/bins'
import { Meteor } from 'meteor/meteor';
import BinsCommentEditor from './bins_comment_editor';
import BinsViewer from './bins_viewer';



class BinsComments extends Component {    
    render() {

        if ( !this.props.bin ) {return <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>}
        // console.log(this.props.params.binId);
        // console.log(this.props.bin);
        return(
            <div className="bins-comments-container">
                
                
                <BinsViewer bin={this.props.bin}/>

                <BinsCommentEditor bin={this.props.bin}/>
            
            </div>
        );
    }
}

export default createContainer((props) => {
    const {binId} = props.params;
    Meteor.subscribe('bins');
    Meteor.subscribe('comments');
    Meteor.subscribe('sharedBins');
    return { bin: Bins.findOne(binId) };
},BinsComments);