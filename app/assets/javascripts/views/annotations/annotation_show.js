App.Views.AnnotationShow = Backbone.CompositeView.extend({
  template: JST['annotations/show'],
  form: JST['annotations/form'],
  
  events: {
    'submit .annotation-form': 'submit',
    'click .add-image-link': 'addImage',
    'click .annotation-cancel': 'cancelForm',
    'click .edit-annotation-link': 'showAnnotationForm',
    'click .delete-annotation-link': 'deleteAnnotation',
  },
  
  initialize: function () {
    this.suggestionsView = new App.Views.SuggestionIndex({
      collection: this.model.suggestions(),
    });
    this.addSubview('.suggestions-container', this.suggestionsView);
    this.$container = $('.annotation-container');
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
  
  cancelForm: function (event) {
    event.preventDefault();
    if (this.model.isNew()) {
      this.hide();
    } else {
      this.render();
    }
  },
  
  deleteAnnotation: function (event) {
    event.preventDefault();
    event.stopPropagation();
    var reallyDoIt = confirm('Are you sure?')
    if (reallyDoIt) {
      event.preventDefault();
      this.model.destroy();
      this.collection.trigger('destroyed');
      this.hide();
    }
  },
  
  hide: function () {
    this.$el.hide();
  },
  
  render: function () {
    var renderedContent;
    if (this.model.isNew()) {
      renderedContent = this.form({ annotation: this.model });
    } else {
      renderedContent = this.template({ annotation: this.model });
    }
    this.$el.html(renderedContent);
    this.attachSubviews();

    return this;
  },
  
  reset: function () {
    this.$('.annotation-form-body').val('');
  },
  
  show: function () {
    this.$el.show();
    this.$container.css('right', '12px');
    this.$container.css('opacity', '0');
    this.$container.animate({
      opacity: 1,
      right: 0
    }, 150);
    
  },
  
  showAnnotationForm: function (event) {
    event.preventDefault();
    event.stopPropagation();
    var renderedForm = this.form({ annotation: this.model });
    this.$el.html(renderedForm);
  },
  
  submit: function (event) {
    var that = this;
    event.preventDefault();
    
    var formData = $(event.currentTarget).serializeJSON();
    that.model.set(formData.annotation);
    that.collection.create(this.model, {
      success: function (resp) {
        that.reset();
        that.collection.trigger('created', {
          annotation: that.model
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
    this.suggestionsView.switchSuggestions(this.model.suggestions());
    this.render();
  }
});