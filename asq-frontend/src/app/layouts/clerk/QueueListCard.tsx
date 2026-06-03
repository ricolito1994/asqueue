import AsDataTable from "@components/commons/AsDataTable";
import { ColumnDef } from "@tanstack/react-table";

// const statusStyles: Record<string, string> = {
//   queue: "bg-blue-50 text-blue-800",
//   serving: "bg-green-50 text-green-800",
//   done: "bg-gray-100 text-gray-600",
// };

type QueueRow = {
  queue_number: string;
  service: string;
  status: string;
};

const data: QueueRow[] = [
  {
    queue_number: "A001",
    service: "Enrollment",
    status: "Waiting",
  },
  {
    queue_number: "A002",
    service: "Registrar",
    status: "Serving",
  },
];

const columns: ColumnDef<any>[] = [
  {
    accessorKey: "queue_number",
    header: "Queue Number",
  },
  {
    accessorKey: "service",
    header: "Service",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

const QueueListCard: React.FC<any> = (): React.ReactElement => {
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
        {/* <span className="text-[11px] text-[#5a7099]">Auto-refresh on</span> */}
      </div>

      {/* Table */}
      <div className="rounded-md overflow-hidden">
        <AsDataTable 
          data={data} 
          columns={columns} 
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-[#dde4ef]">
        <span className="text-[12px] text-[#5a7099]">
          {/* {mockRows.length} out of {mockRows.length} items */}
        </span>
        <div className="flex items-center gap-1.5">
          <button
            className="w-6.5 h-6.5 flex items-center justify-center rounded-lg border border-[#dde4ef] hover:bg-[#f0f4fa] transition-colors"
            aria-label="Previous page"
          >
            <i
              className="ti ti-chevron-left text-[13px] text-[#5a7099]"
              aria-hidden="true"
            />
          </button>
          <button
            className="w-6.5 h-6.5 flex items-center justify-center rounded-lg bg-blue-600 text-white text-[12px] font-medium"
            aria-label="Page 1"
          >
            1
          </button>
          <button
            className="w-6.5 h-6.5 flex items-center justify-center rounded-lg border border-[#dde4ef] hover:bg-[#f0f4fa] transition-colors"
            aria-label="Next page"
          >
            <i
              className="ti ti-chevron-right text-[13px] text-[#5a7099]"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QueueListCard;
