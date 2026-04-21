import React , { useEffect, useState } from 'react'

import { 
    Modal ,
    Button
} from 'antd'

interface ModalProps {
    title: String,
    open: boolean,
    onOk?: Function,
    onCancel?: Function,
    styles?: Object,
    width? : number,
    children: React.ReactElement
}

const AsModal: React.FC <ModalProps> = ({
    title,
    open,
    onOk,
    onCancel,
    styles,
    width,
    children,
}): React.ReactElement => {

    const disableStyle = {
        style: {
            display: 'none'
        }
    }

    return (
        <Modal
            title={title}
            open={open}
            onCancel={()=> onCancel ? onCancel() : {}}
            onOk={()=> onOk ? onOk() : {}}
            okButtonProps={onOk ? {} : disableStyle}
            cancelButtonProps={onCancel ? {} : disableStyle}
            closable={onCancel ? true : false}
            width={width}
        >
            {children}
        </Modal>
    )
}

export default AsModal