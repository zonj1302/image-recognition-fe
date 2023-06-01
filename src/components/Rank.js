import React from "react";

function Rank({ name, entries }) {
    console.log(entries);
    console.log(name, 'is the name', entries, 'is the entries');
    return (
        <div>
            <div className='near-black f3'>
                {`${ name }, your current entry count is ...`}
            </div>
            <div className='near-black f1'>
                { entries }
            </div>
        </div>
    )
}

export default Rank;