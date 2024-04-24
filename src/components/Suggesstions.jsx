/* eslint-disable react/prop-types */
function Suggesstions({ data, handleClick }) {
  return (
    <ul>
      {data && data.length
        ? data.map((item, index) => (
            <li className=' cursor-pointer ' onClick={handleClick} key={index}>
              {item}
            </li>
          ))
        : null}
    </ul>
  );
}

export default Suggesstions;
