App.Views.AlbumShow = Backbone.View.extend({
  template: JST['albums/show'],
  id: 'album-show',
  
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },
  
  render: function () {
    var renderedContent = this.template({ album: this.model });
    this.$el.html(renderedContent);
    
    return this;
  }
});