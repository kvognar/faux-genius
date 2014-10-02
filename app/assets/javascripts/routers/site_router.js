App.Routers.SiteRouter = Backbone.Router.extend({
  
  routes: {
    '': 'index',
    'search/:query': 'search',
    'articles/new': 'new',
    'articles/:id': 'show',
    'artists/:id': 'showArtist',
    'albums/:id': 'showAlbum',
    'users/:id': 'showUser',
  },
  
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.navbarView = new App.Views.NavbarView();
    $('.searchbar-container').html(this.navbarView.render().$el);
    if (App.user) {
      this.notificationsList = new App.Views.NotificationsList();
      // debugger
      $('ul.navbar-right').prepend(this.notificationsList.render().$el);
    }
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
  
  search: function(query) {
    var searchResult = new App.Models.SearchResult({
      query: query
    });
    searchResult.fetch({
      success: function (result) {
        
      }
    });
    var searchView = new App.Views.SearchView({ model: searchResult });
    this._swapView(searchView); 
  },
  
  show: function (id) {
    var article = App.articles.getOrFetch(id);
    var showView = new App.Views.ArticleShow({ model: article });
    this._swapView(showView);
    window.scrollTo(0, 0);
  },
  
  showAlbum: function (id) {
    var album = new App.Models.Album({ id: id });
    album.fetch();
    var albumView = new App.Views.AlbumShow({ model: album });
    this._swapView(albumView);
  },
  
  showArtist: function (id) {
    var artist = new App.Models.Artist({ id: id });
    artist.fetch();
    var artistView = new App.Views.ArtistShow({ model: artist });
    this._swapView(artistView);
  },
  
  showUser: function (id) {
    var user = new App.Models.User({ id: id });
    user.fetch();
    var userView = new App.Views.UserShow({ model: user });
    this._swapView(userView);
  },
  
  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    
    this.$rootEl.html(view.render().$el);
  }
  
});