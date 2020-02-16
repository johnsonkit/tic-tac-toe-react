import React from 'react';
function Square (props) {
  const className = props.hl ? "square hl" : "square";
  return (
    <button 
      className={className} 
      onClick={() => {props.onClick()}}
    >
      {props.value}
    </button>
  );
}

export default Square;