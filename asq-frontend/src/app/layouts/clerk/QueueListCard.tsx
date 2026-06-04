import React, { useState, useEffect, useRef, useContext } from "react";

import AsDataTable from "@components/commons/AsDataTable";
import { ColumnDef } from "@tanstack/react-table";

import { QueueManagerService } from "@services/QueueManagerService";

import { AppContext } from "@context/AppContext";

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
  const [queueData, setQueueData] = useState<QueueRow[]>([]);
  const [loading, setLoading] = useState(false);

  const { user, userWindow, setUser } = useContext(AppContext);

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
        1,
        null,
        {
          params: {
            company_id: user?.user?.company_id,
            department_id: user?.user?.department_id,
            window_id: userWindow?.id,
            status: "all",
          },
        },
      );

      setQueueData(res?.data ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

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
      <div className="rounded-md overflow-hidden">
        <AsDataTable
          data={queueData}
          columns={columns}
          loading={loading}
          pagination
          paginationMeta={{
            currentPage: 1,
            perPage: 10,
            total: 11,
            lastPage: 2,
          }}
          onPageChange={(page) => {
            console.log("Page:", page);
          }}
        />
      </div>
    </div>
  );
};

export default QueueListCard;
