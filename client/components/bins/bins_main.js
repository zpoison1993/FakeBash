import React, { Component } from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Bins} from '../../../imports/collections/bins'
import { Meteor } from 'meteor/meteor';
import BinsEditor from './bins_editor';
import BinsViewer from './bins_viewer';
import BinsShare from'./bins_share';

class BinsMain extends Component {    
    render() {

        if ( !this.props.bin ) {return <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>}
        // console.log(this.props.params.binId);
        // console.log(this.props.bin);
        return(
            <div className="bins-main-container">
                
                <BinsEditor bin={this.props.bin}/>
                {/* <BinsViewer bin={this.props.bin}/> */}
                
              
                
                <BinsShare bin={this.props.bin} />
            </div>
        );
    }
}

export default createContainer((props) => {
    const {binId} = props.params;
    Meteor.subscribe('bins');
    Meteor.subscribe('sharedBins');
    return { bin: Bins.findOne(binId) };
},BinsMain);