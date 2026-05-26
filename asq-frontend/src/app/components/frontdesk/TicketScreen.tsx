interface TicketScreenProps {
  ticketNumber: string;
  selectedService: any;
  selectedWindow: any;
  issuedTime: Date | null;
  formatTime: (time: Date) => string;
  handleNewTransaction: () => void;
}

const TicketScreen: React.FC<TicketScreenProps> = ({
  ticketNumber,
  selectedService,
  selectedWindow,
  issuedTime,
  formatTime,
  handleNewTransaction,
}: TicketScreenProps) => {

  return (
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
  );
};

export default TicketScreen;