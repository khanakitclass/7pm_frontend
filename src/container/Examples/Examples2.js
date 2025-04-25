import React, { useCallback, useState } from 'react';
import ExampleList from './ExampleList';

function Examples2(props) {
  const [theme, setTheme] = useState(false);
  const [num, setNum] = useState(0);


  //without callback
  const getData = () => {
    console.log("cssdcsd");

    return [num, num+1, num+2];
  }

  //With Callback
  // const getData = useCallback(() => {
  //   console.log("cssdcsd");
    
  //   return [num, num+1, num+2];
  // }, [num])


  const themeStyle = {
    backgroundColor: theme ? 'black' : 'white',
    color: theme ? 'white' : 'black'
  }
  
  return (
    <div style={themeStyle}>
      <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      <button onClick={() => setTheme(!theme)}>Change Theme</button>

      <input type='text' name='num' onChange={(e) => setNum(parseInt(e.target.value))} />

      <ExampleList data={getData} />
    </div>
  );
}

export default Examples2;