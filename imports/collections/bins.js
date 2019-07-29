import { Mongo } from 'meteor/mongo';

Meteor.methods({
    'bins.insert': function() {
        return Bins.insert({
            createdAt: new Date(),
            title:'',
            content: '',
            likes: 0,
            dislikes: 0,
            sharedWith: [],
            ownerId: this.userId,
            comments: []
        });
    },
    'bins.remove': function(bin) {
        return Bins.remove(bin);
    },
    'bins.update': function(bin, content) {
        return Bins.update(bin._id,{ $set: {content: content}});
    },
    'bins.update_title': function(bin, title) {
        return Bins.update(bin._id,{ $set: {title: title}});
    },
    'bins.update_date': function(bin) {
        return Bins.update(bin._id,{ $set: {createdAt:  new Date()}});
    },
    'bins.share': function (bin, email) {
        return Bins.update(bin._id, { $push: { sharedWith: email} });
    },
    'bins.comment': function (bin, comment) {
        return Bins.update(bin._id, { $push: { comments: comment} });
    },
    'bins.remove_comment': function (bin, comment) {
        return Bins.update(bin._id, { $pull: { comments: comment} });
    },
    'bins.like': function (bin) {
        return Bins.update(bin._id, { $inc: {likes: 1} });
    },
    'bins.dislike': function (bin) {
        return Bins.update(bin._id, { $inc: {dislikes: 1} });
    }
    

});

export const Bins = new Mongo.Collection('bins');





