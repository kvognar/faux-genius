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
    $('.annotation-container').css('right', '10px');
    $('.annotation-container').css('opacity', '0');
    $('.annotation-container').animate({
      opacity: 1,
      right: 0
    }, 100);
    
  },
  
  switchAnnotation: function (annotation) {
    this.model = annotation;
    this.suggestionsView.switchSuggestions(this.model.suggestions());
    this.render();
  }
});