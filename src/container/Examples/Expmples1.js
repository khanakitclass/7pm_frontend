import React, { useMemo, useState } from 'react';

function Expmples1(props) {
  const [count, setCount] = useState(0);
  const [fact, setFact] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  }

  const handleFact = (val) => {
    setFact(val);
  }

  const calcFact = () => {
    console.log("calcFact");
    
    let factAns= 1;

    for (let i=fact; i>=1; i--) {
      factAns = factAns * i;
    }

    return factAns;
  }

  //without useMemo
  // const factAns = calcFact();

  const factAns = useMemo(() => {
    return calcFact();
  }, [fact])


  return (
    <div>
      <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Counter</button>

      <p>Factorial ans: {factAns}</p>
      <input type='number' name='fact' onChange={(e) => handleFact(e.target.value)} />
    </div>
  );
}

export default Expmples1;