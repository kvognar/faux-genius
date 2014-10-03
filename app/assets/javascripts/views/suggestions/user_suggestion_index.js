App.Views.UserSuggestionsIndex = Backbone.View.extend({
  template: JST['suggestions/user_suggestions_index'],
  
  initialize: function (options) {
    this.listenTo(this.collection.author, 'sync', this.render);
  },
  
  render: function () {
    var renderedContent = this.template({ 
      suggestions: this.collection
     });
    this.$el.html(renderedContent);
    
    return this;
  }
})