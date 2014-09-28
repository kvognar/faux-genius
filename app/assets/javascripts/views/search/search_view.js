App.Views.SearchView = Backbone.View.extend({
  
  template: JST['search/view'],
  
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },
  
  id: 'search-results',
  
  render: function () {
    // debugger
    var renderedContent = this.template({ 
      results: this.model.get('results'),
      query: this.model.query
     });
    this.$el.html(renderedContent);
    
    return this;
  }
  
});