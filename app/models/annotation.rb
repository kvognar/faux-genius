# == Schema Information
#
# Table name: annotations
#
#  id          :integer          not null, primary key
#  article_id  :integer          not null
#  start_index :integer          not null
#  end_index   :integer          not null
#  body        :text             not null
#  created_at  :datetime
#  updated_at  :datetime
#  slug        :text             not null
#  author_id   :integer          not null
#

class Annotation < ActiveRecord::Base
  validates :start_index, :end_index, :body, 
            :article, :slug, :author, presence: true
            
  validate :no_overlap_with_neighbor_annotations
  
  default_scope { order('id DESC') }
  
  belongs_to :article
  belongs_to :author, class_name: "User"
  has_many :suggestions, as: :suggestable, dependent: :destroy
  has_many :sourced_notifications, 
           class_name: "Notification", 
           as: :source,
           dependent: :destroy
  
  after_create :bubble_notifications
  delegate :title, to: :article, prefix: true
  
  belongs_to :parent, class_name: "Article", foreign_key: :article_id
  has_many :children, as: :parent, class_name: "Suggestion"
    
  def followers
    self.author.followers + 
    self.article.followers + 
    self.article.artist.followers
  end
  
  def bubble_notifications
    self.followers.uniq.each do |follower|
      unless follower.id == self.author_id
        follower.incoming_notifications.create!(source: self)
      end
    end
  end
  
    
  private
  
  def no_overlap_with_neighbor_annotations
    where_query = <<-SQL
    (id != :self_id OR id IS NOT NULL)
    AND
    article_id = :self_article_id
    AND
    (
      start_index BETWEEN :start_index AND :end_index
      OR end_index BETWEEN :start_index AND :end_index
    )
    SQL
    siblings = Annotation.where(where_query, 
                      self_id: self.id, 
                      start_index: self.start_index, 
                      end_index: self.end_index,
                      self_article_id: self.article_id)
    unless (siblings - [self]).empty?
      errors[:annotation] << "cannot overlap with other annotations"
    end
    siblings
  end
end
