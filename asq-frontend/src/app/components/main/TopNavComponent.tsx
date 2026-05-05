import React, {
    useState,
    useEffect,
    useContext,
    useRef,
} from 'react'


import {
    Button,
    notification,
    Form,
    Dropdown, Avatar
} from 'antd'

import {
    LogoutOutlined,
    UserOutlined,
    WindowsOutlined
} from '@ant-design/icons'

import '@styles/top-nav.component.styles.css'

import logo from '@assets/hero.png'

import { AppContext } from '@context/AppContext'

import AuthenticationService from '@services/AuthenticationService';
import AsConfirmModal from '@components/modals/AsConfirmModal'

import profile from '@assets/profile.png'

const TopNavComponent: React.FC <any> = ({children}) => {
    const APP_NAME = import.meta.env.NAME;
    const {
        user,
        setUser,
        setIsProcessing,
        setUserWindow,
        userWindow
    }
    = useContext(AppContext)

    const [api, contextHolder] = notification.useNotification();

    const [displayConfirmLogout, setDisplayConfirmLogout] = useState<boolean>(false)

    const items = [
        {
            key: "profile",
            label: `Profile - ${user?.user?.full_name}`,
            icon: <UserOutlined />,
        },
        {
            key: "logout",
            label: "Logout",
            icon: <LogoutOutlined />,
        },
        {
            key: "window-mode",
            label: "Window Mode",
            icon: <WindowsOutlined />,
        },
    ];
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

    const handleProfileMenuClick = (e: any) => {
        const menus: any = {
            "logout": () => {
                setDisplayConfirmLogout(true)
            }
        }
        menus[e?.key]()
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
                <div id='image-profile-container'>
                    
                    <Dropdown menu={{ items, onClick: handleProfileMenuClick }} placement="bottomLeft" trigger={["click"]}>
                        <img src={profile} width='50'/>
                    </Dropdown>
                </div>

                <div id='user-detail-container'>
                    {user?.user?.department?.name} - {userWindow ? userWindow?.name : ''} <br />
                    <span>{user?.user?.designation}</span>
                </div>
                <div >
   
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
                        
                    </Button>

                </div>
            </div>
        </div>
    )
}

export default TopNavComponent;