  window.App = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(options) {
    
    if (options.user) {
      App.user = new App.Models.User(options.user);
    }
    App.articles = new App.Collections.Articles();
    this.router = new App.Routers.ArticleRouter({
      $rootEl: $('#content')
    });
    
    Backbone.history.start();
  }
};

