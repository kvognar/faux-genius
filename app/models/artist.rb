# == Schema Information
#
# Table name: artists
#
#  id          :integer          not null, primary key
#  name        :string(255)      not null
#  description :text
#  image_url   :string(255)
#  created_at  :datetime
#  updated_at  :datetime
#

class Artist < ActiveRecord::Base
  validates :name, presence: true
  has_many :albums
  has_many :articles
  
  has_many :followings, class_name: "Relationship", as: :followed
  has_many :followers, through: :followings
end
