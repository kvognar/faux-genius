App.Models.User = Backbone.Model.extend({
  urlRoot: 'api/users',
  
  annotations: function () {
    if (!this._annotations) {
      this._annotations = new App.Collections.Annotations([], {
        author: this
      });
    }
    return this._annotations;
  },
  
  articles: function () {
    if (!this._submittedArticles) {
      this._submittedArticles = new App.Collections.Articles([], {
        submitter: this
      });
    }
    return this._submittedArticles;
  },
  
  followings: function () {
    if (!this._followings) {
      this._followings = new App.Collections.Followings([], {
        followed: this,
        followedType: "User"
      });
    }
    return this._followings;
  },
  
  suggestions: function () {
    if (!this._suggestions) {
      this._suggestions = new App.Collections.Suggestions([], {
        author: this
      });
    }
    return this._suggestions;
  },
  
  
  
  
  parse: function (options) {
    if (options.articles) {
      this.articles().set(options.articles);
      delete options.articles;
    }
    if (options.suggestions) {
      this.suggestions().set(options.suggestions);
      delete options.suggestions;
    }
    if (options.annotations) {
      this.annotations().set(options.annotations);
      delete options.annotations;
    }
    
    if (options.followings) {
      this.followings().set(options.followings);
      delete options.followings;
    }
    return options;
  }
});