App.Views.ArticleNew = Backbone.View.extend({
  template: JST['articles/form'],
  
  events: {
    'submit #new-article-form': 'submit'
  },
  
  submit: function (event) {
    var view = this;
    event.preventDefault();
    
    var formData = $(event.currentTarget).serializeJSON();
    this.model.set(formData.article);
    this.model.save({}, {
      success: function () {
        Backbone.history.navigate('#/articles/' + view.model.id);
      },
      
      error: function (resp) {
        console.log(resp);
      }
    });
  },
  
  render: function () {
    var renderedContent = this.template({ article: this.model });
    this.$el.html(renderedContent);
    
    return this;
  }
})