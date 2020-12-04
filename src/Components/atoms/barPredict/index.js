import React from 'react'
import './barPredict.css'

function BarPredict({data}) {
    return (
        <div className='box' >
            <p>{data.name + " : " + data.value.toFixed(2)}</p>
        </div>
    )
}

export default BarPredict
