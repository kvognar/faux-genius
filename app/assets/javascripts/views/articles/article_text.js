App.Views.ArticleText = Backbone.View.extend({
  template: JST['articles/text'],
  
  render: function () {
    var body = this.
    var renderedContent = this.template({ body: body });
    this.$el.html(renderedContent);
    
    return this;
  },
})