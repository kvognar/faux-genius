App.Views.ArticleIndex = Backbone.View.extend({
  template: JST['articles/index'],
  
  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
  },
  
  id: "home-page",
  
  render: function () {
    var renderedContent = this.template({ articles: this.collection });
    this.$el.html(renderedContent);
    
    return this;
  }
});