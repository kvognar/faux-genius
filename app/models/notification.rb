# == Schema Information
#
# Table name: notifications
#
#  id           :integer          not null, primary key
#  user_id      :integer          not null
#  notable_id   :integer          not null
#  notable_type :string(255)      not null
#  created_at   :datetime
#  updated_at   :datetime
#  source_id    :integer          not null
#  source_type  :string(255)      not null
#

class Notification < ActiveRecord::Base
  validates :user, :notable, presence: true
  
  belongs_to :user
  belongs_to :notable, polymorphic: true
  belongs_to :source, polymorphic: true
  
  def title
    return notable.title if notable_type == "Article"
    return notable.name if notable_type == "Artist"
    return notable.username if notable_type =="User"
  end
end
