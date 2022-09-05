class BusinessesController < ApplicationController


    def index 
        user = User.find(session[:user_id])
        business = user.businesses
        render json: business
    end

    def create
        business = Business.create!(business_params)
        render json: business, status: :created 
    end

    def show
        business = Business.find(params[:id])
        render json: business
    end

    def destroy
        business = Business.find(params[:id])
        business.destroy
        render json: business, status: :ok
    end


    private

    def business_params
        params.permit(:name, :user_id)
    end

end
