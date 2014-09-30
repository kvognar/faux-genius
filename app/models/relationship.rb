# == Schema Information
#
# Table name: relationships
#
#  id            :integer          not null, primary key
#  follower_id   :integer          not null
#  followed_id   :integer          not null
#  followed_type :string(255)      not null
#  created_at    :datetime
#  updated_at    :datetime
#

class Relationship < ActiveRecord::Base
  validates :follower, :followed, presence: true
  validates :follower, uniqueness: { scope: [:followed_id, :followed_type] } 
  
  belongs_to(
    :follower,
    class_name: "User",
    foreign_key: :follower_id
  )
  
  belongs_to :followed, polymorphic: true
end
