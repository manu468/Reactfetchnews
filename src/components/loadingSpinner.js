import React from 'react';
import loading_logo from '../images/loading.svg';

export default function Loading() {
    return (
        <div className="loading">
            <img src={loading_logo}></img>
        </div>
    )
}