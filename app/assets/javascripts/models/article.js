App.Models.Article = Backbone.Model.extend({
  urlRoot: 'api/articles',
  
  annotations: function () {
    if (this._annotations === undefined) {
      this._annotations = new App.Collections.Annotations([], {
        article: this
      });
    }
    return this._annotations;
  },
  
  suggestions: function () {
    if (this._suggestions === undefined) {
      this._suggestions = new App.Collections.Suggestions([], {
        suggestable: this,
        suggestableType: "Article"
      });
    }
    return this._suggestions;
  },
  
  parse: function (response) {
    var article = this;
    if (response.annotations) {
      _.each(response.annotations, function (annotation) {
        newAnnotation = new App.Models.Annotation(annotation);
        article.annotations().add(newAnnotation);
      });
      delete response.articles;
    }

    if (response.suggestions) {
      _.each(response.suggestions, function (suggestion) {
        newSuggestion = new App.Models.Suggestion(suggestion);
        article.suggestions().add(newSuggestion);
      });
      delete response.suggestions;
    }

    if (response.artist) {
      this.artist = new App.Models.Artist(response.artist);
      delete response.artist;
    }
    
    if (response.album) {
      this.album = new App.Models.Album(response.album);
      delete response.album;
    }
    
    return response;
  }
});