App.Views.UserSuggestionsIndex = Backbone.CompositeView.extend({
  template: JST['suggestions/user_suggestions_index'],
  
  initialize: function (options) {
    this.listenTo(this.collection.author, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addSuggestionView);
  },
  
  addSuggestionView: function (suggestion) {
    var suggestionView = new App.Views.SuggestionShow({
      model: suggestion
    });
    this.addSubview('.user-suggestions', suggestionView);
  },
  
  render: function () {
    var renderedContent = this.template({ 
      suggestions: this.collection
     });
    this.$el.html(renderedContent);
    this.attachSubviews();
    
    return this;
  }
})