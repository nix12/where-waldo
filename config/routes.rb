Rails.application.routes.draw do
  root 'maps#index'

  resources :maps, only: [:index, :show]

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
