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
#

class Article < ActiveRecord::Base
  validates :title, :artist, :body, presence: true
  
  has_many :annotations
  after_initialize :remove_invisible_characters
  
  private
  
  def remove_carriage_returns
    self.body.gsub!(/\r/, '')
    self.body.strip!
  end
end
