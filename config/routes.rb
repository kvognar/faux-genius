Rails.application.routes.draw do
  
  root to: 'static_pages#root'
  
  resources :users, only: [:create]
  resource :session, only: [:create, :destroy]
  
  namespace :api, defaults: { format: :json } do
    resources :articles, only: [:index, :show, :create]
    resources :annotations, only: [:create, :update, :destroy]
    resources :users, only: [:show]
    resources :suggestions, only: [:create, :destroy]
    
    get '/search/:query' => 'articles#search', as: 'search'
  end
  
end
