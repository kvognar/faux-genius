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
  
  # def post_date
  #   time_ago_in_words(self.created_at)
  # end
  
end
