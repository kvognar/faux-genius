# == Schema Information
#
# Table name: articles
#
#  id         :integer          not null, primary key
#  title      :string(255)      not null
#  body       :text             not null
#  created_at :datetime
#  updated_at :datetime
#  artist_id  :integer          not null
#  album_id   :integer
#

class Article < ActiveRecord::Base
  validates :title, :artist, :body, presence: true
  
  after_initialize :remove_invisible_characters
  
  has_many :annotations, dependent: :destroy
  has_many :suggestions, as: :suggestable, dependent: :destroy
  belongs_to :artist
  belongs_to :album
  
  def self.find_by_query(query)
    query_string = <<-SQL
    LOWER(artists.name) LIKE :query OR
    LOWER(albums.title) LIKE :query OR
    LOWER(articles.title) LIKE :query
    SQL
    
    return Article.joins(:artist).joins(:album)
        .where(query_string, query: "%#{query.downcase}%")

  end
  
  private
  
  def remove_invisible_characters
    self.body.gsub!(/\r/, '')
    self.body.strip!
  end
end
