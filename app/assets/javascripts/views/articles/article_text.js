App.Views.ArticleText = Backbone.View.extend({
  template: JST['articles/text'],
  
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },
  
  render: function () {
    var body = this.addAnchorsToBody();
    var renderedContent = this.template({ body: body });
    this.$el.html(renderedContent);
    
    return this;
  },
  
  addAnchorsToBody: function() {
    var result = this.model.get('body');
    if (!result) { return ''; }
    this.model.annotations().each(function (ann) {

      result = result.substring(0, ann.get('end_index')) + 
                "](" + ann.id + ")" +
                result.substring(ann.get('end_index'), result.length);
      result = result.substring(0, ann.get('start_index')) + 
                "[" +
                result.substring(ann.get('start_index'), result.length);
    });
    var markedResult = marked(_.escape(result));
    var brResult = markedResult.replace(/<p>/g, '').replace(/<\/p>/g, '\n');
    return brResult;
  },
})