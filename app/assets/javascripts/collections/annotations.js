App.Collections.Annotations = Backbone.Collection.extend({
  url: 'api/annotations',
  
  comparator: function (model) {
    return -1 * model.get('start_index');
  },
  
  initialize: function (models, options) {
    if (options.article) {
      this.article = options.article;
    } else {
      this.author = options.author;
    }
  },
  
  model: App.Models.Annotation
})