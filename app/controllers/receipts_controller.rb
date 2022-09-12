class ReceiptsController < ApplicationController


    def show
        business = Business.find(params[:id])
        receipts = business.receipts.all
        render json: receipts
    end

    def create
        receipt = Receipt.create!(receipt_params)
        render json: receipt, status: :created
    end

    private

        def receipt_params
            params.permit(:name, :amount, :image, :business_id)
        end

end
