import React, {useContext, useEffect, useState, useMemo, useRef} from 'react'

import {} from 'antd'

import '@styles/queue-screen.page.style.css'

import vid from '@assets/promotion_video.mp4'

import { TTSService } from '@services/TTSService';

import { QueueManagerService } from '@services/QueueManagerService';

import { useParams } from 'react-router-dom';

import useEcho from '@hooks/useEcho';

import useQueue from '@/app/hooks/useQueue';

import AuthenticationService from '@services/AuthenticationService';

const QueueScreenPage: React.FC <any> = ({}): React.ReactElement => {

    const queueService = useMemo(() => new QueueManagerService(null), [])
    const tts = useRef<any>(new TTSService());

    const authService = useRef(new AuthenticationService(null));

    const sock = useEcho();

    const {enqueue} = useQueue({
        delay: 4000
    })

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
            enqueue(e)
            //setEventQueue((prev:any) => [...prev, e])
        })
    
        windowChannel.listen('.window.recall-queue-number',  (e:any) => {
             e['cb'] = () => {
                tts.current.speak(e.message)
                setNowServing(e.data)
            }
            enqueue(e)
            //setEventQueue((prev:any) => [...prev, e])
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

    /*useEffect(() => {

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

    }, [eventQueue, isProcessing])*/


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
        <div id="queue-screen-page-main-container">
            <div id="video-presentation-container">
                <video autoPlay muted loop playsInline>
                    <source src={vid} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div id="announcement-container">
                    <div id='text-announcement-container'>
                        WELCOME TO {department?.name}.
                        PLEASE DO NOT LOSE AND PAY ATTENTION TO YOUR QUEUE NUMBER. 
                        IF YOU MISSED YOUR NUMBER, YOU HAVE TO QUEUE AGAIN.
                    </div>
                </div>
            </div>
            <div id="now-serving-container">
                <div id="now-serving-cards">
                    <div className="queue-number-card" >
                        <div className="window-name">{department?.name}</div>
                        <div className="queue-number" style={{"fontSize": "40px"}}>{nowServing?.window?.name}</div>
                    </div>
                    <br></br>
                    <div className="queue-number-card" >
                        <div className="window-name">NOW SERVING</div>
                        <div className="queue-number">{nowServing?.queue_number}</div>
                    </div>
                </div>
            </div>
            <div style={{"clear":"both"}}></div>
            <div id='queue-numbers-container'>
                {windowData?.data?.map((data: any, index: number) => (
                    <div className="queue-number-card" key={index}>
                        <div className="window-name">{data.name} </div>
                        <div className="queue-number">{data.transactions[0]?.queue_number ?? 0}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default QueueScreenPage;