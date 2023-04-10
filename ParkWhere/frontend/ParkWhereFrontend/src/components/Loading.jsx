import React from 'react';
import './Loading.css';

function Loading() {
    return (
        <div style={{ position: 'relative', height: '100vh' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <img className="loading-circle" src="src/assets/loading.gif" style={{ width: '100px', height: '100px', animation: 'spin 2s linear infinite' }} />
            </div>
        </div>
    );
}

export default Loading;