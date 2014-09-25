# == Schema Information
#
# Table name: suggestions
#
#  id               :integer          not null, primary key
#  author_id        :integer          not null
#  body             :text             not null
#  suggestable_id   :integer          not null
#  suggestable_type :string(255)      not null
#  created_at       :datetime
#  updated_at       :datetime
#

require 'test_helper'

class SuggestionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
