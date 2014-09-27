App.Models.Annotation = Backbone.Model.extend({
  urlRoot: 'api/annotations',
  
  initialize: function(options) {
    var that = this;
    if (options.suggestions) {
      _.each(options.suggestions, function (suggestion) {
        var newSuggestion = new App.Models.Suggestion(suggestion);
        that.suggestions().add(newSuggestion);
      });
      delete options.suggestions;
    }
    if (options.author) {
      this.author = new App.Models.User(options.author);
      delete options.author;
    }
  },
  
  suggestions: function () {
    if (this._suggestions === undefined) {
      // debugger
      this._suggestions = new App.Collections.Suggestions([], {
        suggestable: this,
        suggestableType: "Annotation"
      });
    }
    return this._suggestions;
  },
  
  parse: function (options) {
    if (options.author) {
      this.author = new App.Models.User(options.author);
      delete options.author;
    }
    return options;
  },
  
});