import React, {
  useEffect
} from 'react'

import {
  ArrowLeftToLine,
  SquareUserRound,
} from 'lucide-react';

interface WindowSelectionProps {
  animating: boolean;
  selectedService: any;
  isLoading?: boolean;
  handleWindowSelect: (window: any) => void;
  setScreen: (screen: string) => void;
}

const WindowSelection : React.FC<WindowSelectionProps> = ({
  animating,
  selectedService,
  isLoading = false,
  handleWindowSelect,
  setScreen,
}: WindowSelectionProps) => {
  return (
    <div
      className={`w-full max-w-6xl transition-opacity duration-150 ${
        animating
          ? "opacity-40"
          : "opacity-100"
      }`}
    >

      <div className="text-center mb-10 mt-10 px-4">

        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Choose Window
        </h1>

        <p className="text-gray-500 text-lg">
          {selectedService?.name}
        </p>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {selectedService?.windows?.map(
          (window: any) => (

            <button
              key={window.id}
              onClick={() =>
                handleWindowSelect(window)
              }
              className={`bg-white border-2 border-[#D1D9F0] rounded-2xl p-6 text-left hover:border-blue-500 hover:bg-blue-50 transition ${(!window.is_active || isLoading) && `pointer-events-none opacity-50 cursor-not-allowed`}`}
            >

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 bg-blue-300 rounded-xl flex items-center justify-center">
                  <SquareUserRound />
                </div>

                <div>

                  <h2 className="text-xl font-semibold text-gray-800">
                    {window.name}
                  </h2>

                  <p className="text-gray-500">
                    {window.description}
                  </p>

                </div>

              </div>

            </button>
          )
        )}

        {/* BACK BUTTON */}

        <button
          onClick={() =>
            setScreen("select")
          }
          className={`bg-gray-200 text-gray-700 rounded-2xl p-6 text-left hover:bg-blue-400 hover:text-white transition 
            ${(isLoading) && `pointer-events-none opacity-50 cursor-not-allowed`}`}
        >

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center hover:bg-gray-700 transition">
              <ArrowLeftToLine className="text-white" />
            </div>

            <div>

              <h3 className="text-lg font-semibold">
                Back
              </h3>

              <p className="text-sm">
                Return to services
              </p>

            </div>

          </div>

        </button>

      </div>

    </div>
  );
};

export default WindowSelection;