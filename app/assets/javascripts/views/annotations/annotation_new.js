App.Views.AnnotationNew = Backbone.CompositeView.extend({
  template: JST['annotations/form'],
  
  events: {
    'submit .annotation-form': 'submit',
    'click .add-image-link': 'addImage',
  },
  
  initialize: function () { this.collection.trigger('create'); },
  
  addImage: function (event) {
    event.preventDefault();
    event.stopPropagation();
    var that = this;
    filepicker.pick(function (blob) {
      var imageMarkup = "![](" + blob.url + ")";
      that.$('textarea').val(that.$('textarea').val() + imageMarkup);
    });
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