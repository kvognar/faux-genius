App.Views.AnnotationNew = Backbone.CompositeView.extend({
  template: JST['annotations/form'],
  
  events: {
    'submit .annotation-form': 'submit'
  },
  
  submit: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    this.model.set(formData.annotation);
    this.model.save({}, {
      success: function (resp) {
        console.log(resp);
      }
    });
  },
  
  render: function () {
    var renderedContent = this.template({ annotation: this.model });
    this.$el.html(renderedContent);
    
    return this;
  }
  
});