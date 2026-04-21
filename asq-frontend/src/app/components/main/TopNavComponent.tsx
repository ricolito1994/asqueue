import React, {
    useState,
    useEffect,
    useContext,
    useRef,
} from 'react'


import {
    Button,
    notification,
    Form
} from 'antd'

import {
    LogoutOutlined
} from '@ant-design/icons'

import '@styles/top-nav.component.styles.css'

import logo from '@assets/hero.png'

import { AppContext } from '@context/AppContext'

import AuthenticationService from '@services/AuthenticationService';
import AsConfirmModal from '@components/modals/AsConfirmModal'

const TopNavComponent: React.FC <any> = ({children}) => {
    const APP_NAME = import.meta.env.NAME;
    const {
        user,
        setUser,
        setIsProcessing,
        setUserWindow
    }
    = useContext(AppContext)

    const [api, contextHolder] = notification.useNotification();

    const [displayConfirmLogout, setDisplayConfirmLogout] = useState<boolean>(false)


    const onRefreshToken = (data: any) => {
        setUser((prev: any) => ({
            ...prev,
            access_token: data.access_token,
            refresh_token: data.refresh_token
        }))
    }

    const logoutService = useRef(new AuthenticationService(
        user?.access_token ?? null, 
        null, 
        user?.refresh_token,
        onRefreshToken
    ))

    useEffect(()=> {
        
    }, [])

    const logout = async () => {
        try {
            setIsProcessing(true)
            await logoutService.current.logout({
                "user_id" : user.user.id
            })
            setUser(null)
            setUserWindow(null)
            localStorage.removeItem('user')
            localStorage.removeItem('userWindow')
        } catch (e:any) {
            api.open({
                message: e.response.data.message ?? "Failed",
                description : e.response.data.reason ?? e.response.data.status,
                type : "error"
            })
        } finally {
            setIsProcessing(false)
            setDisplayConfirmLogout(false)
            localStorage.removeItem('user')
            localStorage.removeItem('userWindow')
        }
    }

    return (
        <div id='top-nav-component'>
            {contextHolder}
            <AsConfirmModal 
                onOk={() => logout()}
                okText='Yes'
                onDeny={()=> setDisplayConfirmLogout(false)}
                denyText='No'
                title="Are you sure you want to sign out?"
                isOpen={displayConfirmLogout}
            />
            <div className='top-nav-container'>
                <div id='company-logo'>
                    <img src={logo} width={70}/>
                </div>
                
                <div id='company-title'>
                     <div id='main-title'>{user?.user?.company?.name}</div>
                     <div id='sub-title'>Queue</div>
                </div>

                <div id='user-detail-container'>
                    {user?.user?.title} {user?.user?.full_name}
                </div>
                <div id='user-detail-container'>
   
                    <Button
                        style={{
                            fontSize : '15px',
                            fontWeight: 'bold',
                            width: '100%'
                        }}
                        color="purple"
                        variant="solid" 
                        onClick={() => setDisplayConfirmLogout(true)}
                        //htmlType="submit" 
                        block
                    >
                        <LogoutOutlined /> 
                        Log Out
                    </Button>

                </div>
            </div>
        </div>
    )
}

export default TopNavComponent;