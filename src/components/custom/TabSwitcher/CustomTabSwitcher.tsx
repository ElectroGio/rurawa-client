import React from "react";

export interface CustomTabSwitcherProps {
  tabs: string[];
  selectedTab: string;
  onTabChange: (tab: string) => void;
}

const CustomTabSwitcher = ({ tabs, selectedTab, onTabChange }: CustomTabSwitcherProps) => {
  return (
    <div className="relative flex items-center bg-[#E6EDF5] p-0.5 rounded-full h-8">
      {/* Barra deslizante */}
      <div
        className="absolute top-0 left-0 h-full rounded-full bg-[#008B00] transition-transform duration-300"
        style={{
          width: `${100 / tabs.length}%`, // Ancho proporcional al número de pestañas
          transform: `translateX(${tabs.indexOf(selectedTab) * 100}%)`, // Movimiento basado en el índice de la pestaña seleccionada
        }}
      ></div>

      {/* Botones de pestañas */}
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`relative z-10 flex-1 text-center text-sm font-medium capitalize transition-colors ${
            selectedTab === tab ? "text-white" : "text-[#0A1629]"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default CustomTabSwitcher;
