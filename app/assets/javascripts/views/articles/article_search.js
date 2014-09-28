App.Views.ArticleSearch = Backbone.View.extend({
  template: 'articles/search',
  
  render: function () {
    var renderedContent = this.template({articles: this.collection});
    this.$el.html(renderedContent);
    
    return this;
  }
});