App.Views.UserAnnotationsIndex = Backbone.CompositeView.extend({
  template: JST['annotations/user_annotations_index'],
  
  initialize: function () {
    this.listenTo(this.collection, 'add', this.addAnnotationSubview);
  },
  
  addAnnotationSubview: function (annotation) {
    var subview = new App.Views.AnnotationShow({
      model: annotation,
      collection: this.collection,
      standAlone: true
    });
    this.addSubview('.user-annotations-list', subview);
  },
  
  render: function () {
    var renderedContent = this.template({ annotations: this.collection });
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  }
  
})