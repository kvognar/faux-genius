App.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['users/show'],
  id: 'user-show',
  
  events: {
    'click .filepicker-button': 'promptFilepicker'
  },
  
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.annotationsView = new App.Views.UserAnnotationsIndex({
      collection: this.model.annotations()
    });
    this.addSubview('#annotations', this.annotationsView)
    
    this.suggestionsView = new App.Views.UserSuggestionsIndex({
      collection: this.model.suggestions()
    });
    this.addSubview('#suggestions', this.suggestionsView);
  },
  
  promptFilepicker: function () {
    var that = this;
    filepicker.pick(function (blob) {
      App.user.set({"image_url": blob.url});
      App.user.save({}, {
        success: function () {
          that.model.set({'image_url': blob.url});
          that.render();
        }
      });
    });
  },
  
  render: function () {
    var renderedContent = this.template({ user: this.model });
    this.$el.html(renderedContent);
    this.attachSubviews();
    var $filepickerInput = $('input[type=filepicker]'); 
    // debugger
    if ($filepickerInput[0]) {
      filepicker.constructWidget($filepickerInput[0]);
    }
    
    return this;
  },
  
  
});