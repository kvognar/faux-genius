App.Views.AnnotationShow = Backbone.CompositeView.extend({
  template: JST['annotations/show'],
  
  initialize: function () {
    this.suggestionsView = new App.Views.SuggestionIndex({
      collection: this.model.suggestions(),
    });
    this.addSubview('.suggestions-container', this.suggestionsView);
    this.$container = $('.annotation-container');
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
    this.$container.css('right', '12px');
    this.$container.css('opacity', '0');
    this.$container.animate({
      opacity: 1,
      right: 0
    }, 150);
    
  },
  
  switchAnnotation: function (annotation) {
    this.model = annotation;
    this.suggestionsView.switchSuggestions(this.model.suggestions());
    this.render();
  }
});