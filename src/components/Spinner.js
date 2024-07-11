
import spin from "./spin.gif";

const Spinner = ()=> {
  
    return (
      <div className="text-center">
            <img src={spin} alt="loding" />
      </div>
    )
  
}
export default Spinner;


// class based

// import React, { Component } from 'react'
// import spin from "./spin.gif";

// export default class Spinner extends Component {
//   render() {
//     return (
//       <div className="text-center">
//             <img src={spin} alt="loding" />
//       </div>
//     )
//   }
// }