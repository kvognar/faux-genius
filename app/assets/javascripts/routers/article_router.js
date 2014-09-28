App.Routers.ArticleRouter = Backbone.Router.extend({
  
  routes: {
    '': 'index',
    'search': 'search',
    'articles/new': 'new',
    'articles/:id': 'show',

  },
  
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },
  
  index: function () {
    App.articles.fetch();
    var indexView = new App.Views.ArticleIndex({ collection: App.articles });
    this._swapView(indexView);
  },
  
  new: function () {
    var article = new App.Models.Article();
    var newView = new App.Views.ArticleNew({ model: article });
    this._swapView(newView);
  },
  
  search: function() {},
  
  show: function (id) {
    var article = App.articles.getOrFetch(id);
    var showView = new App.Views.ArticleShow({ model: article });
    this._swapView(showView);
  },
  
  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    
    this.$rootEl.html(view.render().$el);
  }
  
});