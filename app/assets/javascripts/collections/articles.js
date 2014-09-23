App.Collections.Articles = Backbone.Collection.extend({
  url: 'api/articles',
  model: App.Models.Article,
  
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