import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'


interface businessItemProps {
    id: number, 
    name: string
}

interface BusinessProps {
    name: string,
    amount: number,
    id: number,
    image: string,
    business: businessItemProps,
}


function Business() {

    const [receipts, setReceipts] = useState<BusinessProps[]>([])

    const params: any  = useParams()
   const {businessId} = params
   
   console.log(businessId)
    useEffect(() => {
        fetch(`/receipts/${businessId}`)
            .then(r => r.json())
            .then(res => setReceipts(res[0]))
    },[params])

    console.log(receipts)
    if (!receipts){
        return <div></div>
    }
  return (
    <div>
        {/* <h2>{receipts.business.name}</h2> */}
    </div>
  )
}

export default Business