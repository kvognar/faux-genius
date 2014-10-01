App.Views.NotificationShow = Backbone.CompositeView.extend({
  template: JST['notifications/notification_show'],
  tagName: 'li',
  className: 'notification-container',
  
  events: {
    'click a.notification-pane': 'toggleAnnotation'
  },
  
  render: function () {
    var renderedContent = this.template({ 
      notification: this.model,
      source: this.model.get('source'),
      author: this.model.get('source').author,
      article: this.model.get('article')
    });
    this.$el.html(renderedContent);
    this.attachSubviews();
    
    return this;
  },
  
  toggleAnnotation: function (event) {
    event.preventDefault();
    event.stopPropagation();
    
    if (this.sourceView) {
      this.sourceView.$el.toggle();
    } else {
      this.showAnnotation();
    }
  },
  
  showAnnotation: function () {
    var that = this;
    var annotation = new App.Models.Annotation({ 
      id: this.model.get('source').id 
    });
    
    annotation.fetch({
      success: function () {
        that.sourceView = new App.Views.UserAnnotationShow({
          model: annotation,
          author: that.model.get('source').author
        });
        that.addSubview('.source-container', that.sourceView);
      }
    });
  },
  
});