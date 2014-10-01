App.Views.UserAnnotationShow = Backbone.View.extend({
  template: JST['annotations/user_annotation_show'],
  formTemplate: JST['annotations/form'],
  
  className: 'user-annotation',
  tagName: 'li',
  
  events: {
    'click .edit-annotation-link': 'showAnnotationForm',
    'click .delete-annotation-link': 'deleteAnnotation',
    'click .annotation-cancel': 'showAnnotation',
    'submit .annotation-form': 'updateAnnotation'
  },
  
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },
  
  deleteAnnotation: function (event) {
    event.preventDefault();
    var reallyDoIt = confirm('Are you sure?')
    if (reallyDoIt) {
      event.preventDefault();
      this.model.destroy();
      this.remove();
    }
  },
  
  render: function () {
    var renderedContent = this.template({ 
      annotation: this.model,
      article: this.model.get('article'),
      formTemplate: this.formTemplate
     });
    this.$el.html(renderedContent);
    return this;
  },
  
  showAnnotation: function (event) {
    event.preventDefault();
    this.$('.annotation-form-container').hide();
    this.$('.annotation-display').show();
  },
  
  showAnnotationForm: function (event) {
    event.preventDefault();
    this.$('.annotation-form-container').show();
    this.$('.annotation-display').hide();
  },
  
  updateAnnotation: function (event) {
    event.preventDefault();
    var $formData = $(event.currentTarget).serializeJSON();
    this.model.save($formData.annotation, {
      success: this.render.bind(this)
    });
  },
  
});