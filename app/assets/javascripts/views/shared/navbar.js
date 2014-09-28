App.Views.NavbarView = Backbone.CompositeView.extend({
  template: JST['shared/navbar'],
  
  events: {
    'submit #searchbar': 'search'
  },
  
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    
    return this;
  },
  
  search: function (event) {
    event.preventDefault();
    var query = $(event.currentTarget).serializeJSON().search.query;
    Backbone.history.navigate('#/search/' + query);
  },
  
});