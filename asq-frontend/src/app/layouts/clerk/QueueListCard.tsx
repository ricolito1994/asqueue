import React, { useState, useEffect, useRef, useContext } from "react";

import AsDataTable from "@components/commons/AsDataTable";
import { PaginationMeta } from "@components/commons/AsDataTable/types";
import { ColumnDef } from "@tanstack/react-table";

import { QueueManagerService } from "@services/QueueManagerService";

import { AppContext } from "@context/AppContext";

import dayjs from 'dayjs';

import useEcho from "@hooks/useEcho";

import useQueue from "@hooks/useQueue"

type QueueRow = {
  queue_number: number;
  status: string;
  process_end_at: string | null;
  concern: {
    name: string;
  };
};

const columns: ColumnDef<QueueRow>[] = [
  {
    accessorKey: "queue_number",
    header: "Queue Number",
  },
  {
    accessorKey: "concern.name",
    header: "Service",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const data = row.original;
      return data.process_end_at ? "Done" : data.status;
    },
  },
];

const QueueListCard: React.FC<any> = (): React.ReactElement => {
  const sock = useEcho();

  const { enqueue } = useQueue({
    options: {
      delay: 1000,
    }
  })

  const [queueData, setQueueData] = useState<QueueRow[]>([]);
  const [loading, setLoading] = useState(false);

  const { user, userWindow, setUser } = useContext(AppContext);

  const [currentPage, setCurrentPage] = useState(1);

  const now = dayjs()
  

  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta>({
    currentPage: 1,
    perPage: 10,
    total: 0,
    lastPage: 1,
  });

  const onRefreshToken = (data: any) => {
    setUser((prev: any) => ({
      ...prev,
      access_token: data.access_token,
      refresh_token: data.refresh_token,
    }));
  };

  const qm = useRef(
    new QueueManagerService(
      user?.access_token ?? null,
      null,
      user?.refresh_token,
      onRefreshToken,
    ),
  );

  const fetchQueueLogsService = useRef(
    new QueueManagerService(
      user?.access_token ?? null,
      null,
      user?.refresh_token,
      onRefreshToken,
    ),
  );

  const fetchQueue = async () => {
    try {
      setLoading(true);

      const res = await fetchQueueLogsService.current.indexTransactions(
        currentPage,
        null,
        {
          params: {
            company_id: user?.user?.company_id,
            department_id: user?.user?.department_id,
            window_id: userWindow?.id,
            status: "all",

            from_date: now.format("YYYY-MM-DD"),
            to_date: now.format("YYYY-MM-DD"),
        },
        },
      );

      setQueueData(res?.data ?? []);
      setPaginationMeta({
        currentPage: res.current_page,
        perPage: res.per_page,
        total: res.total,
        lastPage: res.last_page,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  if (!userWindow?.id) return;

  fetchQueue();
}, [currentPage, userWindow?.id]);

useEffect(() => {
  const channel = `dashboard.update.department.${user?.user?.department_id}.company.${user?.user?.company_id}`;

  let dashboardChannel = sock.channel(channel);

  dashboardChannel.listen('UpdateQueueListEvent', (e:any) => {
    e['cb'] = (): Promise <void> => {
      return new Promise(async(resolve, reject) => {
        try {
          // implement your logic to update queuelist here
          await fetchQueue()
          resolve();
        } catch (e) {
          console.error(e)
          reject(e)
        }
      })
    }
    enqueue(e)
  })
        
  return () => {
    sock.leave(channel);
  }
}, [])


  return (
    <div className="flex flex-col bg-white border border-[#dde4ef] rounded-xl overflow-hidden h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#dde4ef]">
        <div className="flex items-center gap-2">
          <i
            className="ti ti-refresh text-[15px] text-blue-600"
            aria-hidden="true"
          />
          <span className="text-[12px] font-medium text-blue-600 uppercase tracking-wider">
            Queue List
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md overflow-hidden p-4">
        <AsDataTable
          data={queueData}
          columns={columns}
          loading={loading}
          pagination
          paginationMeta={paginationMeta}
          onPageChange={(page) => {
            setCurrentPage(page);
          }}
        />
      </div>
    </div>
  );
};

export default QueueListCard;
