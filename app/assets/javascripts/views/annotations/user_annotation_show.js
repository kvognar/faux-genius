App.Views.UserAnnotationShow = Backbone.View.extend({
  template: JST['annotations/user_annotation_show'],
  formTemplate: JST['annotations/form'],
  
  className: 'user-annotation',
  tagName: 'li',
  
  events: {
    'click .edit-annotation-link': 'showAnnotationForm',
    'click .delete-annotation-link': 'deleteAnnotation',
    'click .annotation-cancel': 'showAnnotation',
    'click .add-image-link': 'addImage',
    'submit .annotation-form': 'updateAnnotation'
  },
  
  initialize: function (options) {
    this.author = options.author
    this.listenTo(this.model, 'sync', this.render);
  },
  
  addImage: function (event) {
    event.preventDefault();
    event.stopPropagation();
    var that = this;
    filepicker.pick(function (blob) {
      var imageMarkup = "![](" + blob.url + ")";
      that.$('textarea').val(that.$('textarea').val() + imageMarkup);
    });
  },
  
  
  deleteAnnotation: function (event) {
    event.preventDefault();
    event.stopPropagation();
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
      author: this.author,
      formTemplate: this.formTemplate
     });
    this.$el.html(renderedContent);
    return this;
  },
  
  showAnnotation: function (event) {
    event.preventDefault();
    event.stopPropagation();
    this.$('.annotation-form-container').hide();
    this.$('.annotation-display').show();
  },
  
  showAnnotationForm: function (event) {
    event.preventDefault();
    event.stopPropagation();
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