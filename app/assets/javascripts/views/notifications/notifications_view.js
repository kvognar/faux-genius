App.Views.NotificationsView = Backbone.View.extend({
  template: JST['notifications/notification_view'],
  tagName: 'li',
  className: 'dropdown',
  
  initialize: function () {
    this.collection = new App.Collections.Notifications();
    this.collection.fetch();
    this.listenTo(this.collection, 'sync', this.render);
  },
  
  render: function () {
    // debugger
    var renderedContent = this.template({ notifications: this.collection });
    this.$el.html(renderedContent);
    
    return this;
  }
});