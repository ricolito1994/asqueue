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

import '@styles/settings.style.css'

import { Outlet, useLocation } from 'react-router-dom'

import { useNavigate } from "react-router-dom"

import "@styles/new-transaction.layout.css"

import { useParams } from 'react-router-dom';

import ConditionalRenderingLayout from '@layouts/ConditionalRenderingLayout'

import { AppContext } from '@context/AppContext'

const SettingsLayout: React.FC <any> = ({}): React.ReactElement => {

    const {user} = useContext(AppContext)

    const navigate = useNavigate();

    const page = location.pathname.split('/').pop();
    
    return (
        <div id="main-dashboard-container">
            <div className='long-bar-title'>
                Settings - {page}
            </div>
            <div className='settings-menu-container'>
                <ConditionalRenderingLayout
                    condition={user?.designation == 'admin'}
                    elseRender={''}
                >
                    <div className='settings-menu-item'>
                        <Button
                            style={{
                                fontSize : '15px',
                                fontWeight: 'bold',
                                width: '100%',
                                padding: '2%'
                            }}
                            color="primary"
                            variant={page === 'profile' ? 'outlined' : "solid"} 
                            onClick={()=>{
                                navigate('/settings/profile')
                            }}
                        >
                            Profile
                            <StepForwardOutlined />
                        </Button>
                    </div>
                    <div className='settings-menu-item'>
                        <Button
                            style={{
                                fontSize : '15px',
                                fontWeight: 'bold',
                                width: '100%',
                                padding: '2%'
                            }}
                            color="primary"
                            variant={page === 'user' ? 'outlined' : "solid"} 
                            onClick={()=>{
                                navigate('/settings/user')
                            }}
                        >
                            Users
                            <StepForwardOutlined />
                        </Button>
                    </div>
                    <div className='settings-menu-item'>
                        <Button
                            style={{
                                fontSize : '15px',
                                fontWeight: 'bold',
                                width: '100%',
                                padding: '2%'
                            }}
                            color="primary"
                            variant={page === 'window' ? 'outlined' : "solid"} 
                            onClick={()=>{
                                navigate('/settings/window')
                            }}
                        >
                            Windows
                            <StepForwardOutlined />
                        </Button>
                    </div>
                    
                    <div className='settings-menu-item'>
                        <Button
                            style={{
                                fontSize : '15px',
                                fontWeight: 'bold',
                                width: '100%',
                                padding: '2%'
                            }}
                            color="primary"
                            variant={page === 'concern' ? "outlined" : "solid"} 
                            onClick={()=>{
                                navigate('/settings/concern')
                            }}
                        >
                            Concerns
                            <StepForwardOutlined />
                        </Button>
                    </div>
                </ConditionalRenderingLayout>
            </div>
            <div className='settings-main-container'>
                <Outlet />
            </div>
        </div>
    )
}

export default SettingsLayout;