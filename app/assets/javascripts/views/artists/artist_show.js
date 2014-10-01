App.Views.ArtistShow = Backbone.CompositeView.extend({
  template: JST['artists/show'],
  descriptionForm: JST['artists/description_form'],
  
  id: 'artist-show',
  
  events: {
    'click .filepicker-button': 'promptFilepicker',
    'click .add-artist-description-button': 'showDescriptionForm',
    'click .cancel-button': 'hideDescriptionForm',
    'submit #artist-description-form': 'addDescription'
  },
  
  addDescription: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    this.model.save(formData.artist, {
      success: this.render.bind(this)
    });
  },
  
  hideDescriptionForm: function (event) {
    event.preventDefault();
    $('#artist-description-form').hide();
    $('.add-artist-description-button').show();
  },
  
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    
    this.followButton = new App.Views.RelationshipButton({
      collection: this.model.followings()
    });
    this.addSubview('.follow-button-container', this.followButton);
  },
  
  promptFilepicker: function () {
    var that = this;
    filepicker.pick(function (blob) {
      that.model.save({'image_url': blob.url}, {
        success: function () {
          that.render();
        }
      });
    });
  },
  
  render: function () {
    var renderedContent = this.template({ artist: this.model });
    this.$el.html(renderedContent);
    this.attachSubviews();
    
    return this;
  },
  
  showDescriptionForm: function (event) {
    event.preventDefault();
    $('.add-artist-description-button').hide();
    $('#artist-description-form').show();
  },
});