App.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['users/show'],
  id: 'user-show',
  
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.annotationsView = new App.Views.UserAnnotationsIndex({
      collection: this.model.annotations()
    });
    this.addSubview('#annotations', this.annotationsView)
    
    this.suggestionsView = new App.Views.UserSuggestionsIndex({
      collection: this.model.suggestions()
    });
    this.addSubview('#suggestions', this.suggestionsView);
  },
  
  render: function () {
    var renderedContent = this.template({ user: this.model });
    this.$el.html(renderedContent);
    this.attachSubviews();
    
    return this;
  },
  
  
});