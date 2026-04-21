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
    DatePicker,
    Input
} from 'antd'

import {
    EditOutlined,
    DeleteOutlined,
    StepForwardOutlined,
    SyncOutlined,
    
} from '@ant-design/icons'

import { AppContext } from '@context/AppContext';

import UserService from '@services/UserService';

import { QueueManagerService } from '@/app/services/QueueManagerService';

import Datatable from '@components/commons/DataTable';

import DataDisplayer from '@components/commons/DataDisplayer';

import { useDebounce } from '@hooks/useDebounce';

import profile from '@assets/profile.png'

const UserSettings: React.FC = (): React.ReactElement => {

    const {
        user,
        setUser
    } = useContext(AppContext)

    const [isUserTableLoading, setIsUserTableLoading] = useState<boolean>(true)

    const [searchUserFullname, setSearchUserFullname] = useState<string>("")

    const debouncedFullnameValue = useDebounce<string>(searchUserFullname)

    const onRefreshToken = (data: any) => {
        setUser((prev: any) => ({
            ...prev,
            access_token: data.access_token,
            refresh_token: data.refresh_token
        }))
    }
        
    const userService = useRef(new UserService(
        user?.access_token ?? null, 
        null, 
        user?.refresh_token,
        onRefreshToken
    ));

    const qm = useRef(new QueueManagerService(
        user?.access_token ?? null, 
        null, 
        user?.refresh_token,
        onRefreshToken
    ));

    useEffect(() => {
        setIsUserTableLoading(true)
    }, [debouncedFullnameValue])

    return (
        <div id="">
            <Datatable <any>
                scrollVal = {{y: 300}}
                style = {{
                    height: '370px'
                }}
                key='datatable-user-list-table'
                columnData={[
                    {
                        title : "Profile",
                        dataIndex: 'profile',
                        key: 'profile',
                        render : (data: any, index: number) => (<img src={profile} width={30}/>)
                    },
                    {
                        title : "Name",
                        dataIndex: 'full_name',
                        key: 'full_name',
                        sorter: (a:any, b:any) => a.full_name.localeCompare(b.full_name),
                    },
                    {
                        title : "Department",
                        dataIndex: ['department', 'name'],
                        key: 'full_name',
                        //sorter: (a:any, b:any) => a.full_name.localeCompare(b.full_name),
                    },
                    {
                        title: "Window",
                        render : (data: any, index: number) => (
                            <DataDisplayer 
                                key={index}
                                index={index}
                                service={qm.current}
                                serviceMethod={'findWindowByAssignedTo'}
                                serviceParams={{
                                    userId: data.id,
                                    data: {},
                                    config: {
                                        params : {
                                            "company_id" : user?.user?.company_id,
                                            "department_id": user?.user?.department_id,
                                        }
                                    }
                                }}
                                displayField='name'
                            />
                        )
                    }
                ]}
                service={userService.current}
                method={'index'}
                props={{
                    page: 1,
                    data: {},
                    config: {
                        params : {
                            "company_id" : user?.user?.company_id,
                            "department_id": user?.user?.department_id,
                            "full_name": debouncedFullnameValue
                        }
                    }
                }}
                isDataTableLoading={isUserTableLoading}
                setIsDataTableLoading={setIsUserTableLoading}
                rowClassName={(record:any)=>record?.is_priority ? 'row-prio-color' : ''}
            >
                <div className="datatable-filter-container" style={{paddingTop:'1%'}}>
                    fullname&nbsp;
                    <Input 
                        value={searchUserFullname} 
                        placeholder='fullname'
                        onChange={(e:any) => setSearchUserFullname(e.target.value)}
                    />&nbsp;
                    <Button
                        style={{
                            fontSize : '15px',
                            fontWeight: 'bold',
                            width: '20%',
                            padding: '1%'
                        }}
                        color="green"
                        variant={'solid'} 
                        onClick={()=>{
                        }}
                    >
                        REGISTER USER
                        <StepForwardOutlined />
                    </Button>
                </div>
            </Datatable>
        </div>
    )
}

export default UserSettings;