import React from "react";
import "../assets/styles/FaceRecognition.css";

function FaceRecognition({ imageUrl, box }) {
    return (
        <div className='center na'>
            <div className='absolute mt2'>
                <img id="inputImage" src={ imageUrl } alt="" width='400px' height='auto' />
                <div className="bounding-box" style={{ top: box.top, left: box.left, right: box.right, bottom: box.bottom }}></div>
            </div>
        </div>
    )
}

export default FaceRecognition;