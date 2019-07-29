import { Mongo } from 'meteor/mongo';

Meteor.methods({
    'comments.insert': function() {
        return Comments.insert({
            createdAt: new Date(),
            content: '',
            ownerId: this.userId,
        });
    },
    'comments.remove': function(comment) {
        return Comments.remove(comment);
    },
    'comments.update': function(comment, content) {
        return Comments.update(comment._id,{ $set: {content: content}});
    },
})

export const Comments = new Mongo.Collection('comments');