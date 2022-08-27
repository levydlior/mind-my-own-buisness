Rails.application.routes.draw do
  resources :businesses, only: [:index]
  resources :receipts
  resources :users, only: [:show, :create, :destroy]

  post "/login", to: "sessions#create"
  delete '/logout', to: 'sessions#destroy'


end
