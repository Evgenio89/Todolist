import React, {useState} from 'react';

type counterType = {
    counter: number
}

export const Tablo = (props: counterType) => {



    return(<div className='counter'>
        {props.counter}
    </div>)


}