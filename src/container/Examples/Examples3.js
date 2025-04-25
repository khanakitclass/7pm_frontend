import React, { useEffect, useRef, useState } from 'react';

function Examples3(props) {
  const [count, setCount] = useState(0);

  const fnameRef = useRef();
  const pageCount = useRef(0);
  const prevRef = useRef('');

  useEffect(() => {

    pageCount.current += 1;

    console.log(pageCount.current);
    
    prevRef.current = fnameRef.current.value
  })
    
  
  const handleFocus = () => {
    console.log(fnameRef.current.value);
    fnameRef.current.style.backgroundColor = 'red';
  }

  console.log("okoko", pageCount.current, prevRef.current);
   

  return (
    <div>
      <br></br><br></br><br></br><br></br><br></br><br></br><br></br>

      {`Page Count: ${pageCount.current}`}
      {`Previous Value: ${prevRef.current}`}

      <input 
        type='text'
        name='fname'
        ref={fnameRef}
        onFocus={handleFocus}
      />

      <button onClick={() => setCount(count+1)}>Click Me</button>
      
    </div>
  );
}

export default Examples3;