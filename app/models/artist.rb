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
  
  has_many :outgoing_notifications, as: :notable
  
  def bubble_notifications(source)
    transaction do
      self.followers.each do |follower|
        notification = follower.incoming_notifications.new(notable: self)
        notification.source = source
        notification.save!
      end
    end
  end
  
end
