import { useState, useEffect, useMemo, useRef, useContext } from "react";

import { AppContext } from '@context/AppContext';

import { useParams } from 'react-router-dom';

import AuthenticationService from '@services/AuthenticationService';

import { QueueManagerService } from '@services/QueueManagerService';

interface WindowType {
  id: number;
  name: string;
  description: string;
}

interface Service {
  id: number;
  name: string;
  description?: string;
  prefix?: string;
  icon?: string;
  windows?: WindowType[];
}

export default function FrontDeskLayout() {

  const [screen, setScreen] = useState<
    "select" | "window" | "ticket"
  >("select");

  const [selectedService, setSelectedService] =
    useState<Service | null>(null);

  const [selectedWindow, setSelectedWindow] =
    useState<WindowType | null>(null);

  const [ticketNumber, setTicketNumber] =
    useState("");

  const [currentTime, setCurrentTime] =
    useState(new Date());

  const [page, setPage] = useState(0);

  const [animating, setAnimating] =
    useState(false);

  const PAGE_SIZE = 8;

  const {
    companyId,
    departmentId,
    concernId,
  } = useParams();

  const authService =
    useRef(new AuthenticationService(null));

  const [department, setDepartment] =
    useState<any>(null);

  const {
    isProcessing,
    setIsProcessing
  } = useContext(AppContext);

  const queueService = useMemo(
    () => new QueueManagerService(null),
    []
  );

  const [concernData, setConcernData] =
    useState<any>(null);

  /*
    PAGINATION
  */

  const totalPages = Math.ceil(
    (concernData?.data?.length || 0) / PAGE_SIZE
  );

  const pagedServices = useMemo(() => {

    const start = page * PAGE_SIZE;

    return concernData?.data?.slice(
      start,
      start + PAGE_SIZE
    ) || [];

  }, [page, concernData]);

  const hasNextPage = page < totalPages - 1;

  const hasPrevPage = page > 0;

  /*
    CLOCK
  */

  useEffect(() => {

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);

  }, []);

  /*
    DEPARTMENT
  */

  useEffect(() => {

    const getDepartment = async () => {

      try {

        let dept =
          await authService.current.department(
            parseInt(departmentId ?? ''),
            null
          );

        setDepartment(dept);

      } catch (e) {
        console.error(e);
      }
    };

    getDepartment();

  }, []);

  /*
    FETCH CONCERNS
  */

  useEffect(() => {

    const fetchConcerns = async () => {

      try {

        setIsProcessing(true);

        let concernData =
          await queueService.concerns(
            1,
            null,
            {
              params: {
                company_id: companyId,
                department_id: departmentId
              }
            }
          );

        setConcernData(concernData);

      } catch (e) {

        console.error(e);

      } finally {

        setIsProcessing(false);

      }
    };

    fetchConcerns();

    return () => {

    };

  }, [companyId, departmentId]);

  /*
    FORMAT TIME
  */

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

  /*
    SELECT SERVICE
  */

  const handleServiceSelect = (
    service: Service
  ) => {

    setSelectedService(service);

    setSelectedWindow(null);

    setScreen("window");
  };

  /*
    SELECT WINDOW
  */

  const handleWindowSelect = async (
    window: WindowType
  ) => {

    try {

      setIsProcessing(true);

      /*
        TEMPORARY TICKET GENERATOR
        REPLACE WITH REAL API LATER
      */

      const randomNumber =
        Math.floor(Math.random() * 99) + 1;

      const prefix =
        selectedService?.prefix ?? "Q";

      const ticket =
        `${prefix}${randomNumber
          .toString()
          .padStart(3, "0")}`;

      setSelectedWindow(window);

      setTicketNumber(ticket);

      setScreen("ticket");

    } catch (e) {

      console.error(e);

    } finally {

      setIsProcessing(false);

    }
  };

  /*
    RESET FLOW
  */

  const handleNewTransaction = () => {

    setScreen("select");

    setSelectedService(null);

    setSelectedWindow(null);

    setTicketNumber("");

    setPage(0);
  };

  /*
    PAGINATION
  */

  const changePage = (newPage: number) => {

    if (
      newPage < 0 ||
      newPage >= totalPages
    ) return;

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

        <h1 className="text-2xl font-bold text-blue-600">

          {department?.name}

          <p className="text-sm text-black">
            {department?.company?.name}
          </p>

        </h1>

        <p className="text-2xl font-mono text-gray-500 font-semibold">
          {formatTime(currentTime)}
        </p>

      </header>

      {/* MAIN */}

      <main className="flex-1 flex items-center justify-center p-6">

        {/* SELECT SCREEN */}

        {screen === "select" && (

          <div
            className={`w-full max-w-6xl transition-opacity duration-150 ${
              animating
                ? "opacity-40"
                : "opacity-100"
            }`}
          >

            <div className="text-center mb-10 fixed top-30 left-1/2 transform -translate-x-1/2">

              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Welcome!
              </h1>

              <p className="text-gray-500 text-lg">
                Select a service to start.
              </p>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

              {pagedServices.map(
                (data: any, index: number) => (

                  <button
                    key={data.id}
                    onClick={() =>
                      handleServiceSelect(data)
                    }
                    className="bg-white border-2 border-[#D1D9F0] rounded-2xl p-6 text-left hover:border-blue-500 hover:bg-blue-50 transition"
                  >

                    <div className="flex items-center gap-4">

                      <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">

                        <i className={`${data.icon ?? 'Ship'} text-2xl text-blue-600`} />

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

              {/* MORE BUTTON */}

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

              {/* BACK BUTTON */}

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
        )}

        {/* WINDOW SCREEN */}

        {screen === "window" && (

          <div
            className={`w-full max-w-6xl transition-opacity duration-150 ${
              animating
                ? "opacity-40"
                : "opacity-100"
            }`}
          >

            <div className="text-center mb-10 fixed top-30 left-1/2 transform -translate-x-1/2">

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
                    className="bg-white border-2 border-[#D1D9F0] rounded-2xl p-6 text-left hover:border-blue-500 hover:bg-blue-50 transition"
                  >

                    <div className="flex items-center gap-4">

                      <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">

                        <i className="ti ti-building text-2xl text-blue-600" />

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
                className="bg-gray-200 text-gray-700 rounded-2xl p-6 text-left"
              >

                <h3 className="text-lg font-semibold">
                  Back
                </h3>

                <p className="text-sm text-gray-500">
                  Return to services
                </p>

              </button>

            </div>

          </div>
        )}

        {/* TICKET SCREEN */}

        {screen === "ticket" && (

          <div className="flex flex-col items-center">

            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mb-6">

              <i className="ti ti-check text-white text-4xl" />

            </div>

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">

              <div className="h-2 bg-blue-400" />

              <div className="p-8 text-center">

                <p className="text-gray-500 uppercase text-sm mb-2">
                  Your Queue / Ticket Number
                </p>

                <h1 className="text-6xl font-bold text-blue-600 font-mono">
                  {ticketNumber}
                </h1>

                <div className="mt-6 border-t pt-4 text-left space-y-2 text-gray-500">

                  <div className="flex justify-between">

                    <span>Service</span>

                    <span>
                      {selectedService?.name}
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span>Window</span>

                    <span>
                      {selectedWindow?.name}
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span>Time</span>

                    <span className="font-mono">
                      {formatTime(currentTime)}
                    </span>

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

        <p className="italic">
          Please approach the counter for help.
        </p>

      </footer>

    </div>
  );
}