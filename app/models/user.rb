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

class User < ActiveRecord::Base
  validates :username, :password_hash, :session_token, presence: true
  validates :username, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  
  after_initialize :ensure_session_token
  
  attr_reader :password
  
  has_many(
    :authored_annotations,
    class_name: "Annotation",
    foreign_key: :author_id
  )
  
  has_many(
    :authored_suggestions,
    class_name: "Suggestion",
    foreign_key: :author_id,
  )
  
  has_many(
    :submitted_articles,
    class_name: "Article",
    foreign_key: :submitter_id,
  )
  
  has_many :followings, class_name: "Relationship", as: :followed
  has_many :followers, through: :followings
  
  has_many(
    :relationships,
    class_name: "Relationship",
    foreign_key: :follower_id,
  )
  
  has_many :followed_users, 
            through: :relationships,
            source: :followed,
            source_type: "User"
  
  has_many :followed_articles, 
            through: :relationships, 
            source: :followed,
            source_type: "Article"
            
  has_many :followed_artists,
            through: :relationships,
            source: :followed,
            source_type: "Artist"
            
  def followed_items
    followed_items = {}
    followed_items[:users] = relationships.pluck(:followed_id, :followed_type)
                                          .select {|r| r[1] == "User"}
    followed_items
  end
  
  def password=(password)
    @password = password
    self.password_hash = BCrypt::Password.create(password)
  end
  
  def self.find_by_credentials(creds)
    user = User.find_by_username(creds[:username])
    user && user.is_password?(creds[:password]) ? user : nil
  end
  
  def is_password?(password)
    BCrypt::Password.new(self.password_hash).is_password?(password)
  end
  
  def reset_session_token!
    self.session_token = generate_token
    self.save!
    self.session_token
  end
  
  private
  
  def generate_token
    SecureRandom::urlsafe_base64(16)
  end
  
  def ensure_session_token
    self.session_token ||= generate_token
  end
  
  
end
