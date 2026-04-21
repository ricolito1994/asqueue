import React , {
    useEffect,
    useState,
    useContext,
    useMemo,
    useRef
} from 'react'

import AsModal from './AsModal'

import '@styles/new-transaction.modal.css'

import {
    Button,
    Spin
} from 'antd'

import {
    UsergroupAddOutlined,
    PrinterOutlined,
    LoginOutlined,
    CloseOutlined
} from '@ant-design/icons'

import { useNavigate } from 'react-router-dom'

import { AppContext } from '@context/AppContext'

import { QueueManagerService } from '@services/QueueManagerService'

import AsConfirmModal from '@components/modals/AsConfirmModal'

const AcceptTransactionModal: React.FC <any> = ({
    data,
    open,
    setIsOpen,
}): React.ReactElement => {

    const {
        
    } = useContext(AppContext)

    const navigate = useNavigate();
    
    const [concernName, setConcernName] = useState<string>('')
    const [windowName, setWindowName] = useState<string>('')
    const [queueNumber, setQueueNumber] = useState<number>(0)
    const [isLoadingQueue, setIsLoadingQueue] = useState<boolean>(false)
    
    const [doneQueue, setDoneQueue] = useState<boolean>(false)

    const [isOpenPrioDialog, setIsOpenPrioDialog] = useState<boolean>(false);

    const [createdAt, setCreatedAt] = useState<any>('');

    const [isPriorityQueue, setIsPriorityQueue] = useState<boolean>(false)

    useEffect(() => {
        let concernName = (data?.data?.concerns.find(((x:any) => x.id === parseInt(data.concern))).name)
        let windowName = data?.data?.name
        setConcernName(concernName)
        setWindowName(windowName)
    }, [data])

    const queueManagerService = useRef( new QueueManagerService(null))

    const processQueueingNumber = async (isPriority:boolean) => {
        setIsLoadingQueue(true)
        queueManagerService.current.enableAbort()

        try {
            let qt = await queueManagerService.current.createQueue({
                company_id: data.company,
                window_id : data.window,
                department_id : data.department,
                is_priority : isPriority,
                processed_by : data.data.assigned_to,
                concern_id: data.concern
            });
            setIsPriorityQueue(isPriority)
            setQueueNumber(qt?.queue_number)
            setCreatedAt(qt?.created_at)
        } catch (e:any) {
            console.log(e)
        } finally {
            setIsLoadingQueue(false)
            setDoneQueue(true)
            setIsOpenPrioDialog(false)
        }
    }

    const closeNewTransactionModal = () => {
        if(queueManagerService.current.abortController)
            queueManagerService.current.abortController.abort()

        setQueueNumber(0)
        setIsLoadingQueue(false)
        setDoneQueue(false)
        setIsOpen(false)
        setCreatedAt(null)
        setIsPriorityQueue(false)
    }

    const newQueue = () => {
        navigate(`/new-transaction/company/${data?.company}/department/${data?.department}/concerns`)
    }

    return (
        <>
            <AsModal
                title=""
                open={open} 
            >
                <div className='new-transaction-modal'>
                    <AsConfirmModal 
                        onOk={() => processQueueingNumber(true)}
                        okText='Yes'
                        onDeny={()=> processQueueingNumber(false)}
                        denyText='No'
                        onCancel={()=> setIsOpenPrioDialog(false)}
                        title="Is this a priority?"
                        isOpen={isOpenPrioDialog}
                    />
                    
                    <div id='printable-queue-number-container'>
                        <div className='contents'>
                            <span id='concern-name'>{concernName}</span>
                        </div>
                        
                        <div className='contents'>
                            <span id='window-name'>{windowName}</span>
                        </div>
                        {!isLoadingQueue && !doneQueue ?
                            <div className='contents' id="queue-button-container">
                                <Button 
                                    onClick={()=>setIsOpenPrioDialog(true)} 
                                    color="purple"
                                    variant="solid" 
                                    style={{
                                        fontSize : '30px',
                                        fontWeight: 'bold',
                                        padding: '7%',
                                        width: '100%'
                                    }}
                                >
                                    <UsergroupAddOutlined /> QUEUE NOW   
                                </Button>
                            </div>
                        : <div className='contents' id="queue-button-container">
                            <Button
                                style={{
                                    fontSize : '30px',
                                    fontWeight: 'bold',
                                    padding: '7%',
                                    width: '100%'
                                }}
                                color="purple"
                                variant="solid" 
                            >
                                <UsergroupAddOutlined /> 
                                {!doneQueue && isLoadingQueue ? <Spin /> : 'YOU`VE BEEN QUEUED'}
                            </Button>
                        </div>}
                        {queueNumber > 0 && !isLoadingQueue ?
                            <div id="numbers-container">
                                <div className='contents' id="number-served">
                                    {queueNumber}
                                </div>

                                <div className='contents' id='date-transaction-container'>
                                    {createdAt}
                                </div>
                                {isPriorityQueue?
                                <div className='contents'>
                                    PRIORITY
                                </div>:''}
                            </div>
                        : ''}
                    </div>
                    <div id='new-transaction-modal-footer'>
                        {doneQueue ?(<>
                        <Button
                            style={{
                                fontSize : '15px',
                                fontWeight: 'bold',
                                padding: '5%',
                                width: '50%'
                            }}
                            color="green"
                            variant="solid" 
                            onClick={()=>newQueue()}
                        >
                            <LoginOutlined />
                            NEXT QUEUE
                        </Button>
                        
                        <Button 
                            style={{
                                fontSize : '15px',
                                fontWeight: 'bold',
                                padding: '5%',
                                width: '50%'
                            }}
                            color="magenta"
                            variant="solid" 
                        >
                            <PrinterOutlined />
                            PRINT QUEUE NUMBER
                        </Button>
                        </>):
                        <Button 
                            style={{
                                fontSize : '15px',
                                fontWeight: 'bold',
                                padding: '5%',
                                width: '100%'
                            }}
                            color="volcano"
                            variant="solid" 
                            onClick={() => closeNewTransactionModal()}
                        >
                            <CloseOutlined />
                            CANCEL
                        </Button>}
                    </div>
                </div>
            </AsModal>
        </>
    )
}

export default AcceptTransactionModal