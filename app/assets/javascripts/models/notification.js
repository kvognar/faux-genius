App.Models.Notification = Backbone.Model.extend({
  urlRoot: "api/notifications",
  
  
  parse: function (options) {
    this.type = options.source.type;
    if (this.type === "Annotation") {
      this.annotation = new App.Models.Annotation({
        id: options.source.id,
        author: options.source.author
      }, { parse: true });
      this.article = options.article;
    } else if (this.type === "Suggestion") {
      this.suggestion = new App.Models.Suggestion({
        id: options.source.id,
        author: options.source.author
      }, { parse: true });
      this.suggestable = options.suggestable;
    }
    return options;
  }
});