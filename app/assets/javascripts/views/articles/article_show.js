App.Views.ArticleShow = Backbone.View.extend({
  template: JST['articles/show'],
  
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },
  
  events: {
    'mouseup .article-body': 'promptAnnotate'
  },
  
  getSelected: function () {
    var text = ''
    if (window.getSelection) {
      text = window.getSelection();
    } else if(document.getSelection) {
      text = document.getSelection();
    } else if (document.selection) {
      text = document.selection.createRange().text;
    }
    return text;
  },
  
  render: function () {
    var renderedContent = this.template({ article: this.model });
    this.$el.html(renderedContent);
    
    return this;
  },
  
  promptAnnotate: function (event) {
    var selection = this.getSelected();
    if (selection.toString().trim()) {
      var substringStart = selection.baseOffset;
      var substringEnd = selection.extendOffset;
      debugger
      $('.article-body').popover('show');

    }
    // debugger
    console.log("hey hey");
  },
});