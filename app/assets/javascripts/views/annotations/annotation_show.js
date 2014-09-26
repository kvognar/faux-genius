App.Views.AnnotationShow = Backbone.CompositeView.extend({
  template: JST['annotations/show'],
  
  initialize: function () {
    this.suggestionsView = new App.Views.SuggestionIndex({
      collection: this.model.suggestions(),
    });
    this.addSubview('.suggestions-container', this.suggestionsView);
  },
  
  hide: function () {
    this.$el.hide();
  },
  
  render: function () {
    var renderedContent = this.template({ annotation: this.model });
    this.$el.html(renderedContent);
    this.attachSubviews();
    
    return this;
  },
  
  show: function () {
    this.$el.show();
  },
  
  switchAnnotation: function (annotation) {
    this.model = annotation;
    // debugger
    this.suggestionsView.switchSuggestions(this.model.suggestions());
    this.render();
  }
});