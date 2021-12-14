import React, {useState} from 'react';


type PropsType = {
    incr: () => void
    counter: number
    rest: () => void
}


export const Buttons = (props: PropsType)=> {


    return(<div className='box2'>
            <span className='span'>
            <button   className='button' onClick={() => {props.incr()}}>inc</button>
            <button className='button' onClick={() => {props.rest()}}>rest</button>
            </span>
        </div>)


}