App.Views.NotificationShow = Backbone.View.extend({
  template: JST['notifications/notification_show'],
  tagName: 'li',
  className: 'notification-container',
  
  render: function () {
    var renderedContent = this.template({ 
      notification: this.model,
      source: this.model.get('source'),
      author: this.model.get('source').author,
      article: this.model.get('author')
    });
    this.$el.html(renderedContent);
    
    return this;
  }
  
});