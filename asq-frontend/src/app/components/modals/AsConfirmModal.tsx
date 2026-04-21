import React, { useState, useEffect, useContext } from 'react'

import AsModal from './AsModal'

import {
    Button
} from 'antd'

import {
    LoginOutlined,
    CloseOutlined,
}
from '@ant-design/icons'

import '@styles/asmodal.confirm.dialog.style.css'

interface AsModalProps {
    onOk: Function,
    okText: string,
    onDeny: Function,
    denyText?: string,
    onCancel?: Function,
    title? : string,
    content? : string,
    isOpen: boolean
}

const AsConfirmModal: React.FC <AsModalProps> = ({
    onOk,
    okText,
    onDeny,
    denyText,
    onCancel,
    title,
    content,
    isOpen
}): React.ReactElement => {
    return (
        <AsModal
            title=""
            open={isOpen} 
        >
            <div id="asmodal-confirm-dialog-container">
                <div className='contents'>
                    <span id='concern-name'>{title}</span>
                </div>

                <div className='contents'>
                    {content}
                </div>

                <div className='contents as-modal-footer'>
                    {onOk?
                    <Button
                        style={{
                            fontSize : '15px',
                            fontWeight: 'bold',
                            padding: '5%',
                            width: '50%'
                        }}
                            color="green"
                            variant="solid" 
                            onClick={()=>onOk()}
                        >
                        <LoginOutlined /> {okText}
                    </Button>:''}
                    {onDeny?
                    <Button 
                        style={{
                            fontSize : '15px',
                            fontWeight: 'bold',
                            padding: '5%',
                            width: '50%'
                        }}
                            color="volcano"
                            variant="solid" 
                            onClick={() => onDeny()}
                        >
                        <CloseOutlined />
                            {denyText}
                    </Button>:''}
                    
                </div>
                {onCancel?
                <div className='as-modal-footer'>
                    <Button 
                        style={{
                            fontSize : '15px',
                            fontWeight: 'bold',
                            padding: '5%',
                            width: '100%'
                        }}
                            color="red"
                            variant="solid" 
                            onClick={() => onCancel()}
                        >
                        <CloseOutlined />
                            CANCEL
                    </Button>
                </div>:''}
            </div>   
        </AsModal>
    )
}

export default AsConfirmModal;