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

require 'test_helper'

class ArticleTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
