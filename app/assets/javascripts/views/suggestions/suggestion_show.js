App.Views.SuggestionShow = Backbone.View.extend({
  template: JST['suggestions/show'],
  
  render: function () {
    var renderedContent = this.template({ 
      suggestion: this.model,
      subj: this.model.get('suggestable')
     });
    this.$el.html(renderedContent);
    
    return this;
  }
})