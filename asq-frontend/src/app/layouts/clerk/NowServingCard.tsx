import React , {
    useState,
    useRef,
    useContext
}
from 'react';

import { AppContext } from '@context/AppContext';

import { ArrowRightToLine, Megaphone } from "lucide-react";

import { notification } from "antd";

import { useClock } from "@hooks/useClock";

import { QueueManagerService } from '@services/QueueManagerService';

import AsConfirmModal from '@/app/components/modals/AsConfirmModal';

const NowServingCard: React.FC<any> = (): React.ReactElement => {

  const t = useClock();

  const [api, contextHolder] = notification.useNotification();

  const [currentQueueNum, setCurrentQueueNum] = useState<number>(0);
  
  const [currentConcernName, setCurrentConcernName] = useState<any>("");

  const [isOpenQueueActionModal, setIsOpenQueueActionModal] = useState<boolean>(false)

  const [isPriority, setIsPriority] = useState<boolean>(false)

  const [isOpenPriorityQueueActionModal, setIsOpenPriorityQueueActionModal] = useState<boolean>(false)

  const [isQueueListLoading, setIsQueueListLoading]  = useState<boolean>(true)

    const onRefreshToken = (data: any) => {
        setUser((prev: any) => ({
            ...prev,
            access_token: data.access_token,
            refresh_token: data.refresh_token
        }))
    }

  const {
        user,
        userWindow,
        setUser
    } = useContext(AppContext)

    const qm = useRef(new QueueManagerService(
        user?.access_token ?? null, 
        null, 
        user?.refresh_token,
        onRefreshToken
    ));

   const processNextQueueNumber = async (
          next: boolean = true, 
          isPriority: boolean = false
      ) => {
          try {
              if (next) {
                  let params: any = {
                      "company_id" : user?.user?.company_id,
                      "department_id": user?.user?.department_id,
                      "window_id" : userWindow?.id,
                      "is_priority" : isPriority
                  };

                  // if (isPriority) {
                  //     params = {...params, is_priority: isPriority}
                  // }

                  let res = await qm.current.processQueueNumber(params)
                  
                  setCurrentQueueNum(res?.queue_number)
                  setCurrentConcernName(res?.concern.name)
                  setIsPriority(res?.is_priority)
              } else {
                  await qm.current.recallQueueNumber(currentQueueNum, null, {
                      params : {
                          "company_id" : user?.user?.company_id,
                          "department_id": user?.user?.department_id,
                          "window_id" : userWindow.id
                      }
                  })
              }

              api.open({
                  title: "Success",
                  description: "success",
                  type: 'success'
              })
              
          } catch (e: any) {
              if (e.response) {
                  api.open({
                      title: e.response.data.message,
                      description: e.response.data.reason,
                      type: 'error'
                  })
              } else {
                  console.error(e)
              }
          } finally {
              setIsOpenQueueActionModal(false)
              setIsOpenPriorityQueueActionModal(false)
              setIsQueueListLoading(true)
          }
      }

  return (
    <div className="flex flex-col bg-white border border-[#dde4ef] rounded-xl overflow-hidden h-full">
      {contextHolder}

<AsConfirmModal 
                title='Next'
                content='What do you want to do?'
                isOpen={isOpenQueueActionModal}
                onOk={() => processNextQueueNumber(true, false)}
                onDeny={()=> processNextQueueNumber(false)}
                okText='Next Number'
                denyText='Recall Number'
            />
            <AsConfirmModal 
                title='Priority'
                content='What do you want to do?'
                isOpen={isOpenPriorityQueueActionModal}
                onOk={() => processNextQueueNumber(true, true)}
                onDeny={()=> processNextQueueNumber(false)}
                okText='Next Number'
                denyText='Recall Number'
            />
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[#dde4ef]">
        <i className="ti ti-player-play text-[15px] text-blue-600" aria-hidden="true" />
        <span className="text-[12px] font-medium text-blue-600 uppercase tracking-wider">
          Now Serving
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col items-center justify-center flex-1 px-4 py-6">
        <span className="text-[80px] font-medium text-[#0f2952] leading-none">
          {currentQueueNum}
        </span>
        <span className="text-[12px] text-[#5a7099] mt-2">
          {currentConcernName}
        </span>
      </div>

      {/* Next button */}
      <div className="px-4 flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-[13px] font-medium py-3 rounded-lg transition-colors"
        onClick={()=>setIsOpenQueueActionModal(true)}
        >
          <ArrowRightToLine />
          Next Queue Number
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-[#f0f4fa] active:scale-[0.98] text-blue-600 text-[13px] font-medium py-3 rounded-lg border border-blue-600 transition-colors">
          <Megaphone />
          Recall Number
        </button>
      </div>
      

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3 mt-3 border-t border-[#dde4ef]">
        <div>
          <span className="block text-[20px] font-medium text-[#0f2952]">
          {t.time.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
          })}
          </span>
          <span className="block text-[11px] text-[#5a7099]">
          {t.time.toLocaleDateString([], {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
          </span>
        </div>
        <i className="ti ti-clock text-[20px] text-[#c8d6ee]" aria-hidden="true" />
      </div>

    </div>
  )
}

export default NowServingCard