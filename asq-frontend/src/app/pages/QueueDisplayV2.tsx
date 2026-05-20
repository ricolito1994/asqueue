import React, {useContext, useEffect, useState, useMemo, useRef} from 'react'

import WaitingList from '@components/queue-display/WaitingList'
import TellerCard from '@components/queue-display/TellerCard'
import MediaPanel from '@components/queue-display/MediaPanel'
import DeptDisplay from '@components/queue-display/DeptDisplay'

import {} from 'antd'

import '@styles/QueueDisplayV2.css'

import vid from '@assets/promotion_video.mp4'

import { TTSService } from '@services/TTSService';

import { QueueManagerService } from '@services/QueueManagerService';

import { useParams } from 'react-router-dom';

import useEcho from '@hooks/useEcho';

import AuthenticationService from '@services/AuthenticationService';

import dayjs from 'dayjs';

const textToAnnounce = [
  "Please have your ID ready when your number is called.",
  "Enrollment payments are accepted until 5PM.",
  "Window 3 is temporarily unavailable.",
];

const QueueDisplayV2: React.FC <any> = (): React.ReactElement => {


    const [windowData, setWindowData] = useState<any>(null)
    const [refreshWindows , setRefreshWindows] = useState<boolean>(false)
    const {companyId, departmentId, concernId} = useParams();
    const queueService = useMemo(() => new QueueManagerService(null), [])
    const queueTransactionService = useMemo(() => new QueueManagerService(null), []);
    
    const defaultDate = dayjs()
    const [fromDate, setFromDate] = useState<any | null>(defaultDate)
    const [toDate, setToDate] = useState<any | null>(defaultDate)

    const [eventQueue, setEventQueue] = useState<any []> ([]);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const sock = useEcho();
    const [nowServing, setNowServing] = useState<any>(0)
    const tts = useRef<any>(new TTSService());
    const [department , setDepartment] = useState<any>({})

    const authService = useRef(new AuthenticationService(null));

    const [waitingList, setWaitingList] = useState<any[]>([])

    const [isUpdateWaitingList, setIsUpdateWaitingList] = useState<boolean>(false)

    useEffect(() => {
            
          let windowChannelUri = `window.update.department.${departmentId}.company.${companyId}`;
          let windowChannel = sock.channel(windowChannelUri);
            
          windowChannel.listen('.window.update-queue-number', (e:any) => {
            e['cb'] = () => {
              tts.current.speak(e.message)
              setRefreshWindows(true)
              setNowServing(e.data)
            }
        
            setEventQueue((prev:any) => [...prev, e])
            })
            
            windowChannel.listen('.window.recall-queue-number',  (e:any) => {
                  e['cb'] = () => {
                    console.log("fuck", e.message)
                    tts.current.speak(e.message)
                    setNowServing(e.data)
                  }
        
                setEventQueue((prev:any) => [...prev, e])
            })
    
            windowChannel.listen('.window.update-queue-list',  (e:any) => {
                e['cb'] = () => {
                  setIsUpdateWaitingList(true)
                }
        
                setEventQueue((prev:any) => [...prev, e])
    
            })
        
        
            const getDepartment = async () => {
              try {
                let dept = await authService.current.department(parseInt(departmentId ?? ''), null)
                  setDepartment(dept)
                } catch (e) {
                  console.error(e)
               }
            }
              getDepartment()
            
              return () => {
                sock.leave(windowChannelUri)
              }
    
          }, [])
    
    
          // Implementation of FIFO queing
          useEffect(() => {
    
            const processQueue = async () => {
                    
              if (eventQueue.length == 0 || isProcessing) return;
        
              setIsProcessing(true)
        
              const currentEvent = eventQueue[0]
      
              currentEvent.cb?.();
        
              await new Promise ((resolve: any) => setTimeout(resolve, 3000))
        
              setEventQueue((prev: any) => prev.slice(1));
        
              setIsProcessing(false)
            }
        
            processQueue();
        
          }, [eventQueue, isProcessing])
    
        useEffect(() => {
    
            const fetchWindows = async () => {
              let waitingList = await queueTransactionService.indexTransactions(1, null, {
    
                params: {
                    "company_id" :  companyId,
                    "department_id":    departmentId,
                    "per_page": 8,            
                    "from_date" : !fromDate ?  null : fromDate.format('YYYY-MM-DD'),
                    "to_date" : !toDate ? null : toDate.format('YYYY-MM-DD')
                }
              });
    
              setIsUpdateWaitingList(false);
              setWaitingList(waitingList?.data)
            }
    
            fetchWindows()
        }, [isUpdateWaitingList]);
    
        useEffect ( () => {
    
              const fetchWindows = async () => {
                //setIsLoading(true)
                let windowData = await queueService.windows(1, null, {
                  params: {
                    company_id : companyId,
                    department_id : departmentId,
                    concern_id : concernId
                  }
                });
    
                setWindowData(windowData)
                setRefreshWindows(false)
              }
        
              fetchWindows()
    
              return () => {
    
              }
            }, [companyId, departmentId, refreshWindows])
    



  return (
    <div className="h-screen w-screen p-6 overflow-hidden relative">

      {/* Main container with 16:9 aspect ratio maintained */}
      <div className="h-full w-full max-w-[1920px] max-h-[1080px] mx-auto">
        <div className="h-full grid grid-cols-[35%_65%] gap-6">
          {/* Left Column - Queue Information */}
          <div className="flex flex-col gap-6 min-h-0">
            {/* Now Serving - Large display */}
            <DeptDisplay
              deptName={department?.name}
            />

            {/* Teller/Window Cards */}
            <div className="flex-1 min-h-0">
              <div className="rounded-2xl bg-card border border-border p-5 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-lg font-medium text-muted-foreground uppercase tracking-wider">
                    Service Windows
                  </h2>
                </div>
                <div className="grid grid-cols-3 gap-3 flex-1 auto-rows-fr">
 
                  {windowData?.data?.map((data: any, index: number) => (
                    <TellerCard
                      key={index}
                      windowName={data?.name}
                      currentlyServing={data.transactions[0]?.queue_number ?? 0}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Waiting List */}  
            <WaitingList
              queueNumbers={waitingList.map(
                (queue) => queue.queue_number
              )}
            />
 
          </div>

          {/* Right Column - Media/Advertisements */}
          <MediaPanel
            pathToMedia= {vid}
            textToAnnounce= {textToAnnounce}
          />
        </div>
      </div>
    </div>
  )
}

export default QueueDisplayV2;