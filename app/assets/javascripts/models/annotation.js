App.Models.Annotation = Backbone.Model.extend({
  urlRoot: 'api/annotations',
  
  initialize: function(options) {
    var that = this;
    if (options.suggestions) {
      _.each(options.suggestions, function (suggestion) {
        newSuggestion = new App.Models.Suggestion(suggestion);
        that.suggestions().add(newSuggestion);
      });
      delete options.suggestions;
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
  
  // parse: function (options) {
  //   debugger
  // },
  
});