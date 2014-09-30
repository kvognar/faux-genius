App.Collections.Followings = Backbone.Collection.extend({
  url: 'api/relationships',
  model: App.Models.Relationship,
  
  initialize: function (models, options) {
    this.followed = options.followed;
    this.followedType = options.followedType;
  },
  
});