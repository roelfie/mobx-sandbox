import React, { useState } from 'react';

const Accordion = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onTitleClick = (index) => {
    setActiveIndex(index);
  };

  const renderedItems = props.children.map((item, index) => {
    const activeStyle = index === activeIndex ? 'active' : '';
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
