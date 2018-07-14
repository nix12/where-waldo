class ScoresController < ApplicationController
  def create
    @map = Map.find(params[:map_id])
    score = @map.scores.new(
      name: params[:score][:name], time: params[:score][:time]
    )

    if score.name == "" 
      score.name = "Unknown"
    end

    score.save
  end
  
  def index
    @map = Map.find(params[:map_id])
    @scores = @map.scores.all.order(time: :asc).limit(50)
  end
end
