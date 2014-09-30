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
            
  # TODO !
  # validate :no_overlap_with_neighbor_annotations
  
  default_scope { order('created_at DESC') }
  
  belongs_to :article
  belongs_to :author, class_name: "User"
  has_many :suggestions, as: :suggestable, dependent: :destroy
  has_many :sourced_notifications, class_name: "Notification", as: :source
  
  after_create :bubble_notifications
  
  def bubble_notifications
    p "OoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOo"
    #bubbles!
    self.article.bubble_notifications(self)
    self.author.bubble_notifications(self)
  end
  
  private
  
  # def no_overlap_with_neighbor_annotations
  #
  # end
end
