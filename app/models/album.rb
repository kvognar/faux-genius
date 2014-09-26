# == Schema Information
#
# Table name: albums
#
#  id          :integer          not null, primary key
#  title       :string(255)      not null
#  description :text
#  artist_id   :integer          not null
#  image_url   :string(255)
#  created_at  :datetime
#  updated_at  :datetime
#

class Album < ActiveRecord::Base
  validates :title, :artist, presence: true
  
  belongs_to :artist
  has_many :articles
end
