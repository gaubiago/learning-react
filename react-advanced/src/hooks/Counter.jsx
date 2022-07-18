import React, { Fragment, useState } from "react";
import useDocumentTitle from "./useDocumentTitle";

const Counter = (props) => {
  // const array = useState(0);
  // const count = array[0];
  // const setState = array[1];

  const [count, setCount] = useState(0); // array destructuring
  const [name, setName] = useState("");

  useDocumentTitle(`${name} has clicked ${count} times!`);

  return (
    <Fragment>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <div>
        {name} has clicked {count} times!
      </div>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </Fragment>
  );
};

export default Counter;
