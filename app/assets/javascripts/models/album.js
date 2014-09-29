App.Models.Album = Backbone.Model.extend({
  urlRoot: 'api/albums',
  
  articles: function () {
    if (!this._articles) {
      this._articles = new App.Collections.Articles({
        album: this
      });
    }
    return this._articles;
  },
  
  
  parse: function (options) {
    if (options.artist) {
      this.artist = new App.Models.Artist(options.artist);
      delete options.artist;
    }
    if (options.articles) {
      this.articles().set(options.articles);
      delete options.articles;
    }
    return options;
  }
})