App.Views.AlbumShow = Backbone.View.extend({
  template: JST['albums/show'],
  id: 'album-show',
  
  events: {
    'click .filepicker-button': 'promptFilepicker'
  },
  
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },
  
  promptFilepicker: function (event) {
    event.preventDefault();
    var that = this;
    filepicker.pick({
      mimetype: 'image/*',
      service: 'COMPUTER'
    },
      function (blob) {
      that.model.save({ 'image_url': blob.url }, {
        success: function () {
          that.render();
        }
      }); 
    });
  },
  
  render: function () {
    var renderedContent = this.template({ album: this.model });
    this.$el.html(renderedContent);
    
    return this;
  }
});