App.Collections.Articles = Backbone.Collection.extend({
  url: 'api/articles',
  model: App.Models.Article,
  
  initialize: function (models, options) {
    if ( options && options.submitter) {
      this.submitter = options.submitter;
    }
  },
  
  getOrFetch: function (id) {
    var articles = this;
    var article = this.get(id)
    if (!article) {
      article = new App.Models.Article({ id: id});
      article.fetch({
        success: function () { articles.add(article) }
      });
    } else {
      article.fetch();
    }
    return article;
  },
});