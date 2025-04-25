import React, { useEffect, useState } from 'react';

function ExampleList({ data }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(data())
  }, [data])

  console.log(list);
  

  return (
    <div>
      {
        list.map((v) => (
          <p>{v}</p>
        ))
      }
    </div>
  );
}

export default ExampleList;