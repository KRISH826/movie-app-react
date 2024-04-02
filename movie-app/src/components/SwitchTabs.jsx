/** @format */

import React, { useState } from "react";

const SwitchTabs = ({ data, tabOnChange }) => {
  const [activeTabs, setactiveTabs] = useState(0);
  const [left, setleft] = useState(0);
  const activeTab = (tab, index) => {
    setleft(index * 100);
    setTimeout(() => {
      setactiveTabs(index);
    }, 300);
    tabOnChange(tab, index);
  };
  return (
    <div className='switchingTabs'>
      <div className='tabItems'>
        {data.map((tab, index) => (
          <span
            className={`tabItem ${activeTabs === index ? "active" : ""}`}
            onClick={() => activeTab(tab, index)}
            key={index}>
            {tab}
          </span>
        ))}
        <span className='movingBg' style={{ left }} />
      </div>
    </div>
  );
};

export default SwitchTabs;
