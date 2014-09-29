App.Collections.Albums = Backbone.Collection.extend({
  url: 'api/albums',
  model: App.Models.Album,
  
  getOrFetch: function (id) {
    var albums = this;
    var album = this.get(id)
    if (!album) {
      album = new App.Models.Album({ id: id});
      album.fetch({
        success: function () { albums.add(album) }
      });
    } else {
      album.fetch();
    }
    return album;
  },
  
});