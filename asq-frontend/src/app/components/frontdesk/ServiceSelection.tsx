import { FileText } from 'lucide-react';

interface ServiceSelectionProps {
  animating: boolean;

  pagedServices: any[];

  handleServiceSelect: (service: any) => void;

  hasNextPage: boolean;
  hasPrevPage: boolean;

  page: number;
  totalPages: number;

  changePage: (page: number) => void;
}

const ServiceSelection : React.FC<ServiceSelectionProps> = ({
  animating,
  pagedServices,
  handleServiceSelect,

  hasNextPage,
  hasPrevPage,

  page,
  totalPages,

  changePage,
}: ServiceSelectionProps) => {
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
          Welcome!
        </h1>

        <p className="text-gray-500 text-lg">
          Select a service to start.
        </p>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {pagedServices.map(
          (data: any) => (

            <button
              key={data.id}
              onClick={() =>
                handleServiceSelect(data)
              }
              className="bg-white border-2 border-[#D1D9F0] rounded-2xl p-6 text-left hover:border-blue-500 hover:bg-blue-50 transition"
            >

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 bg-blue-300 rounded-xl flex items-center justify-center">

                  <FileText />

                </div>

                <div>

                  <h2 className="text-xl font-semibold text-gray-800">
                    {data.name}
                  </h2>

                  <p className="text-gray-500">
                    Description:
                    {" "}
                    {data.description}
                  </p>

                </div>

              </div>

            </button>
          )
        )}

        {hasNextPage && (

          <button
            onClick={() =>
              changePage(page + 1)
            }
            className="bg-linear-to-br from-[#1B4FD8] to-[#1239A6] text-white rounded-2xl p-6 text-left"
          >

            <h3 className="text-lg font-semibold">
              More Services
            </h3>

            <p className="text-white/80 text-sm">
              Page {page + 1} / {totalPages}
            </p>

          </button>
        )}

        {hasPrevPage && (

          <button
            onClick={() =>
              changePage(page - 1)
            }
            className="bg-gray-200 text-gray-700 rounded-2xl p-6 text-left"
          >

            <h3 className="text-lg font-semibold">
              Previous
            </h3>

            <p className="text-sm text-gray-500">
              Go back
            </p>

          </button>
        )}

      </div>

    </div>
  );
};

export default ServiceSelection;