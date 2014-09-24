App.Views.ArticleShow = Backbone.CompositeView.extend({
  template: JST['articles/show'],
  
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.annotations(), 'add', this.render);
    
    this.annotationView = new App.Views.AnnotationShow({
      model: new App.Models.Annotation()
    });
    this.addSubview('.annotation-container', this.annotationView);
    this.annotationView.hide();
    
    this.annotationForm = new App.Views.AnnotationNew({
      model: new App.Models.Annotation(),
      collection: this.model.annotations()
    });
    this.addSubview('.annotation-container', this.annotationForm);

    this.annotationForm.hide();
    
  },
  
  events: {
    'mouseup #article-body': 'promptAnnotate',
    'click .annotate-button': 'showAnnotationForm',
    'click #article-body a': 'showAnnotation'
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
  
  isValidSelection: function (selection) {
    // double newlines break markdown links
    return selection.text.trim().length > 0 && 
           selection.text.indexOf('\n\n') === -1;
  },
    
  getSelection: function () {
    // many thanks to Tim Down on StackOverload
    var start = 0; end = 0;
    var body = document.getElementById('article-body');
    var sel, range, priorRange, text;
    var noSelect = {
      start: -1,
      end: -1,
      text: ''
    };

    if (typeof window.getSelection != "undefined") {
      if (window.getSelection().type === 'None') { return noSelect }
      range = window.getSelection().getRangeAt(0);
      priorRange = range.cloneRange();
      priorRange.selectNodeContents(body);
      priorRange.setEnd(range.startContainer, range.startOffset);
      start = priorRange.toString().length;
      end = start + range.toString().length;
      text = window.getSelection().toString();
    } else if (typeof document.selection != "undefined" &&
              (sel = document.selection).type != "Control") {
                range = sel.createRange();
                priorRange = document.body.createTextRange();
                priorRange.moveToElementText(element);
                priorRange.setEndpoint("EndToStart", range);
                start = priorRange.text.length;
                end = start + range.text.length;
                text = range.text;
              }
      
    return {
      start: start,
      end: end,
      text: text
    };
  },
  
  promptAnnotate: function (event) {
    var selection = this.getSelection();
    if (this.isValidSelection(selection)) {
      $('.annotate-button').show();
      this._debugPrint(selection);
    } else {
      // TODO: needs to be hidden if ever unselected
      $('.annotate-button').hide();
    }
  },
  
  render: function () {
    var body = this.addAnchorsToBody();
    var renderedContent = this.template({ 
      article: this.model,
      body: body
    });
    this.$el.html(renderedContent);
    this.attachSubviews();
    
    return this;
  },
  
  showAnnotation: function (event) {
    event.preventDefault();
    var annotation = this.model.annotations()
                               .get($(event.currentTarget).attr('href'));
   this.annotationView.switchAnnotation(annotation);
   this.annotationForm.hide();
   this.annotationView.show();
  },
  
  showAnnotationForm: function () {
    var selection = this.getSelection();
    var newAnnotation = new App.Models.Annotation({
      article_id: this.model.id,
      slug: selection.text,
      start_index: selection.start,
      end_index: selection.end
    });
    this.annotationForm.switchAnnotation(newAnnotation);
    this.annotationView.hide();
    this.annotationForm.show();

  },
  
  
  _debugPrint: function(selection) {
    console.log("Start: " + selection.start);
    console.log("End: " + selection.end);
    console.log("text: " + selection.text);
    console.log("db text: " + this.model.get('body').substring(selection.start, selection.end));
    console.log("text length: " + selection.text.length);
    
    console.log("Range: " + (selection.end - selection.start));
  },
});