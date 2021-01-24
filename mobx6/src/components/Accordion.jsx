import React, { useState } from 'react';

const Accordion = (props) => {
  // Use 'activeIndex' if only one item can be open.
  // const [activeIndex, setActiveIndex] = useState(0);
  const [activeIndices, setActiveIndices] = useState(new Set());

  const onTitleClick = (index) => {
    // setActiveIndex(index);
    const newIndices = new Set(activeIndices);
    newIndices.has(index) ? newIndices.delete(index) : newIndices.add(index);
    setActiveIndices(newIndices);
  };

  const renderedItems = props.children.map((item, index) => {
    // const activeStyle = index === activeIndex ? 'active' : '';
    const activeStyle = activeIndices.has(index) ? 'active' : '';
    return (
      <React.Fragment key={index}>
        <div className={`title ${activeStyle}`} onClick={() => onTitleClick(index)}>
          <i className='dropdown icon'></i>
          {item.props.title}
        </div>
        <div className={`content ${activeStyle}`}>{item.props.children}</div>
      </React.Fragment>
    );
  });

  return <div className='ui styled accordion'>{renderedItems}</div>;
};

export default Accordion;
