import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Bins } from '../../../imports/collections/bins';
import { Meteor } from 'meteor/meteor';
import {Link} from 'react-router'
import { browserHistory} from 'react-router'

class BinsListR extends Component {

    onBinRemove(bin) {
        Meteor.call('bins.remove',bin)
    };
    onBinLike(bin) {
        Meteor.call('bins.like',bin);
      

    };
    onBinDislike(bin) {
        Meteor.call('bins.dislike',bin);
       

    };
    ratingUpdate(bin) {
        Meteor.call('bins.rating',bin,bin.likes,bin.dislikes);
        return bin.rating;
    };
    onCommentsShow(bin) {
        browserHistory.push(`/bins/${bin._id}/comments`);
    };
    onSortBtn(key) {
        console.log(key);
        if(key==='date'){
            // browserHistory.push('/')
            document.location.replace('/')
        }
        else if(key==='rate') {
            // browserHistory.push('/r')
            document.location.replace('/r')
        }
        
        return key
    };
    


    renderList() {
        return this.props.bins.map(bin => {
            const url = `/bins/${bin._id}`;
            const url_comments = `/bins/${bin._id}/comments`;
                return(
                   <li className="list-group-item"  key={bin._id}>
                      {/* <Link to={url}> Bin {bin._id}</Link> */}
                      <div className='description-container'>
                        <h4 > {bin.title}</h4>
                        <p>{bin.content}</p>
                        <div className="time-container">
                            <span className="time-created label label-default">{new Date(bin.createdAt).toDateString()} at {new Date(bin.createdAt).toTimeString().split(' ')[0]}</span>
                        </div>
                        <div className="btn-container list">
                            <button onClick={() => this.onBinLike(bin)} className=" btn btn-success">
                                <span className="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span> Like
                            </button>
                            {/* <span>{bin.likes - bin.dislikes}</span> */}
                            <span>{this.ratingUpdate(bin)}</span>
                            <button onClick={() => this.onBinDislike(bin)}  className=" btn btn-danger">
                                <span className="glyphicon glyphicon-thumbs-down" aria-hidden="true"></span> Dislike
                            </button>
                        </div>
                       
                      </div>
                      <div className="pull-left">
                            <button className=" btn btn-default">
                            <span className="glyphicon glyphicon-comment" aria-hidden="true"></span> <Link to={url_comments}>Comments</Link> 
                                
                            </button>
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
               <h2>Welcome to FakeBash.im</h2>
               <div className="btn-container list sort">
                    <h3>Sort By:</h3> 
                    <button onClick={()=> this.onSortBtn('date') }  className=" btn"> Date</button>
                    <button onClick={()=> this.onSortBtn('rate') }  className=" btn">Rating</button>
               </div>
               {this.renderList()}
           </ul>
        );
    }
}


export default createContainer(() => {
    Meteor.subscribe('bins','rate');
    Meteor.subscribe('sharedBins');
    return { bins: Bins.find().fetch() };
},BinsListR)