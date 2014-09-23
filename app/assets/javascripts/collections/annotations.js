App.Collections.Annotations = Backbone.Collection.extend({
  url: 'api/annotations',
  
  initialize: function (models, options) {
    this.article = options.article;
  },
  
  model: App.Models.Annotation
})