import React, { 
  useEffect,
  useState,
  useContext,
  useMemo,
  useRef
} from 'react'

import { AppContext } from '@context/AppContext';

import { useParams } from 'react-router-dom';

import { QueueManagerService } from '@services/QueueManagerService';

import { Card } from 'antd';

import LoadingLayout from '@/app/layouts/LoadingLayout';

import useEcho from '@hooks/useEcho';

import { TTSService } from '@services/TTSService';

// import AcceptTransaction from '@components/modals/AcceptTransactionModal';

import EasySpeech from 'easy-speech';

const WindowsChannelPage: React.FC <any> = (): React.ReactElement => {

    const {companyId, departmentId, concernId} = useParams();

    const {
      isLoading,
      setIsLoading
    } = useContext(AppContext)

    const sock = useEcho();

    const windowChannelContainerRef = useRef<HTMLDivElement | null>(null)

    const {} = useContext(AppContext)
    const queueService = useMemo(() => new QueueManagerService(null), [])
    const tts = useRef<any>(new TTSService());
    const [windowData, setWindowData] = useState<any>(null)

    const [nowServing, setNowServing] = useState<any>(0)

    const [refreshWindows , setRefreshWindows] = useState<boolean>(false)

    useEffect(() => {

      let windowChannelUri = `window.update.department.${departmentId}.company.${companyId}`;
      let windowChannel = sock.channel(windowChannelUri);

      windowChannel.listen('.window.update-queue-number', (e:any) => {
        tts.current.speak(e.message)
        setRefreshWindows(true)
        //setNowServing(e.queue_number)
        //console.log(e.queue_number)
      })

      windowChannel.listen('.window.recall-queue-number',  (e:any) => {
        tts.current.speak(e.message)
      })

      return () => {
        sock.leave(windowChannelUri)
      }

    }, [])
    
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
      <LoadingLayout isLoading={isLoading}>
        <div className="transaction-concern">
            {windowData?.data?.map((data: any, index: number) => 
              (
                  <Card
                      className='box-shadow'
                      key={index}
                      style={{
                        height: '300px'
                      }}
                      ref={windowChannelContainerRef}
                  >
                    <Card.Grid style={{
                      width: '75%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                        <div className='number-now-serving'>
                          {data.transactions[0]?.queue_number ?? 0}
                        </div>
                    </Card.Grid>
                    <Card.Grid style={{ 
                        height: '100%',
                        width: '25%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <h1>{data.name}</h1>
                    </Card.Grid>
                  </Card>
              )
            )}
        </div>
      </LoadingLayout>
    )
}

export default WindowsChannelPage;