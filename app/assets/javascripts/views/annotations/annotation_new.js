App.Views.AnnotationNew = Backbone.CompositeView.extend({
  template: JST['annotations/form'],
  
  events: {
    'submit .annotation-form': 'submit'
  },
  
  hide: function () {
    this.$el.hide();
  },
    
  render: function () {
    var renderedContent = this.template({ annotation: this.model });
    this.$el.html(renderedContent);
    
    return this;
  },
  
  reset: function () {
    this.$('.annotation-form-body').val('');
  },
  
  show: function () {
    this.$el.show();
    // debugger
    return this.render();
  },
  
  submit: function (event) {
    var ann = this;
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    this.model.set(formData.annotation);
    this.model.save({}, {
      success: function (resp) {
        ann.reset();
        ann.collection.add(ann);
      }
    });
  },
  
  switchAnnotation: function (annotation) {
    this.model = annotation;
    return this;
  },
  
  
});