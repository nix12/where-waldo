Rails.application.routes.draw do
  root 'maps#index'

  resources :maps, only: [:index, :show] do
    resources :scores, only: [:index, :create]
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
