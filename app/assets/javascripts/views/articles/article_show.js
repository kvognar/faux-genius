App.Views.ArticleShow = Backbone.CompositeView.extend({
  template: JST['articles/show'],
  
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },
  
  events: {
    'mouseup #article-body': 'promptAnnotate',
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
    // many thanks to Tim Down on StackOverload
    var start = 0; end = 0;
    var body = document.getElementById('article-body');
    var sel, range, priorRange;

    if (typeof window.getSelection != "undefined") {
      range = window.getSelection().getRangeAt(0);
      priorRange = range.cloneRange();
      priorRange.selectNodeContents(body);
      priorRange.setEnd(range.startContainer, range.startOffset);
      start = priorRange.toString().length;
      end = start + range.toString().length;
    }
    var text = window.getSelection().toString();
    return {
      start: start,
      end: end,
      text: text
    };
  },

  // getSelection: function () {
  //   var selection = ''
  //   if (window.getSelection) {
  //     selection = window.getSelection();
  //   } else if(document.getSelection) {
  //     selection = document.getSelection();
  //   } else if (document.selection) {
  //     selection = document.selection.createRange().text;
  //   }
  //   var range = selection.getRangeAt(0);
  //
  //   return {
  //     start: range.startOffset,
  //     end: range.endOffset,
  //     text: selection.toString()
  //   };
  // },
  
  render: function () {
    var body = this.addAnchorsToBody();
    var renderedContent = this.template({ 
      article: this.model,
      body: body
    });
    this.$el.html(renderedContent);
    
    return this;
  },
  
  addAnchorsToBody: function() {
    var result = this.model.get('body');
    if (!result) { return ''; }
    this.model.annotations().each(function(ann) {

      result = result.substring(0, ann.get('end_index')) + 
                "](/#/" +ann.id + ")" +
                result.substring(ann.get('end_index'), result.length);
      result = result.substring(0, ann.get('start_index')) + 
                "[" +
                result.substring(ann.get('start_index'), result.length);
    });
    var markedResult = marked(_.escape(result));
    var brResult = markedResult.replace(/<p>/g, '').replace(/<\/p>/g, '\n')
    console.log(brResult);
    return brResult;
  },
  
  promptAnnotate: function (event) {
    var selection = this.getSelection();
    if (selection.text.trim()) {
      $('.annotate-button').show();
      this.debugPrint(selection);
    } else {
      // TODO: needs to be hidden if ever unselected
      $('.annotate-button').hide();
    }
  },
  
  debugPrint: function(selection) {
    console.log("Start: " + selection.start);
    console.log("End: " + selection.end);
    console.log("text: " + selection.text);
    console.log("db text: " + this.model.get('body').substring(selection.start, selection.end));
    console.log("text length: " + selection.text.length);
    
    console.log("Range: " + (selection.end - selection.start));
  },
});