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

    def destroy
        receipt = Receipt.find(params[:id])
        receipt.destroy
        head :no_content
    end

    private

        def receipt_params
            params.permit(:name, :amount, :image, :business_id, :date_field)
        end

end
