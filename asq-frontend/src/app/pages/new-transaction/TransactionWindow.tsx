import React, { 
  useEffect,
  useState,
  useContext,
  useMemo
} from 'react'

import { AppContext } from '@context/AppContext';

import { useParams } from 'react-router-dom';

import { QueueManagerService } from '@services/QueueManagerService';

import { Card } from 'antd';

import reactLogo from '@assets/react.svg'

import LoadingLayout from '@/app/layouts/LoadingLayout';

// import EasySpeech from 'easy-speech';

import AcceptTransactionModal from '@components/modals/AcceptTransactionModal'

const TransactionWindow: React.FC <any> = (): React.ReactElement => {

    const {companyId, departmentId, concernId} = useParams();

    const {
      //isLoading,
      //setIsLoading
      isProcessing,
      setIsProcessing
    } = useContext(AppContext)

    
    const [isOpenAcceptTransaction, setIsOpenAcceptTransaction] = useState<boolean>(false)

    const [transactionData, setTransactionData] = useState<any>();
    const queueService = useMemo(() => new QueueManagerService(null), [])
    const [windowData, setWindowData] = useState<any>(null);

    const createTransaction = async (data: any) => {
      let concern = concernId;
      let window = data.id;
      let department = departmentId;
      let company = companyId;

      setTransactionData({
        concern: concern,
        window: window,
        department: department,
        company: company,
        data: data
      })

      setIsOpenAcceptTransaction(true)
    }
    
    useEffect ( () => {
      //queueService.enableAbort();
      const fetchWindows = async () => {
        try {
          setIsProcessing(true)
          let windowData = await queueService.windows(1, null, {
            params: {
              company_id : companyId,
              department_id : departmentId,
              concern_id : concernId
            }
          });

          setWindowData(windowData)
        } catch (e) {

        } finally {
          
          setIsProcessing(false)
        }
      }
      fetchWindows()
      //let timeout = setTimeout (() => {
      //}, 1000);

      return () => {
        //queueService.abortController.abort();
        //clearTimeout(timeout)
      }
    }, [companyId, departmentId])


    return (
      <LoadingLayout isLoading={isProcessing}>
        <AcceptTransactionModal
          data={transactionData}
          open={isOpenAcceptTransaction}
          setIsOpen={setIsOpenAcceptTransaction}
        />
        <div className="transaction-concern">
            {windowData?.data?.map((data: any, index: number) => 
              (
                  <Card
                      hoverable
                      key={index}
                      onClick={()=> createTransaction(data)}
                  >
                    <Card.Grid style={{
                      width: '15%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                        <img src={reactLogo} width={50} />
                    </Card.Grid>
                    <Card.Grid style={{ width: '85%' }}><h1>{data.name}</h1></Card.Grid>
                  </Card>
              )
            )}
        </div>
      </LoadingLayout>
    )
}

export default TransactionWindow;