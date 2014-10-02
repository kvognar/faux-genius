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
  validates :user, :source, presence: true
  
  belongs_to :user
  belongs_to :source, polymorphic: true
    
end
