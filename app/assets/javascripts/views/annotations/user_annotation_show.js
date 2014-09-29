App.Views.UserAnnotationShow = Backbone.View.extend({
  template: JST['annotations/user_annotation_show'],
  className: 'user-annotation',
  tagName: 'li',
  
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },
  
  render: function () {
    var renderedContent = this.template({ 
      annotation: this.model,
      article: this.model.get('article'),
     });
    this.$el.html(renderedContent);
    return this;
  }
  
})