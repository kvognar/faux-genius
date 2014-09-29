App.Models.Artist = Backbone.Model.extend({
  urlRoot: 'api/artists',
  
  articles: function () {
    if (!this._articles) {
      this._articles = new App.Collections.Articles({
        artist: this
      });
    }
    return this._articles;
  },
  
  albums: function () {
    if (!this._albums) {
      this._albums = new App.Collections.Albums({
        artist: this
      });
    }
    return this._albums;
  },
  
  parse: function (options) {
    var artist = this;
    if (options.articles) {
      artist.articles().set(options.articles);
      delete options.articles;
    }
    
    if (options.albums) {
      artist.albums().set(options.albums);
      delete options.albums;
    }
    return options;
  }
  
})