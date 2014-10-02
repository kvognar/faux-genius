# == Schema Information
#
# Table name: articles
#
#  id           :integer          not null, primary key
#  title        :string(255)      not null
#  body         :text             not null
#  created_at   :datetime
#  updated_at   :datetime
#  artist_id    :integer          not null
#  album_id     :integer
#  submitter_id :integer          not null
#

class Article < ActiveRecord::Base
  validates :title, :artist, :body, presence: true
  
  after_initialize :remove_invisible_characters
  
  has_many :annotations, dependent: :destroy
  has_many :suggestions, as: :suggestable, dependent: :destroy
  belongs_to :artist
  belongs_to :album
  belongs_to :submitter, class_name: "User"
  
  has_many :followings, class_name: "Relationship", as: :followed
  has_many :followers, through: :followings
  
  has_many :outgoing_notifications, class_name: "Notification", as: :notable
  
  
  def self.find_by_query(query)
    query_string = <<-SQL
    LOWER(artists.name) LIKE :query OR
    LOWER(albums.title) LIKE :query OR
    LOWER(articles.title) LIKE :query
    SQL
    
    return Article.includes(:artist, :album)
                  .where(query_string, query: "%#{query.downcase}%")
                  .references(:artist, :album)
  end
  
  delegate :name, to: :artist, prefix: true
  
  def album_title
    self.album.nil? ? nil : self.album.title
  end
  
  def image_url
    if album && album.image_url
      return album.image_url
    elsif artist.image_url
      return artist.image_url
    else
      return "/assets/site/default_cover_image.png"
    end
  end
  
  
  private
  
  def remove_invisible_characters
    self.body.gsub!(/\r/, '')
    self.body.strip!
  end
end
