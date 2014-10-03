App.Collections.Notifications = Backbone.Collection.extend({
  url: 'api/notifications',
  model: App.Models.Notification
  
});