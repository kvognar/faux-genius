App.Models.Suggestion = Backbone.Model.extend({
  urlRoot: 'api/suggestions',
  
  initialize: function (options) {
    this.author = new App.Models.User(options.author);
    delete options.author;
  },
  
});