App.Views.NotificationShow = Backbone.CompositeView.extend({
  annotationTemplate: JST['notifications/annotation_notification'],
  suggestionTemplate: JST['notifications/suggestion_notification'],
  tagName: 'li',
  className: 'notification-container',
  
  events: {
    'click a.notification-pane': 'toggleSubview'
  },
  
  initialize: function (options) {
    this.listenTo(this.model, 'sync', this.render)
  },
  
  render: function () {
    // debugger

    var renderedContent;
    if (this.model.type === "Annotation") {
      renderedContent = this.annotationTemplate({ 
        notification: this.model,
        annotation: this.model.annotation,
        author: this.model.annotation.author,
        article: this.model.article
      });
    } else if (this.model.type === "Suggestion") {
      renderedContent = this.suggestionTemplate({
        notification: this.model,
        suggestable: this.model.suggestable,
        author: this.model.suggestion.author
      });
    }
    this.$el.html(renderedContent);
    this.attachSubviews();
    
    return this;
  },
  
  toggleAnnotation: function () {
    
    if (this.sourceView) {
      this.sourceView.$el.toggle();
    } else {
      this.showAnnotation();
    }
  },
  
  toggleSubview: function (event) {
    event.preventDefault();
    event.stopPropagation();
    
    if (this.model.type === "Annotation") {
      this.toggleAnnotation();
    } else if (this.model.type === "Suggestion") {
      this.toggleSuggestion();
    }
  },
  
  toggleSuggestion: function () {
    if (this.sourceView) {
      this.sourceView.$el.toggle();
    } else {
      this.showSuggestion();
    }
  },
  
  showAnnotation: function () {
    var that = this;
    var annotation = new App.Models.Annotation({ 
      id: this.model.get('source').id 
    });
    
    annotation.fetch({
      success: function () {
        that.sourceView = new App.Views.AnnotationShow({
          model: annotation,
          author: that.model.get('source').author,
          standAlone: true
        });
        that.addSubview('.source-container', that.sourceView);
      }
    });
  },
  
  showSuggestion: function () {
    var that = this;
    var suggestion = new App.Models.Suggestion({
      id: this.model.get('source').id
    });
    
    suggestion.fetch({
      success: function () {
        that.sourceView = new App.Views.SuggestionShow({
          model: suggestion
        });
        that.addSubview('.source-container', that.sourceView);
      }
    });
  },
  
});