App.Views.ArticleShow = Backbone.CompositeView.extend({
  template: JST['articles/show'],
  
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },
  
  events: {
    'mouseup .article-body': 'promptAnnotate',
    'click .annotate-button': 'createAnnotationForm'  
  },
  
  createAnnotationForm: function () {
    var selection = this.getSelection();
    var selectedText = selection.toString();
    var substringStart = selection.baseOffset;
    var substringEnd = selection.extentOffset;
    var newAnnotation = new App.Models.Annotation({
      article_id: this.model.id,
      slug: selectedText,
      start_index: substringStart,
      end_index: substringEnd
    });
    var newAnnotationView = new App.Views.AnnotationNew({
      model: newAnnotation
    });
    this.addSubview('.annotation-container', newAnnotationView);
    
  },
  
  getSelection: function () {
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
    var selection = this.getSelection();
    if (selection.toString().trim()) {
      $('.annotate-button').show();
    } else {
      // TODO: needs to be hidden if ever unselected
      $('.annotate-button').hide();
    }
  },
});