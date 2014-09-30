# == Schema Information
#
# Table name: users
#
#  id            :integer          not null, primary key
#  username      :string(255)      not null
#  password_hash :string(255)      not null
#  session_token :string(255)      not null
#  created_at    :datetime
#  updated_at    :datetime
#  image_url     :string(255)
#

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
