import React from 'react'

export default function Spinner({ text }) {
  return (
    <div className="spinner">
		  <div className="spinner-circle"></div>
		  <div className="spinner-text">{ text }</div>
	  </div>
  )
}
