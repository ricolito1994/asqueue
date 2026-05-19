import { useState, useEffect, useMemo } from "react";

interface Service {
  id: number;
  name: string;
  prefix: string;
  icon: string;
}

const services: Service[] = [
  { id: 1, name: "Payments", prefix: "P", icon: "ti ti-credit-card" },
  { id: 2, name: "Loans", prefix: "L", icon: "ti ti-building-bank" },
  { id: 3, name: "Customer Support", prefix: "C", icon: "ti ti-headset" },
  { id: 4, name: "Insurance", prefix: "I", icon: "ti ti-shield-check" },
  { id: 5, name: "Appointments", prefix: "A", icon: "ti ti-calendar" },
  { id: 6, name: "Documents", prefix: "D", icon: "ti ti-file-text" },
];

export default function FrontDeskLayout() {
  const [screen, setScreen] = useState<"select" | "ticket">("select");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [ticketNumber, setTicketNumber] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  const [page, setPage] = useState(0);
  const [animating, setAnimating] = useState(false);

  const PAGE_SIZE = 5;

  const totalPages = Math.ceil(services.length / PAGE_SIZE);

  const pagedServices = useMemo(() => {
    const start = page * PAGE_SIZE;
    return services.slice(start, start + PAGE_SIZE);
  }, [page]);

  const hasNextPage = page < totalPages - 1;
  const hasPrevPage = page > 0;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

  const handleServiceSelect = (service: Service) => {
    const randomNumber = Math.floor(Math.random() * 99) + 1;

    const ticket = `${service.prefix}${randomNumber
      .toString()
      .padStart(3, "0")}`;

    setSelectedService(service);
    setTicketNumber(ticket);
    setScreen("ticket");
  };

  const handleNewTransaction = () => {
    setScreen("select");
    setSelectedService(null);
    setTicketNumber("");
    setPage(0);
  };

  const changePage = (newPage: number) => {
    if (newPage < 0 || newPage >= totalPages) return;

    setAnimating(true);
    setTimeout(() => {
      setPage(newPage);
      setAnimating(false);
    }, 120);
  };

  return (
    <div className="min-h-screen bg-[#F0F4FF] flex flex-col">

      {/* HEADER */}
      <header className="bg-white border-b border-[#D1D9F0] p-4 flex justify-between">
        <h1 className="text-2xl font-bold text-blue-600">Asqueue</h1>
        <p className="text-2xl font-mono font-semibold">
          {formatTime(currentTime)}
        </p>
      </header>

      {/* MAIN */}
      <main className="flex-1 flex items-center justify-center p-6">

        {/* SELECT SCREEN */}
        {screen === "select" && (
          <div
            className={`w-full max-w-6xl transition-opacity duration-150 ${
              animating ? "opacity-40" : "opacity-100"
            }`}
          >

            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Welcome!
              </h1>
              <p className="text-gray-500 text-lg">
                Select a service
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

              {pagedServices.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceSelect(service)}
                  className="bg-white border-2 border-[#D1D9F0] rounded-2xl p-6 text-left hover:border-blue-500 hover:bg-blue-50 transition"
                >
                  <div className="flex items-center gap-4">

                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                      <i className={`${service.icon} text-2xl text-blue-600`} />
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        {service.name}
                      </h2>
                      <p className="text-gray-500">
                        Prefix: {service.prefix}
                      </p>
                    </div>

                  </div>
                </button>
              ))}

              {/* MORE BUTTON */}
              {hasNextPage && (
                <button
                  onClick={() => changePage(page + 1)}
                  className="bg-linear-to-br from-[#1B4FD8] to-[#1239A6] text-white rounded-2xl p-6 text-left"
                >
                  <h3 className="text-lg font-semibold">More Services</h3>
                  <p className="text-white/80 text-sm">
                    Page {page + 1} / {totalPages}
                  </p>
                </button>
              )}

              {/* BACK BUTTON (optional but useful now) */}
              {hasPrevPage && (
                <button
                  onClick={() => changePage(page - 1)}
                  className="bg-gray-200 text-gray-700 rounded-2xl p-6 text-left"
                >
                  <h3 className="text-lg font-semibold">Previous</h3>
                  <p className="text-sm text-gray-500">Go back</p>
                </button>
              )}

            </div>

          </div>
        )}

        {/* TICKET SCREEN */}
        {screen === "ticket" && (
          <div className="flex flex-col items-center">

            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6">
              <i className="ti ti-check text-white text-4xl" />
            </div>

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">

              <div className="h-2 bg-yellow-400" />

              <div className="p-8 text-center">

                <p className="text-gray-500 uppercase text-sm mb-2">
                  Your Queue Number
                </p>

                <h1 className="text-6xl font-bold text-blue-600 font-mono">
                  {ticketNumber}
                </h1>

                <div className="mt-6 border-t pt-4 text-left space-y-2">

                  <div className="flex justify-between">
                    <span>Service</span>
                    <span>{selectedService?.name}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Prefix</span>
                    <span>{selectedService?.prefix}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Time</span>
                    <span className="font-mono">{formatTime(currentTime)}</span>
                  </div>

                </div>

              </div>
            </div>

            <button
              onClick={handleNewTransaction}
              className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-xl"
            >
              New Transaction
            </button>

          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t p-4 text-center text-sm text-gray-500">
        Footer
      </footer>

    </div>
  );
}