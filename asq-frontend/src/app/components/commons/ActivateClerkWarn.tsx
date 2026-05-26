import React , {
    useEffect,
    useContext
} from 'react';

import {Button} from 'antd'

import ConditionalRenderingLayout from '@layouts/ConditionalRenderingLayout';

import { useActiveClerk } from '@hooks/useActiveClerk';

const ActivateClerkWarn: React.FC <any> = ({}): React.ReactElement => {
    const {activeWindow} = useActiveClerk();
    return (
        <ConditionalRenderingLayout
            condition={(activeWindow?.sessions.length === 0)}
            elseRender={''}
        >
            <div style={{
                backgroundColor: '#fff3cd',
                color: '#856404',
                border: '1px solid #ffeeba',
                borderRadius: '6px',
                width: '99%',
                padding: '1%'
            }}>
                <b>Warning:</b> you are logged in but not an active clerk yet. Kindly press the button and activate.&nbsp;
                <Button
                    style={{
                        fontSize : '15px',
                        fontWeight: 'bold',
                    }}
                    color="purple"
                    variant="solid" 
                    onClick={()=>{}}
                >
                    ACTIVATE
                </Button>
            </div>
        </ConditionalRenderingLayout>
    )
}

export default ActivateClerkWarn;