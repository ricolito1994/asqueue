import React, {useContext, useEffect, useState, useMemo, useRef} from 'react'

import vid from '@assets/promotion_video.mp4'

import '@styles/QueueDisplay.css'

import { TTSService } from '@services/TTSService';

import { QueueManagerService } from '@services/QueueManagerService';

import { useParams } from 'react-router-dom';

import useEcho from '@hooks/useEcho';

import AuthenticationService from '@services/AuthenticationService';

import dayjs from 'dayjs';


const servingWindows = [
  {
    window: 'WINDOW 1',
    queue: 'A023',
  },
  {
    window: 'WINDOW 2',
    queue: 'B104',
    active: true,
  },
  {
    window: 'WINDOW 3',
    queue: 'C056',
  },
    {
    window: 'WINDOW 3',
    queue: 'C056',
  },
    {
    window: 'WINDOW 3',
    queue: 'C056',
  },
    {
    window: 'WINDOW 3',
    queue: 'C056',
  },
];

const waitingList = [
  'A024',
  'A025',
  'A026',
  'A027',
  'A028',
  'B105',
  'B106',
  'B107',
  'C057',
  'C058',
];



    

const QueueDisplay: React.FC <any> = (): React.ReactElement => {
    const [windowData, setWindowData] = useState<any>(null)
    const [refreshWindows , setRefreshWindows] = useState<boolean>(false)
    const {companyId, departmentId, concernId} = useParams();
    const queueService = useMemo(() => new QueueManagerService(null), [])
    const queueTransactionService = useMemo(() => new QueueManagerService(null), []);
    const [waitingList, setWaitingList] = useState<any[]>([])
    const defaultDate = dayjs()
    const [fromDate, setFromDate] = useState<any | null>(defaultDate)
    const [toDate, setToDate] = useState<any | null>(defaultDate)

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


          setWaitingList(waitingList?.data)
        }

        fetchWindows()
    }, []);

    useEffect ( () => {
          //queueService.enableAbort();
          //console.log(nowServing)
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
          //let timeout = setTimeout (() => {
          //setIsLoading(false)
          //}, 1000);
    
          return () => {
            //queueService.abortController.abort();
            //clearTimeout(timeout)
          }
        }, [companyId, departmentId, refreshWindows])


  return (
    <div className="queue-screen-layout">
      {/* LEFT PANEL */}
      <section className="queue-left-panel">
        {/* NOW SERVING HEADER */}
        <div className="dept-banner">
          <h1>Registrar</h1>
        </div>

        {/* WINDOWS */}
        <div className="window-gridqdwqdqw">
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
            {waitingList.map((queue, index) => (
              <div key={index} className="waiting-item">
                {queue?.queue_number ?? 0}
              </div>
            ))}
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
          <h2>School Announcements</h2>
          <p>Please wait for your queue number to be called.</p>
        </div>
      </aside>
    </div>
  );
}

export default QueueDisplay;