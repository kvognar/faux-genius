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
end
