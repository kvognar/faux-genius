# == Schema Information
#
# Table name: suggestions
#
#  id               :integer          not null, primary key
#  author_id        :integer          not null
#  body             :text             not null
#  suggestable_id   :integer          not null
#  suggestable_type :string(255)      not null
#  created_at       :datetime
#  updated_at       :datetime
#

class Suggestion < ActiveRecord::Base
  validates :author, :body, :suggestable, presence: true
  
  belongs_to :suggestable, polymorphic: true
  belongs_to(
    :author,
    class_name: "User",
    foreign_key: :author_id,
    primary_key: :id
  )
  
  has_many :sourced_notifications, as: :source
  belongs_to :parent, polymorphic: true, foreign_key: :suggestable_id, foreign_type: :suggestable_type
  
  after_create :bubble_notifications
  
  
  def suggestable_data
    if self.suggestable_type == "Article"
      {
        article_id: self.suggestable_id,
        article_title: self.parent.title
      }
    elsif self.suggestable_type == "Annotation"
      {
        article_id: self.parent.article_id,
        article_title: self.parent.article_title,
        annotation_id: self.suggestable_id
      }
    end
  end
  
  def followers
    self.suggestable.followers + self.author.followers
  end
  
  def bubble_notifications
    self.followers.uniq.each do |follower|
      unless follower.id == self.author_id
        follower.incoming_notifications.create!(source: self)
      end
    end
  end
  
end
