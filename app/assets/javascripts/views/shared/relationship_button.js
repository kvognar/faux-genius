App.Views.RelationshipButton = Backbone.View.extend({
  template: JST['shared/relationship_button'],
  
  events: {
    'click .btn-unfollow': 'unfollow',
    'click .btn-follow': 'follow'
  },
  
  initialize: function (options) {
    this.listenTo(this.collection.followed, 'sync', this.render);
  },
  
  follow: function () {
    this.collection.create({
      followed_id: this.collection.followed.id,
      followed_type: this.collection.followedType
    }, {
      success: this.render.bind(this)
    });
  },
  
  
  unfollow: function () {
    this.currentFollowing().destroy({
      success: function () {
        this._currentFollowing = null;
        this.render();
      }.bind(this)
    })
  },
  
  
  render: function () {
    var renderedContent = this.template({ relationship: this.currentFollowing() });
    this.$el.html(renderedContent);
    this.setHover();
    return this;
  },
  
  setHover: function () {
    this.$('.btn-unfollow').hover(
      function (event) { $(event.currentTarget).text('Unfollow!'); },
      function (event) { $(event.currentTarget).text('Following'); }
    )
  },
  
  currentFollowing: function () {
    if (!this._currentFollowing) {
      this._currentFollowing = this.collection.find(function (model) {
        return model.get('follower_id') === App.user.id;
      });
    }
    return this._currentFollowing;
  }
});