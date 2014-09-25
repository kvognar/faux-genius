class User < ActiveRecord::Base
  validates :username, :password_hash, :session_token, presence: true
  validates :username, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  
  after_initialize :ensure_session_token
  
  attr_reader :password
  
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
