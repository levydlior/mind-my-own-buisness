Rails.application.routes.draw do
  resources :businesses
  resources :receipts, only: [:show, :create, :destroy]
  resources :users, only: [:show, :create, :destroy]

  post "/login", to: "sessions#create"
  delete '/logout', to: 'sessions#destroy'

  get '*path',
  to: 'fallback#index',
  constraints: ->(req) { !req.xhr? && req.format.html? }

end
