import { Meteor } from 'meteor/meteor';
import { Bins } from '../imports/collections/bins';
// import { Comments } from '../imports/collections/comments';

Meteor.startup(() => {
  
  Meteor.publish('bins', function(key) {
    // const date = Date.parse(createdAt);
    if(key==='date') {
      return Bins.find({ownerId: this.userId},{sort: {createdAt: -1}});
    } else if (key==='rate') {
      return Bins.find({ownerId: this.userId},{sort: {rating: -1}});
    } else {
      return Bins.find({ownerId: this.userId});
    }

    
  });
  // Meteor.publish('comments', function() {
  //   return Comments.find({ownerId: this.userId});
  // });


  Meteor.publish('sharedBins', function() {
    const user = Meteor.users.findOne(this.userId);
    if(!user) {return;}
    const email = user.emails[0].address;

    return Bins.find({
      sharedWith: { $elemMatch: { $eq: email}}
    });
    
  })
});
