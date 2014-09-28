App.Models.SearchResult = Backbone.Model.extend({
  urlRoot: function () {
    return 'api/search/' + this.query;
  },
  
  initialize: function (options) {
    this.query = options.query;
  }
});