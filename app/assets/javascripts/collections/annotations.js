App.Collections.Annotations = Backbone.Collection.extend({
  url: 'api/annotations',
  
  comparator: function (model) {
    return -1 * model.get('start_index');
  },
  
  initialize: function (models, options) {
    this.article = options.article;
  },
  
  model: App.Models.Annotation
})