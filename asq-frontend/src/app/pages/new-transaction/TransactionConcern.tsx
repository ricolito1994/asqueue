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

import vite from '@assets/vite.svg'

import { useNavigate } from "react-router-dom";

import LoadingLayout from '@/app/layouts/LoadingLayout';

const TransactionConcern: React.FC <any> = (): React.ReactElement => {

    const {companyId, departmentId} = useParams();

    const {
      //isLoading,
      //setIsLoading
      isProcessing,
      setIsProcessing
    } = useContext(AppContext)

    const queueService = useMemo(() => new QueueManagerService(null), [])
    const [concernData, setConcernData] = useState<any>(null);

    const navigate = useNavigate();

    const next = (data: any) => {
      let concernId = data.id;
      navigate(`${concernId}/windows`);
    }
    
    useEffect ( () => {
      
      const fetchConcerns = async () => {
        try {
          setIsProcessing(true)
          let concernData = await queueService.concerns(1, null, {
            params: {
              company_id : companyId,
              department_id : departmentId
            }
          });

          setConcernData(concernData)
          
        } catch (e) {

        } finally {
          setIsProcessing(false)
        }
      }
      fetchConcerns()
      
      //let timeout = setTimeout (() => {
      //}, 500);

      return () => {
        //queueService.abortController.abort();
        //clearTimeout(timeout)
      }
    }, [companyId, departmentId])


    return (
      <LoadingLayout isLoading={isProcessing}>
        <div className="transaction-concern">
            {concernData?.data?.map((data: any, index: number) => 
              (
                  <Card
                      hoverable
                      key={index}
                      onClick={() => next(data)}
                  >
                    
                    <Card.Grid style={{
                      width: '15%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                        <img src={vite} width={50} />
                    </Card.Grid>
                    <Card.Grid style={{ width: '85%' }}><h1>{data.name}</h1></Card.Grid>
                  </Card>
              )
            )}
        </div>
      </LoadingLayout>
    )
}

export default TransactionConcern;