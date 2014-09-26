App.Collections.Suggestions = Backbone.Collection.extend({
  url: 'api/suggestions',
  
  comparator: 'created_at',
  
  initialize: function (models, options) {
    this.suggestable = options.suggestable;
    this.suggestableType = options.suggestableType;
  },
  
  model: App.Models.Suggestion
});