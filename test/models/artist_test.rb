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

require 'test_helper'

class ArtistTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
