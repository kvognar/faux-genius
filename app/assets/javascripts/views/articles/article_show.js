App.Views.ArticleShow = Backbone.CompositeView.extend({
  template: JST['articles/show'],
  popoverTemplate: JST['articles/popover'],
  
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.annotations(), 'created', this.refreshText);
    this.initializeSubviews();
  },
  
  events: {
    'mouseup #article-body': 'promptAnnotate',
    'click .annotation-prompt a': 'showAnnotationForm',
    'click #article-body a': 'showAnnotation',
  },
  
  initializeSubviews: function () {
    this.followButton = new App.Views.RelationshipButton({
      collection: this.model.followings()
    });
    this.addSubview('.follow-button-container', this.followButton);
    
    this.articleText = new App.Views.ArticleText({
      model: this.model
    });
    this.addSubview('.article-text', this.articleText);
    
    this.suggestionsView = new App.Views.SuggestionIndex({
      collection: this.model.suggestions(),
      suggestable: this.model,
      suggestableType: "Article"
    });
    this.addSubview('.suggestions-container', this.suggestionsView);

    
  },
  
  createAnnotationForm: function (annotation) {
    this.annotationForm = new App.Views.AnnotationNew({
      model: annotation,
      collection: this.model.annotations()
    });
    this.addSubview('.annotation-container', this.annotationForm);
    this.annotationForm.hide();
  },
  
  createAnnotationView: function (annotation) {
    this.annotationView = new App.Views.AnnotationShow({
      model: annotation
    });
    this.addSubview('.annotation-container', this.annotationView);
    this.annotationView.hide();
  },
  
  
  getSelection: function () {
    // many thanks to Tim Down on StackOverload
    var start = 0; end = 0;
    var body = document.getElementById('article-body');
    var sel, range, priorRange, text;
    var selection;
    var noSelect = {
      start: -1,
      end: -1,
      text: '',
      obj: selection
    };

    if (typeof window.getSelection != "undefined") {
      if (window.getSelection().type === 'None') { return noSelect }
      selection = window.getSelection()
      range = selection.getRangeAt(0);
      priorRange = range.cloneRange();
      priorRange.selectNodeContents(body);
      priorRange.setEnd(range.startContainer, range.startOffset);
      start = priorRange.toString().length;
      end = start + range.toString().length;
      text = selection.toString();
      baseParent = window.getSelection().baseNode.parentElement;
      extentParent = window.getSelection().extentNode.parentElement;
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
      text: text,
      startParent: baseParent,
      endParent: extentParent,
      obj: selection
    };
  },
  
  hidePopover: function () {
    $('#article-body').popover('hide');
  },
  
  isValidSelection: function (selection) {
    // double newlines break markdown links
    return selection.text.trim().length > 0 && 
           selection.text.indexOf('\n\n') === -1 &&
           selection.startParent.tagName !== "A" &&
           selection.endParent.tagName !== "A" &&
           this.selectionContainsNoLink(selection.obj);
  },
      
  promptAnnotate: function (event) {
    var selection = this.getSelection();
    if (this.isValidSelection(selection)) {
      this.showPopover(selection);
    } else {
      // TODO: needs to be hidden if ever unselected
      if ($('.popover').length !== 0) {
        this.hidePopover();
      }
    }
  },
  
  refreshText: function (event) {
    this.articleText.render();
    this.delegateEvents();
    $('a[href="' + event.annotation.id + '"]').click();
  },
  
  render: function () {
    var renderedContent = this.template({ 
      article: this.model,
    });
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  },
  
  selectionContainsNoLink: function (selection) {
    // thanks to sharp johnny on stackoverflow
    var range = selection.getRangeAt(0);
    var result = $('a', range.commonAncestorContainer).filter(function() {
      return selection.containsNode(this);
    });
    return result.length === 0;
  },
  
  showAnnotation: function (event) {
    event.preventDefault();
    
    if ($(event.currentTarget).hasClass('active')) {
      $('a').removeClass('active');
      this.annotationView.hide();
      return;
    }
    
    $('a').removeClass('active');
    $(event.currentTarget).addClass('active');
    $('.annotation-container').css('top', $(event.currentTarget).offset().top);
    var annotation = this.model.annotations()
                               .get($(event.currentTarget).attr('href'));
                               
    if (!this.annotationView) {
      this.createAnnotationView(annotation);
    } else {
      this.annotationView.switchAnnotation(annotation);
    }
    if (this.annotationForm) { this.annotationForm.hide() }
    this.annotationView.show();
  },
  
  showAnnotationForm: function (event) {    
    event.preventDefault();
    this.hidePopover();
    if (App.requireUser()) {
      return;
    }
    
    var selection = this.getSelection(); // maybe save selection as ivar
    var newAnnotation = new App.Models.Annotation({
      article_id: this.model.id,
      slug: selection.text,
      start_index: selection.start,
      end_index: selection.end
    });
    if (!this.annotationForm) {
      this.createAnnotationForm(newAnnotation);
    } else {
      this.annotationForm.switchAnnotation(newAnnotation);
    }
    if (this.annotationView) { this.annotationView.hide() }
    this.annotationForm.show();
  },
  
  showPopover: function (selection) {
    console.log('pop?');
    var $articleBody = $('#article-body');
    var selectionBox = selection.obj.getRangeAt(0).getBoundingClientRect();
    // $('#article-body').data('bs.popover', null); // something to keep in mind
    if (!$articleBody.data('bs.popover')){

      $articleBody.popover({
        container: '.article-container',
        content: "Annotate",
        template: this.popoverTemplate().toString(),
        placement: 'top'
      });
    }
    // without timeout Bootstrap will re-set popover position
    setTimeout(function () {
      $('.popover').css({
        top: selectionBox.top + window.scrollY - 45, 
        left: selectionBox.right - 50
      });
    }, 0);
   $articleBody.popover('show');
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