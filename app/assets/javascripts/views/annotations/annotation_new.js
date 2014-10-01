App.Views.AnnotationNew = Backbone.CompositeView.extend({
  template: JST['annotations/form'],
  
  events: {
    'submit .annotation-form': 'submit'
  },
  
  initialize: function () { this.collection.trigger('create'); },
  
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
    return this.render();
  },
  
  submit: function (event) {
    var form = this;
    event.preventDefault();
    
    var formData = $(event.currentTarget).serializeJSON();
    form.model.set(formData.annotation);
    form.collection.create(this.model, {
      success: function (resp) {
        form.reset();
        form.collection.trigger('created', {
          annotation: form.model
        });
      },
      error: function (resp) {
        console.log(resp);
      },
      wait: true
    });
  },
  
  switchAnnotation: function (annotation) {
    this.model = annotation;
    return this;
  },
  
  
});