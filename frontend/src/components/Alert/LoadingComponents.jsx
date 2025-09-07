import React from 'react'
import ReactLoading from 'react-loading'

function LoadingComponents() {
  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",

    }}>
        <ReactLoading type="spin" color="green"/>
    </div>
  );
}

export default LoadingComponents