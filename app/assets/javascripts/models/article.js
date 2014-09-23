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
  
  parse: function (response) {
    var article = this;
    if (response.annotations) {
      _.each(response.annotations, function (annotation) {
        newAnnotation = new App.Models.Annotation(annotation);
        article.annotations().add(newAnnotation);
      });
      delete response.articles;
    }
    return response;
  }
});