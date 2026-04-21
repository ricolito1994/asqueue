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


const WindowSettings: React.FC = (): React.ReactElement => {
    return (<>window</>)
}

export default WindowSettings;