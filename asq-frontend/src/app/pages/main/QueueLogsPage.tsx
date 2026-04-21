import React, { 
    useState, 
    useEffect,
    useContext,
    useRef,
} from 'react'

import { 
    Card,
    Button, 
    notification,
    DatePicker
} from 'antd'

import {
    EditOutlined,
    DeleteOutlined,
    StepForwardOutlined,
    SyncOutlined,
    
} from '@ant-design/icons'

import '@styles/main.styles.queuelogs-page.style.css'

import { AppContext } from '@/app/context/AppContext';

import { QueueManagerService } from '@/app/services/QueueManagerService';

import Datatable from '@components/commons/DataTable';

import { useClock } from '@/app/hooks/useClock';

import dayjs from 'dayjs';

const QueueLogsPage: React.FC <any> = ({}): React.ReactElement => {
    const t = useClock();

    const defaultDate = dayjs()

    const {user, userWindow, setUser} = useContext(AppContext)

    const [isSelectedPriority, setIsSelectedPriority]  = useState<boolean | null>(null)

    const [fromDate, setFromDate] = useState<any | null>(defaultDate)

    const [toDate, setToDate] = useState<any | null>(defaultDate)

    const [resultData, setResultData] = useState<any[] | null>(null)

    const onRefreshToken = (data: any) => {
        setUser((prev: any) => ({
            ...prev,
            access_token: data.access_token,
            refresh_token: data.refresh_token
        }))
    }
    
    const qm = useRef(new QueueManagerService(
        user?.access_token ?? null, 
        null, 
        user?.refresh_token,
        onRefreshToken
    ));

    const [isQueueListLoading, setIsQueueListLoading]  = useState<boolean>(true)

    useEffect(() => {
        if (resultData) {

        }
    }, [resultData])

    return (
        <div id="main-dashboard-container">
            <div className='long-bar-title'>
                Queue Logs
            </div>

            <div className=''>
                <div className=''>
                    <Datatable <any>
                        scrollVal = {{y: 300}}
                        style = {{
                            height: '370px'
                        }}
                        key='datatable-queue-list-table'
                        columnData={[
                            {
                                title : "Queue",
                                dataIndex: 'queue_number',
                                key: 'queue_number',
                                // sorter: (a:any, b:any) => a.queue_number.localeCompare(b.queue_number),
                            },
                            {
                                title : "Concern",
                                dataIndex: ['concern', 'name'],
                                key: 'concern',
                                // render: function (data: any) {
                                //     return data.concern.name;
                                // }
                            },
                            {
                                title : "Created At",
                                dataIndex: 'created_at',
                                key: 'created_at',
                                //sorter: (a:any, b:any) => a.created_at.localeCompare(b.created_at),
                            },
                            {
                                title : "Duration",
                                dataIndex: 'process_time',
                                key: 'process_time',
                                //sorter: (a:any, b:any) => a.created_at.localeCompare(b.created_at),
                            },
                            
                            /*{
                                title : "Actions",
                                key: 'action',
                                render: (text: any, data: any) => (
                                    <>
                                                
                                    </>
                                ),
                            },*/

                        ]}
                        service={qm.current}
                        method={'indexTransactions'}
                        props={{
                            page: 1,
                            data: {},
                            config: {
                                params : {
                                    "company_id" : user?.user?.company_id,
                                    "department_id": user?.user?.department_id,
                                    "window_id" : userWindow.id,
                                    "is_priority": isSelectedPriority,
                                    "status" : "all",
                                    "from_date" : !fromDate ?  null : fromDate.format('YYYY-MM-DD'),
                                    "to_date" : !toDate ? null : toDate.format('YYYY-MM-DD')
                                }
                            }
                        }}
                        isDataTableLoading={isQueueListLoading}
                        setIsDataTableLoading={setIsQueueListLoading}
                        rowClassName={(record:any)=>record?.is_priority ? 'row-prio-color' : ''}
                        setResultsReusableOutsideDataTable={setResultData}
                    >
                        <div className="datatable-filter-container" style={{paddingTop:'1%'}}>
                            From <DatePicker 
                                value={fromDate} 
                                onChange={(date:any) => {
                                    setFromDate(date)
                                    setIsQueueListLoading(true)
                                }}
                            />
                            To <DatePicker 
                                value={toDate}
                                onChange={(date:any) => {
                                    setToDate(date)
                                    setIsQueueListLoading(true)
                                }}
                            />
                            
                            <Button
                                style={{
                                    fontSize : '15px',
                                    fontWeight: 'bold',
                                    width: '20%',
                                    padding: '1%'
                                }}
                                color="primary"
                                variant={isSelectedPriority === null ? "outlined" : 'solid'} 
                                onClick={()=>{
                                    setIsSelectedPriority(null)
                                    setIsQueueListLoading(true)
                                }}
                            >
                                ALL QUEUE 
                                <StepForwardOutlined />
                            </Button>

                            <Button
                                style={{
                                    fontSize : '15px',
                                    fontWeight: 'bold',
                                    width: '20%',
                                    padding: '1%'
                                }}
                                color="purple"
                                variant={isSelectedPriority === false  ? "outlined" : 'solid'}
                                onClick={()=>{
                                    setIsSelectedPriority(false)
                                    setIsQueueListLoading(true)
                                }}
                            >
                                NORMAL QUEUE {isSelectedPriority === false  ? '*' : ''} 
                                <StepForwardOutlined />
                            </Button>


                            <Button
                                style={{
                                    fontSize : '15px',
                                    fontWeight: 'bold',
                                    width: '20%',
                                    padding: '1%'
                                }}
                                color="green"
                                variant={isSelectedPriority ? "outlined" : 'solid'}
                                onClick={()=>{
                                    setIsSelectedPriority(true)
                                    setIsQueueListLoading(true)
                                }}
                            >
                                PRIO QUEUE {isSelectedPriority ? '*' : ''} 
                                <StepForwardOutlined />
                            </Button>       
                        </div>       
                    </Datatable>
                </div>             
            </div>
        </div>
    )
}

export default QueueLogsPage;