App.Views.AnnotationShow = Backbone.CompositeView.extend({
  template: JST['annotations/show'],
  
  events: {
    'submit .annotation-form': 'submit',
    'click .add-image-link': 'addImage',
    'click .annotation-cancel': 'cancelForm',
    'click .edit-annotation-link': 'showAnnotationForm',
    'click .delete-annotation-link': 'deleteAnnotation',
  },
  
  initialize: function (options) {
    this.suggestionsView = new App.Views.SuggestionIndex({
      collection: this.model.suggestions(),
    });
    this.addSubview('.suggestions-container', this.suggestionsView);
    this.$container = $('.annotation-container');
    this.standAlone = options.standAlone;
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
      this.showAnnotation();
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
    var renderedContent = this.template({ 
      annotation: this.model,
      standAlone: this.standAlone
     });
    this.$el.html(renderedContent);
    
    if (this.model.isNew()) {
      this.$('.annotation-body').hide();
    } else {
      this.$('.annotation-form').hide();
    }
    this.attachSubviews();

    return this;
  },
  
  reset: function () {
    if (this.standAlone) {
      this.render();
    } else {
      this.$('.annotation-form-body').val('');
    }
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
  
  showAnnotation: function () {
    this.$('.annotation-form').hide();
    this.$('.annotation-body').show();
  },
  
  showAnnotationForm: function (event) {
    // debugger
    event.preventDefault();
    event.stopPropagation();
    this.$('.annotation-body').hide();
    this.$('.annotation-form').show();
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