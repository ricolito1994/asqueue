import React, {useContext, useEffect, useState, useMemo, useRef} from 'react'

import vid from '@assets/promotion_video.mp4'

import '@styles/QueueDisplay.css'

import { TTSService } from '@services/TTSService';

import { QueueManagerService } from '@services/QueueManagerService';

import { useParams } from 'react-router-dom';

import useEcho from '@hooks/useEcho';

import AuthenticationService from '@services/AuthenticationService';

import dayjs from 'dayjs';


const QueueDisplay: React.FC <any> = (): React.ReactElement => {
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

    // WebSocket / Automatic Updates
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

    <div className="queue-screen-layout">
      {/* LEFT PANEL */}
      <section className="queue-left-panel">
        {/* NOW SERVING HEADER */}
        <div className="dept-banner">
          <h1>{department?.name}</h1>
        </div>

        {/* WINDOWS */}
        <div className="window-grid">
          {windowData?.data?.map((data: any, index: number) => (
            <div
              key={index}
              className={`queue-card ${data.active ? 'active' : ''}`}
            >
              <span className="window-name">{data.name}</span>

              <h2>{data.transactions[0]?.queue_number ?? 0}</h2>

              <p>Now Serving</p>
            </div>
          ))}
        </div>

        {/* WAITING LIST */}
        <div className="waiting-container queue-card">
          <div className="waiting-header">
            <h4>Waiting List</h4>
          </div>

          <div className="waiting-list-grid">
            {waitingList.length > 0 ? (
              <>
                {waitingList.map((queue, index) => (
                  <div key={index } className="waiting-item">
                    {queue?.queue_number ?? 0}
                  </div>
                ))}
              </>
            ) : <div className="">No items in waiting list.</div>}
          </div>
        </div>
      </section>

      {/* RIGHT VIDEO PANEL */}
      <aside className="video-panel">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="video-player"
        >
          <source src={vid} type="video/mp4" />
        </video>

        <div className="video-overlay">
          <div className="announcement-wrapper">
            <div className="announcement-track">
              <div className="announcement-text">
                📢 Enrollment for SY 2026–2027 is now open Enrollment for SY 2026–2027 is now open Enrollment for SY 2026–2027 is now openEnrollment for SY 2026–2027 is now open
              </div>              
              <div className="announcement-text">
                📢 Enrollment for SY 2026–2027 is now open Enrollment for SY 2026–2027 is now open Enrollment for SY 2026–2027 is now openEnrollment for SY 2026–2027 is now open
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default QueueDisplay;