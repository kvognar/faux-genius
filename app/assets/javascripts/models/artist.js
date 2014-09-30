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
  
  followings: function () {
    if (!this._followings) {
      this._followings = new App.Collections.Followings([], {
        followed: this,
        followedType: "Artist"
      });
    }
    return this._followings;
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
    
    if (options.followings) {
      artist.followings().set(options.followings);
      delete options.followings;
    }
    return options;
  }
  
})