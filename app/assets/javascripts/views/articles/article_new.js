App.Views.ArticleNew = Backbone.View.extend({
  template: JST['articles/form'],
  
  events: {
    'submit #new-article-form': 'submit'
  },
  
  submit: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    this.model.set(formData.article);
    this.model.save({}, {
      success: function () {
        alert('huzzah!');
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