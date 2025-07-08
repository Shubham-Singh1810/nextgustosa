// 'use client';
// import React, { useState } from 'react';
// import { Range } from 'react-range';

// const PriceFilter = () => {
//   const STEP = 1;
//   const MIN = 0;
//   const MAX = 500;

//   const [values, setValues] = useState([50, 300]);

//   return (
//     <div className="price-filter" style={{ width: '100%', maxWidth: '300px', margin: '0 auto' }}>
//       <h5 className="mb-5">Price</h5>
      
//       <Range
//         step={STEP}
//         min={MIN}
//         max={MAX}
//         values={values}
//         onChange={(newValues) => setValues(newValues)}
//         renderTrack={({ props, children }) => (
//           <div
//             {...props}
//             style={{
//               ...props.style,
//               height: '6px',
//               width: '100%',
//               backgroundColor: '#ddd',
//               borderRadius: '3px',
//               marginTop: '20px'
//             }}
//             className='d-flex align-items-top'
//           >
//             <div
//               style={{
//                 height: '100%',
//                 background: 'green',
//                 marginLeft: `${(values[0] / MAX) * 100}%`,
//                 width: `${((values[1] - values[0]) / MAX) * 100}%`,
//               }}
//             />
//             {children}
//           </div>
//         )}
//         renderThumb={({ props, index }) => (
//           <div
//             {...props}
//             style={{
//               ...props.style,
//               height: '15px',
//               width: '15px',
//               backgroundColor: 'white',
//               border: '2px solid green',
//               borderRadius: '50%',
//             }}
//           >
//             <div
//               style={{
//                 position: 'absolute',
//                 top: '-25px',
//                 color: '#000',
//                 fontSize: '12px',
//                 fontWeight: 'bold',
//               }}
//             >
//               ₹{values[index]}
//             </div>
//           </div>
//         )}
//       />

//       <p className="mt-3">
//         Price: ₹{values[0]} - ₹{values[1]}
//       </p>
//     </div>
//   );
// };

// export default PriceFilter;

'use client';
import React, { useState } from 'react';
import { Range } from 'react-range';

const PriceFilter = ({values , setValues}) => {
  const STEP = 1;
  const MIN = 0;
  const MAX = 2000;

  // const [values, setValues] = useState([50, 300]);

  return (
    <div className="price-filter" style={{ width: '100%', maxWidth: '300px', margin: '0 auto' }}>
      <h5 className="mb-5">Price</h5>
      
      <Range
        step={STEP}
        min={MIN}
        max={MAX}
        values={values}
        onChange={(newValues) => setValues(newValues)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '6px',
              width: '100%',
              backgroundColor: '#ddd',
              borderRadius: '3px',
              marginTop: '20px'
            }}
            className='d-flex align-items-top'
          >
            <div
              style={{
                height: '100%',
                background: 'green',
                marginLeft: `${(values[0] / MAX) * 100}%`,
                width: `${((values[1] - values[0]) / MAX) * 100}%`,
              }}
            />
            {children}
          </div>
        )}
        renderThumb={({ props, index }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '15px',
              width: '15px',
              backgroundColor: 'white',
              border: '2px solid green',
              borderRadius: '50%',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-25px',
                color: '#000',
                fontSize: '12px',
                fontWeight: 'bold',
              }}
            >
              ₹{values[index]}
            </div>
          </div>
        )}
      />

      <p className="mt-3">
        Price: ₹{values[0]} - ₹{values[1]}
      </p>
    </div>
  );
};

export default PriceFilter;
