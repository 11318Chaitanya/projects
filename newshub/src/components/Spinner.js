import React from 'react';
import loader from './Filled fading balls.gif';

const Spinner = ()=> {
    return (
      <div className='text-center my-3'>
        <img src={loader} alt="Loading Please wait..." />
      </div>
    )
}

export default Spinner
