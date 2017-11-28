import React from 'react';
import Client from './Client.js';
import Notifications, {notify} from 'react-notify-toast';

const leave = () => {
  Client.post('/logout', 'POST', {}, (data, err) => {
    if (err)
      console.log(err);
    window.location = '/';
  });
}

// export const AlertBox = (props) => {
//   const msg = props.msg;
//   const severity = props.severity;
//   const alertClass = severity === 'ok' ? 'alert-ok':'alert-warn';
//   return (
//     <div className={alertClass}>
//       {msg}
//     </div>
//   );
// }

export const HeaderPanel = (props) => {
  return(
    <div>
      <header className="App-header">
      <span className="App-title">BL Grooming</span>
        <span className="logoff" onClick={leave}>
        <img src="/power-standby.svg" style={ {height: "1.5em", width: "1.5em", marginTop: "-5px"} }/></span>
      </header>
      <Notifications style={ {width: "100%"} } />
    </div>
  );
}