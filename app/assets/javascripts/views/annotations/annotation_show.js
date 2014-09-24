App.Views.AnnotationShow = Backbone.CompositeView.extend({
  template: JST['annotations/show'],
  
  
  hide: function () {
    this.$el.hide();
  },
  
  render: function () {
    var renderedContent = this.template({ annotation: this.model });
    this.$el.html(renderedContent);
    
    return this;
  },
  
  show: function () {
    this.$el.show();
  },
  
  switchAnnotation: function (annotation) {
    this.model = annotation;
    this.render();
  }
});