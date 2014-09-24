window.App = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    
    App.articles = new App.Collections.Articles();
    this.router = new App.Routers.ArticleRouter({
      $rootEl: $('#content')
    });
    
    Backbone.history.start();
  }
};

$(document).ready(function(){
  App.initialize();
  
  marked.setOptions({
    sanitize: false,
    breaks: false 
  });
});
