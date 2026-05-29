import { useState, useEffect, useMemo, useRef, useContext } from "react";

import { AppContext } from '@context/AppContext';

import { useParams } from 'react-router-dom';

import AuthenticationService from '@services/AuthenticationService';

import { QueueManagerService } from '@services/QueueManagerService';

import { ArrowLeftToLine, FileText, ShipWheel, SquareUserRound } from 'lucide-react';

import { useClock } from "../hooks/useClock";

import TicketScreen from "@components/frontdesk/TicketScreen";
import WindowSelection  from "@components/frontdesk/WindowSelection";
import ServiceSelection  from "@components/frontdesk//ServiceSelection";
import ConditionalRenderingLayout from "./ConditionalRenderingLayout";

import useQueue from "@hooks/useQueue";

import useEcho from "@hooks/useEcho";

interface WindowType {
  id: number;
  name: string;
  description: string;
  assigned_to: number;
}

interface Service {
  id: number;
  name: string;
  description?: string;
  prefix?: string;
  icon?: string;
  windows?: WindowType[];
}

const FrontDeskLayout: React.FC <any> = (): React.ReactElement => {

  const [issuedTime, setIssuedTime] = useState<Date | null>(null);

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
    useState<any>({});

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

  const {enqueue} = useQueue({
    options: {
      delay: 1000
    }
  });

  const ws = useEcho();


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

        concernData = {
          ...concernData, data: concernData?.data?.map((e: any) => ({
            ...e, 
            windows: e?.windows?.map((f: any) => ({
              ...f,
              'is_active': f.sessions.length > 0
            }))
          }))
        }

        setConcernData(concernData);

      } catch (e) {
        console.error(e);
      } finally {
        setIsProcessing(false);
      }
    };

    fetchConcerns();

  }, [companyId, departmentId]);

  useEffect(() => {
    if (! concernData) return;

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

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
    
    let userActiveChannelUri = `update.user.active.department.${departmentId}.company.${companyId}`;

    let userActiveChannel = ws.channel(userActiveChannelUri);

    userActiveChannel.listen('.user.active-event', (e:any) => { 
      e['cb'] = () => {
        setConcernData((prev: any) => ({
          ...prev, 
          data: prev?.data?.map((f: any) => ({
            ...f,
            windows: f?.windows?.map((g: any) => (
              g.id == e?.data?.window_id ? {
                ...g,
                is_active: e?.data?.session_type === 'active'
              }: g
            ))
          }))
        }));
      }
      enqueue(e)
    })

    return () => {
      clearInterval(timer)
      ws.leave(userActiveChannelUri)
    };

  }, []);

  useEffect(() => {
    if (! concernData) return;

    let win = concernData?.data?.find((x: any) => x.name === selectedService?.name)?.windows;

    setSelectedService((prev: any) => ({
      ...prev,
      windows : win
    }));
  }, [concernData])

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

      const queueService =
        new QueueManagerService(null);

      const qt =
        await queueService.createQueue({
          company_id: companyId,
          window_id: window.id,
          department_id: departmentId,
          is_priority: false,
          processed_by: window.assigned_to,
          concern_id: selectedService?.id
        });

      setSelectedWindow(window);

      setTicketNumber(qt?.queue_number);

      setIssuedTime(
        new Date(qt?.created_at)
      );

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

  const handleGenerateTicket = () => {
    setIssuedTime(new Date());
  };

  const t = useClock();

  return (
    <div className="min-h-screen bg-[#F0F4FF] flex flex-col">

      {/* HEADER */}

      <header className="bg-white border-b border-[#D1D9F0] p-4 flex items-center justify-between">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
            <ShipWheel className="text-blue-600" size={28} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-blue-600 leading-tight">
              {department?.name}
            </h1>

            <p className="text-sm text-gray-950">
              {department?.company?.name}
            </p>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <p className="text-2xl font-mono text-black font-semibold">
          {t.time.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
          })}
        </p>

      </header>

      {/* MAIN */}

      <main className="flex-1 flex items-center justify-center p-6">
<<<<<<< HEAD

        {/* SELECT SCREEN */}

        {screen === "select" && (

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
                (data: any, index: number) => (

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
                    className="bg-white border-2 border-[#D1D9F0] rounded-2xl p-6 text-left hover:border-blue-500 hover:bg-blue-50 transition"
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
                className="bg-gray-200 text-gray-700 rounded-2xl p-6 text-left hover:bg-blue-400 hover:text-white transition"
              >

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center hover:bg-gray-700 transition">
                    <ArrowLeftToLine className="text-white"/>
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
        )}

        {/* TICKET SCREEN */}

        {screen === "ticket" && (

          <div className="flex flex-col items-center">

            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mb-6">

              <i className="ti ti-check text-white text-4xl" />

            </div>

            <div className="bg-white rounded-2xl shadow-xl w-full min-w-125 overflow-hidden">
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

                    <span className="font-bold">Service</span>

                    <span className="text-sm">
                      {selectedService?.name}
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span className="font-bold">Window</span>

                    <span className="text-sm">
                      {selectedWindow?.name}
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span className="font-bold">Time</span>

                    <span className="font-mono">
                      {issuedTime && formatTime(issuedTime)}
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

=======
        <ConditionalRenderingLayout
          condition={
            screen === "select"
          }
          elseRender={''}
        >
          <ServiceSelection
              animating={animating}
              pagedServices={pagedServices}
              handleServiceSelect={handleServiceSelect}

              hasNextPage={hasNextPage}
              hasPrevPage={hasPrevPage}

              page={page}
              totalPages={totalPages}

              changePage={changePage}
            />
        </ConditionalRenderingLayout>

        <ConditionalRenderingLayout
          condition={
            screen === "window"
          }
          elseRender={''}
        >
          <WindowSelection
              animating={animating}
              selectedService={selectedService}
              handleWindowSelect={handleWindowSelect}
              setScreen={(s: string) =>
                setScreen(s as "select" | "window" | "ticket")
              }
            />
        </ConditionalRenderingLayout>

        <ConditionalRenderingLayout
          condition={
            screen === "ticket"
          }
          elseRender={''}
        >
          <TicketScreen
              ticketNumber={ticketNumber}
              selectedService={selectedService}
              selectedWindow={selectedWindow}
              issuedTime={issuedTime}
              formatTime={formatTime}
              handleNewTransaction={handleNewTransaction}
            />
        </ConditionalRenderingLayout>
>>>>>>> ae3baedff7bae38ad2baedc0fd3e58f7add52dc1
      </main>

      {/* FOOTER */}

      <footer className="bg-white border-t p-4 text-center text-sm text-gray-500">

        <p className="italic">
          Having trouble? Please feel free approach the counter for assistance.
        </p>

      </footer>

    </div>
  );
}


export default FrontDeskLayout;