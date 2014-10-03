App.Views.SuggestionIndex = Backbone.View.extend({
  template: JST['suggestions/index'],
  
  initialize: function (options) {
    this.listenTo(this.collection.suggestable, 'sync', this.render);
    this.listenTo(this.collection, 'sync', this.render);
  },
  
  events: {
    'submit .suggestion-form': 'submit'
  },
  
  render: function () {
    var renderedContent = this.template({ 
      suggestions: this.collection,
      suggestable: this.collection.suggestable,
      suggestableType: this.collection.suggestableType   
     });
    this.$el.html(renderedContent);
    $('abbr.timeago').timeago();
    
    return this;
  },
  
  submit: function (event) {
    event.preventDefault();
    var suggestions = this.collection;
    
    var $form = $(event.currentTarget);
    var formData = $form.serializeJSON();
    var newSuggestion = new App.Models.Suggestion(formData.suggestion);
    this.collection.create(newSuggestion, {
      success: function (resp) {
        newSuggestion.author = App.user;
        $form.find('textarea').val('');
        this.render();
      }.bind(this),
      wait: true
    });
  },
  
  switchSuggestions: function(suggestions) {
    this.collection = suggestions;
    this.render();
  },
});