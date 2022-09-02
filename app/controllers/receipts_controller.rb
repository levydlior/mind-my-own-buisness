class ReceiptsController < ApplicationController

    def show
        business = Business.find(params[:id])
        receipts = business.receipts.all
        render json: receipts
    end



end
