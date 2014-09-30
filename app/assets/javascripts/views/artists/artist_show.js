App.Views.ArtistShow = Backbone.CompositeView.extend({
  template: JST['artists/show'],
  
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    
    this.followButton = new App.Views.RelationshipButton({
      collection: this.model.followings()
    });
    this.addSubview('.follow-button-container', this.followButton);
  },
  
  id: 'artist-show',
  
  render: function () {
    var renderedContent = this.template({ artist: this.model });
    this.$el.html(renderedContent);
    this.attachSubviews();
    
    return this;
  }
});