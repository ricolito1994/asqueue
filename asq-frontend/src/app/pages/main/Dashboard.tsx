import React , {
    useEffect,
    useState,
    useContext,
    useRef,
    useMemo,
    useCallback
}
from 'react';

import { AppContext } from '@context/AppContext';

import '@styles/main.dashboard.styles.css';

import { 
    Card,
    Button, 
    notification
} from 'antd'

import {
    EditOutlined,
    DeleteOutlined,
    StepForwardOutlined,
    SyncOutlined,
    
} from '@ant-design/icons'


import useEcho from '@hooks/useEcho';

import { QueueManagerService } from '@services/QueueManagerService';

import AsConfirmModal from '@components/modals/AsConfirmModal';

import Datatable from '@components/commons/DataTable';

import Clock from '@components/commons/Clock';

import dayjs from 'dayjs';

const Dashboard : React.FC <any> = ({}) : React.ReactElement => {

    const {
        user,
        userWindow,
        setUser
    } = useContext(AppContext)

    const now = dayjs()

    const [currentQueueNum, setCurrentQueueNum] = useState<number>(0);

    const [currentConcernName, setCurrentConcernName] = useState<any>("");

    const [isOpenQueueActionModal, setIsOpenQueueActionModal] = useState<boolean>(false)

    const [isOpenPriorityQueueActionModal, setIsOpenPriorityQueueActionModal] = useState<boolean>(false)

    const [isPriority, setIsPriority] = useState<boolean>(false)

    const [api, contextHolder] = notification.useNotification();

    const [isQueueListLoading, setIsQueueListLoading]  = useState<boolean>(true)

    const [isSelectedPriority, setIsSelectedPriority]  = useState<boolean | null>(null)

    const [queueingSize, setQueueingSize] = useState<number>(0);

    const [doneQueueSize, setDoneQueueSize] = useState<number>(0);

    const [totalQueueSize, setTotalQueueSize] = useState<number>(0);

    const sock = useEcho()

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

    
    
    const fetchQueueLogsService = useRef(new QueueManagerService (
        user?.access_token ?? null,
        null,
        user?.refresh_token,
        onRefreshToken
    ));

    const [time, setTime] = useState(new Date());

    const processNextQueueNumber = async (
        next: boolean = true, 
        isPriority: boolean = false
    ) => {
        try {
            if (next) {
                let params: any = {
                    "company_id" : user?.user?.company_id,
                    "department_id": user?.user?.department_id,
                    "window_id" : userWindow.id,
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

    const rowClassName = (record: any, index: any): any => {
        return record?.is_priority ? 'row-prio-color' : '';
    }

    const getQueueSizes = async (isDone: boolean|null = false, all:boolean|null = false) => {
        try {
            let params: any = {
                 params : {
                    "company_id" : user?.user?.company_id,
                    "department_id": user?.user?.department_id,
                    "window_id" : userWindow.id,
                    "date_from" : now.format('YYYY-MM-DD'),
                    "date_to" : now.format('YYYY-MM-DD')
                }
            }

            if (isDone) {
                params.params = {...params.params, ...{is_done : true} }
            }

            if (all) {
                params.params = {...params.params, ...{status : 'all'} }
            }

            return await qm.current.indexTransactions(1, null , params)
        } catch (e) {
            throw e; 
        }
    }

    useEffect(() => {
        const getLatestQueueNumber = async () => {
            let q;
            try {
                q = await qm.current.findWindowByAssignedTo(user?.user?.id, null, {
                    params: {
                        "company_id" : user?.user?.company_id,
                        "department_id": user?.user?.department_id
                    }
                })

                setCurrentQueueNum(q?.transactions[0].queue_number)
                setCurrentConcernName(q?.transactions[0].concern.name)
                setIsPriority(q?.transactions[0].is_priority)
            } catch (e) {

            } finally {
                
            }
        }
        getLatestQueueNumber()

    }, [currentQueueNum])

    useEffect(() => {
        let uriDashboardChannel = `dashboard.window.${userWindow.id}.user.${user.user.department.id}.company.${user.user.company.id}`;
        let dashboardChannel = sock.channel(uriDashboardChannel);

        dashboardChannel.listen('.dashboard.update-queue-list', (e:any) => {
            console.log(e)
        })
        
        return () => {
            sock.leave(uriDashboardChannel)
        }
    }, [])

    useEffect(() => {
        const requestQueueSizes = async () => {
            try {
                let values = await Promise.all([
                    getQueueSizes(true),
                    getQueueSizes(),
                    getQueueSizes(false, true)
                ])
                setDoneQueueSize(values[0]?.total)
                setQueueingSize(values[1]?.total)
                setTotalQueueSize(values[2]?.total)
            } catch (e) {
                console.error(e)
            }
        }
        if(isQueueListLoading)
            requestQueueSizes()
    }, [isQueueListLoading])

    return (
        <div id="main-dashboard-container">
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
            <div className='long-bar-title'>
                Queueing Dashboard
            </div>

            <div className='main-dashboard-content'>
                <div id='now-serving-widget' className='dashboard-widget-items'>
                    <Card 
                        className='box-shadow' 
                        style={{
                           height: '100%'
                        }}

                        title={<div style={{ color: "#722ed1" }}>NOW SERVING</div>}
                    >
                        <div className='card-content' style={{
                            backgroundColor: !isPriority ? "aliceblue" : "#e2ffd1"
                        }}>
                            <div id='now-serving-number'>
                                {currentQueueNum}
                            </div>
                            <div id='concern-container'>
                                {currentConcernName}
                            </div>
                            <div className='card-footer'>
                                <div className='card-footer-content'>
                                    <Button
                                        style={{
                                            fontSize : '15px',
                                            fontWeight: 'bold',
                                            width: '100%',
                                            padding: '5%'
                                        }}
                                        color="purple"
                                        variant="solid" 
                                        onClick={()=>setIsOpenQueueActionModal(true)}
                                    >
                                        NEXT QUEUE NUMBER <StepForwardOutlined />
                                    </Button>
                                    
                                </div>
                                <div className='card-footer-content'>
                                    <Button
                                        style={{
                                            fontSize : '15px',
                                            fontWeight: 'bold',
                                            width: '100%',
                                            padding: '5%'
                                        }}
                                        color="green"
                                        variant="solid" 
                                        onClick={()=>setIsOpenPriorityQueueActionModal(true)}
                                    >
                                        NEXT QUEUE PRIORITY NUMBER <StepForwardOutlined />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className='dashboard-widget-items grid-item-col-span-2 grid-item-row-span-2'>
                    <Card 
                        className='box-shadow' 
                        style={{
                           height: '100%'
                        }}
                        title={<div style={{ color: "#722ed1" }}>
                            <SyncOutlined /> QUEUE LIST</div>}
                    >
                        <div id='queue-today-table-container'>
                            <Datatable <any>
                                scrollVal = {{y: 300}}
                                style = {{
                                    height: '370px'
                                }}
                                key='datatable-queue-list-dashboard'
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
                                    /*{
                                        title : "Actions",
                                        key: 'action',
                                        render: (text: any, data: any) => (
                                            <>
                                               
                                            </>
                                        ),
                                    },*/

                                ]}
                                service={fetchQueueLogsService.current}
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
                                            "date_from" : now.format('YYYY-MM-DD'),
                                            "date_to" : now.format('YYYY-MM-DD')
                                        }
                                    }
                                }}
                                isDataTableLoading={isQueueListLoading}
                                setIsDataTableLoading={setIsQueueListLoading}
                                rowClassName={rowClassName}
                            >
                                <div className="datatable-filter-container">
                                    <Button
                                        style={{
                                            fontSize : '15px',
                                            fontWeight: 'bold',
                                            width: '32%',
                                            padding: '2%'
                                        }}
                                        color="primary"
                                        variant={isSelectedPriority === null ? "outlined" : 'solid'} 
                                        onClick={()=>{
                                            setIsSelectedPriority(null)
                                            setIsQueueListLoading(true)
                                        }}
                                    >
                                        ALL QUEUE {isSelectedPriority === null ? '*' : ''} 
                                        <StepForwardOutlined />
                                    </Button>&nbsp;
                                    <Button
                                        style={{
                                            fontSize : '15px',
                                            fontWeight: 'bold',
                                            width: '32%',
                                            padding: '2%'
                                        }}
                                        color="purple"
                                        variant={isSelectedPriority === false ? "outlined" : 'solid'} 
                                        onClick={()=>{
                                            setIsSelectedPriority(false)
                                            setIsQueueListLoading(true)
                                        }}
                                    >
                                        NORMAL QUEUE {isSelectedPriority === false  ? '*' : ''} 
                                        <StepForwardOutlined />
                                    </Button>&nbsp;
                                    <Button
                                        style={{
                                            fontSize : '15px',
                                            fontWeight: 'bold',
                                            width: '32%',
                                            padding: '2%'
                                        }}
                                        color="green"
                                        variant={isSelectedPriority ? "outlined" : 'solid'} 
                                        onClick={()=>{
                                            setIsSelectedPriority(true)
                                            setIsQueueListLoading(true)
                                        }}
                                    >
                                        PRIORITY QUEUE {isSelectedPriority ? '*' : ''} 
                                        <StepForwardOutlined />
                                    </Button>
                                </div>
                            </Datatable>
                        </div>
                        <div className='queueing-data-count-container'>
                            <div id='queueing'><SyncOutlined /> QUEUEING {queueingSize}</div>
                            <div id='done'><SyncOutlined /> DONE {doneQueueSize}</div>
                            <div id='total'><SyncOutlined /> TOTAL {totalQueueSize}</div>
                        </div>
                    </Card>
                </div>
                 <div className='dashboard-widget-items grid-item-col-span-1 grid-item-row-span-1'>
                    <Clock />
                 </div>
            </div>
        </div>
    )
}
export default Dashboard
