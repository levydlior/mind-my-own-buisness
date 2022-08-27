class BusinessesController < ApplicationController


    def index 
        render json: Business.all
    end

end
