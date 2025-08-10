import React from "react";

export interface TabSwitcherProps {
  tabs: string[];
  selectedTab: string;
  onTabChange: (tab: string) => void;
}

const TabSwitcher = (props: TabSwitcherProps) => {
  const { tabs, selectedTab, onTabChange } = props;
  return (
    <div>

    <div className="relative flex items-center p-1 rounded-full bg-[#E6EDF5]">
      {/* Barra deslizante */}
      <div
        className="absolute top-0 left-0 h-full p-1 transition-all duration-300 ease-in-out"
        style={{
          width: `calc(${100 / tabs.length}% - 8px)`, // Tamaño ajustado al padding
          transform: `translateX(calc(${tabs.indexOf(selectedTab) * 100}% + ${tabs.indexOf(selectedTab) * 10}px))`,
          // Centrar considerando el padding
        }}
        >
        <div className="bg-[#008B00] rounded-full h-full " />
      </div>
      {tabs.map((tab) => (
        <button
        key={tab}
        onClick={() => onTabChange(tab)}
        className={`relative z-10 px-4 py-2 w-40 font-medium capitalize rounded-full transition-colors`}
        >
          <p
            className={`max-w-40 overflow-hidden ${
              selectedTab === tab
              ? "text-white font-semibold"
              : "text-[#0A1629]"
              }`}
              >
            {tab}
          </p>
        </button>
      ))}
    </div>
      </div>
  );
};

export default TabSwitcher;
