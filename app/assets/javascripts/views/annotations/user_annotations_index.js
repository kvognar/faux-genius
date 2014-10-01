App.Views.UserAnnotationsIndex = Backbone.CompositeView.extend({
  template: JST['annotations/user_annotations_index'],
  // className: 'user-annotations-list',
  // tagName: 'ul',
  
  initialize: function () {
    this.listenTo(this.collection, 'add', this.addAnnotationSubview);
  },
  
  addAnnotationSubview: function (annotation) {
    var subview = new App.Views.UserAnnotationShow({
      model: annotation,
      author: this.collection.author
    });
    this.addSubview('.user-annotations-list', subview);
  },
  
  render: function () {
    var renderedContent = this.template({ annotations: this.collection });
    this.$el.html(renderedContent);
    this.attachSubviews();
    // debugger
    return this;
  }
  
})