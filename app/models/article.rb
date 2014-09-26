# == Schema Information
#
# Table name: articles
#
#  id         :integer          not null, primary key
#  title      :string(255)      not null
#  artist     :string(255)      not null
#  body       :text             not null
#  created_at :datetime
#  updated_at :datetime
#  artist_id  :integer          not null
#  album_id   :integer
#

class Article < ActiveRecord::Base
  validates :title, :artist, :body, presence: true
  
  after_initialize :remove_invisible_characters
  
  has_many :annotations
  has_many :suggestions, as: :suggestable
  belongs_to :artist
  belongs_to :album
  
  private
  
  def remove_invisible_characters
    self.body.gsub!(/\r/, '')
    self.body.strip!
  end
end
