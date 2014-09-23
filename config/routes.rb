Rails.application.routes.draw do
  
  root to: 'static_pages#root'
  
  namespace :api, defaults: { format: :json } do
    resources :articles, only: [:index, :show, :create]
    resources :annotations, only: [:create, :update, :destroy]
  end
  
end
