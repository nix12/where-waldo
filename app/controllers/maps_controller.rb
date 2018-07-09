class MapsController < ApplicationController
  def index
    @maps = Map.all
  end

  def show
    @map = Map.find(params[:id])

    respond_to do |format|
      format.html
      format.json { render json: @map }
      format.js { render :show }
    end
  end
end
