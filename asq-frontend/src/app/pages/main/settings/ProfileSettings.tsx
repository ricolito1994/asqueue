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

import profile from '@assets/profile.png'
import c from '@assets/vite.svg'
import w from '@assets/react.svg'

import { AppContext } from '@context/AppContext'


const ProfileSettings: React.FC = (): React.ReactElement => {
    const {
        user,
        userWindow
    } = useContext(AppContext)
    
    return (
        <div id="profile-settings-container">
            <div className='profile-image-container'>
                <Card 
                    className='box-shadow' 
                    style={{
                        height: '100%'
                    }}
                >
                    <img src = {profile} style={{'width': '100%'}}/>

                </Card>
            </div>
            <div className='profile-image-container grid-item-col-span-2 '>
                <Card 
                    className='box-shadow' 
                    style={{
                        height: '100%'
                    }}
                >
                    <div id='profile-details-container'>
                        <div id='profile-full-name-container'>{user?.user?.full_name}</div>
                        <div id='profile-company-name-container'>{user?.user?.company?.name}</div>
                    </div>
                </Card>
            </div>
           
        </div>
    )
}

export default ProfileSettings;