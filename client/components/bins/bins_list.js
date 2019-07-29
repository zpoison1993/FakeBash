import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Bins } from '../../../imports/collections/bins';
import { Meteor } from 'meteor/meteor';
import {Link} from 'react-router'

class BinsList extends Component {

    onBinRemove(bin) {
        Meteor.call('bins.remove',bin)
    };
    onBinLike(bin) {
        Meteor.call('bins.like',bin)
    };
    onBinDislike(bin) {
        Meteor.call('bins.dislike',bin)
    };


    renderList() {
        return this.props.bins.map(bin => {
            const url = `/bins/${bin._id}`;
                return(
                   <li className="list-group-item"  key={bin._id}>
                      {/* <Link to={url}> Bin {bin._id}</Link> */}
                      <div className='description-container'>
                        <h4 > {bin.title}</h4>
                        <p>{bin.content}</p>
                        <span className="time-created label label-default">{new Date(bin.createdAt).toDateString()} at {new Date(bin.createdAt).toTimeString().split(' ')[0]}</span>
                        <div className="btn-container list">
                             <button onClick={() => this.onBinLike(bin)} className=" btn btn-success">Like</button>
                             <span>{bin.likes - bin.dislikes}</span>
                            <button onClick={() => this.onBinDislike(bin)}  className=" btn btn-danger">Dislike</button>
                        </div>
                       
                      </div>
                      
                       <div className="pull-right">
                            <button className=" btn btn-default"><Link to={url}>Edit</Link></button>
                           <button className="btn btn-danger" onClick={() => this.onBinRemove(bin)}>Remove</button>
                       </div>
                   </li> 
                );
            })
    }

    render() {
        
        return(
           <ul className="list-group">
               <div className="btn-container list sort">
                    <h3>Сортировать по:</h3> 
                    <button  className=" btn">По времени создания</button>
                    <button  className=" btn">По рейтингу</button>
               </div>
               {this.renderList()}
           </ul>
        );
    }
}

export default createContainer(() => {
    Meteor.subscribe('bins');
    Meteor.subscribe('sharedBins');
    return { bins: Bins.find({}).fetch() };
},BinsList)