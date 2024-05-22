import React from "react";

const Suggestions = ({ data }) => {
  return (
    <ul>
      {data && data.length
        ? data.map((item, index) => <li key={index}>{item.firstName}</li>)
        : null}
    </ul>
  );
};

export default Suggestions;
