# == Schema Information
#
# Table name: annotations
#
#  id          :integer          not null, primary key
#  article_id  :integer          not null
#  start_index :integer          not null
#  end_index   :integer          not null
#  body        :text             not null
#  slug        :text             not null
#  created_at  :datetime
#  updated_at  :datetime
#

class Annotation < ActiveRecord::Base
  validates :start_index, :end_index, :body, :article, :slug, presence: true
  # TODO !
  # validate :no_overlap_with_neighbor_annotations
  
  belongs_to :article
  has_many :suggestions, as: :suggestable
  
  private
  
  # def no_overlap_with_neighbor_annotations
  #
  # end
end
