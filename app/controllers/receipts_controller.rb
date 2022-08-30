class ReceiptsController < ApplicationController

    def show
        business = Business.find(params[:id])
        receipts = business.receipts
        render json: receipts
    end



end
