App.Models.User = Backbone.Model.extend({
  urlRoot: 'api/users',
  
  articles: function () {
    if (!this._submittedArticles) {
      this._submittedArticles = new App.Collections.Articles([], {
        submitter: this
      });
    }
    return this._submittedArticles;
  },
  
  suggestions: function () {
    if (!this._suggestions) {
      this._suggestions = new App.Collections.Suggestions([], {
        author: this
      });
    }
    return this._suggestions;
  },
  
  annotations: function () {
    if (!this._annotations) {
      this._annotations = new App.Collections.Annotations([], {
        author: this
      });
    }
    return this._annotations;
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
    return options;
  }
});