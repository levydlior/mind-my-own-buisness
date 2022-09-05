import React from 'react'

function ReceiptCard(receipt) {
  return (
    <div>
      <h2>{receipt.receipt.name}</h2>
      <img src={receipt.receipt.image} alt='receipt image'/>
      <h3>Amount: {receipt.receipt.amount}</h3>
      </div>
  )
}

export default ReceiptCard