App.Views.NotificationsList = Backbone.CompositeView.extend({
  template: JST['notifications/notifications_list'],
  tagName: 'li',
  className: 'dropdown',
  
  initialize: function () {
    this.collection = new App.Collections.Notifications();
    this.collection.fetch();
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addNotification);
  },
  
  addNotification: function (notification) {
    var notificationView = new App.Views.NotificationShow({
      model: notification
    });
    this.addSubview('.dropdown-menu', notificationView);
  },
  
  render: function () { 
    var renderedContent = this.template({ notifications: this.collection });
    this.$el.html(renderedContent);
    this.attachSubviews();
    
    return this;
  }
});