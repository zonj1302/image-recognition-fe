import React from "react";
import "../assets/styles/ImageLinkForm.css";

function ImageLinkForm({ onInputChange, onSubmit }) {
    return (
        <div>
            <p className='mid-gray f3'>
                {'This will detect faces to your photos...'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input 
                        className='f4 pa2 w-70 center' 
                        type='text' 
                        onChange={ onInputChange }
                    />
                    <button 
                        className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' 
                        onClick={ onSubmit } 
                    >
                        Detect
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;