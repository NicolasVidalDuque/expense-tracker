import React from 'react';
import { ProgressBar, Stack } from 'react-bootstrap';

function setProgressVariant(percentage){
    if (percentage < 50) return 'primary'
    if (percentage < 70) return 'success'
    if (percentage < 85) return 'warning'
    return 'danger'
}

function Navbar(props){
    const percentage = props.percentage.toFixed(1)
    
    return(
        <nav className='fixed-top pt-3'>   
            <Stack>
                <Stack  className='px-1 d-flex justify-content-between' direction='horizontal'>
                    <h2 className='my-0'>Available</h2>
                    <p className='px-1 my-0'><span className='text-muted fs-7'>Sponsored:</span> {props.sponsoredAmount}</p>
                </Stack>
                <Stack direction='horizontal' className='px-1 d-flex justify-content-between'>
                    <h3 className='my-0'>{props.amountLeft}</h3>
                    <h4>{props.totalExpense} / <span className='text-muted fs-6 '>{props.budget}</span></h4>
                </Stack>
                <div className="rounded-pill px-2 pb-2">
                    <ProgressBar now={percentage} variant={setProgressVariant(percentage)} label={`${percentage}%`} />
                </div>
            </Stack>
        </nav>
    );
}

export default Navbar