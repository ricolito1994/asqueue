import {
  DeptDisplay,
  WaitingList,
  TellerCard,
  MediaPanel,
} from "@components/queue-display"

import React, {useContext, useEffect, useState, useMemo, useRef} from 'react'

import {} from 'antd'

import '@styles/QueueDisplay02.css'

import vid from '@assets/promotion_video.mp4'

import { TTSService } from '@services/TTSService';

import { QueueManagerService } from '@services/QueueManagerService';

import { useParams } from 'react-router-dom';

import useEcho from '@hooks/useEcho';

import AuthenticationService from '@services/AuthenticationService';


// Sample data - replace with real-time data in production
const sampleData = {
  nowServing: {
    queueNumber: "A042",
    windowLabel: "Window 3",
  },
  waitingList: ["A043", "A044", "A045", "A046", "A047", "A048", "A049", "A050"],
  tellers: [
    { windowNumber: 1, currentQueue: "A039", status: "active" as const },
    { windowNumber: 2, currentQueue: "A041", status: "active" as const },
    { windowNumber: 3, currentQueue: "A042", status: "active" as const },
    { windowNumber: 4, currentQueue: "A039", status: "active" as const },
    { windowNumber: 5, currentQueue: "A041", status: "active" as const },
    { windowNumber: 6, currentQueue: "A042", status: "active" as const },
  ],
}

const textToAnnounce = [
  "Please have your ID ready when your number is called.",
  "Enrollment payments are accepted until 5PM.",
  "Window 3 is temporarily unavailable.",
];

export default function QueueDisplay() {

  const queueService = useMemo(() => new QueueManagerService(null), [])
  
  const tts = useRef<any>(new TTSService());

  const authService = useRef(new AuthenticationService(null));
  
  const sock = useEcho();

  const {companyId, departmentId, concernId} = useParams();

  const [windowData, setWindowData] = useState<any>(null)
    
  const [nowServing, setNowServing] = useState<any>(0)
    
  const [refreshWindows , setRefreshWindows] = useState<boolean>(false)

  const [department , setDepartment] = useState<any>({})

  const [eventQueue, setEventQueue] = useState<any []> ([]);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

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

    useEffect(() => {

        const processQueue = async () => {
            
            if (eventQueue.length == 0 || isProcessing) return;

            setIsProcessing(true)

            const currentEvent = eventQueue[0]

            currentEvent.cb?.();

            await new Promise ((resolve: any) => setTimeout(resolve, 4000))

            setEventQueue((prev: any) => prev.slice(1));

            setIsProcessing(false)
        }

        processQueue();

    }, [eventQueue, isProcessing])


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
              deptName={sampleData.nowServing.queueNumber}
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
                  {sampleData.tellers.map((teller) => (
                    <TellerCard
                      key={teller.windowNumber}
                      windowName={teller.windowNumber}
                      currentlyServing={teller.currentQueue}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Waiting List */}
            <WaitingList queueNumbers={sampleData.waitingList} />

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
