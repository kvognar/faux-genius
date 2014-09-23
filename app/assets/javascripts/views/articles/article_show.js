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
    var newAnnotation = new App.Models.Annotation({
      article_id: this.model.id,
      slug: selection.text,
      start_index: selection.start,
      end_index: selection.end
    });
    var newAnnotationView = new App.Views.AnnotationNew({
      model: newAnnotation
    });
    this.addSubview('.annotation-container', newAnnotationView);
    
  },
  
  getSelection: function () {
    var selection = ''
    if (window.getSelection) {
      selection = window.getSelection();
    } else if(document.getSelection) {
      selection = document.getSelection();
    } else if (document.selection) {
      selection = document.selection.createRange().text;
    }
    var range = selection.getRangeAt(0);
    
    return {
      start: range.startOffset,
      end: range.endOffset,
      text: selection.toString()
    };
  },
  
  render: function () {
    var renderedContent = this.template({ article: this.model });
    this.$el.html(renderedContent);
    
    return this;
  },
  
  promptAnnotate: function (event) {
    var selection = this.getSelection();
    if (selection.text.trim()) {
      $('.annotate-button').show();
        console.log(selection.start);
        console.log(selection.end);
        console.log(selection.text);
    } else {
      // TODO: needs to be hidden if ever unselected
      $('.annotate-button').hide();
    }
  },
});