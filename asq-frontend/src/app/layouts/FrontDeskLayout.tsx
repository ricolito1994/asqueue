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

import { notification } from 'antd';

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

  const [api, contextHolder] = notification.useNotification();

  const [isLoadingFrontDesk, setIsLoadingFrontDesk] = useState<boolean>(false);

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

      } catch (e: any) {
        api.open({
          message: e?.response.data.message,
          description: e?.response.data.reason,
          type: 'error'
        })
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

      setIsLoadingFrontDesk(true);

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

    } catch (e: any) {
      api.open({
        message: e?.response.data.message,
        description: e?.response.data.reason,
        type: 'error'
      })
      console.error(e);

    } finally {

      setIsLoadingFrontDesk(false);

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
      {contextHolder}
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
              isLoading={isLoadingFrontDesk}
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