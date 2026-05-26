import React , {
    useRef,
    useContext,
    useCallback,
} from 'react';

import {Button} from 'antd'

import ConditionalRenderingLayout from '@layouts/ConditionalRenderingLayout';

import { useActiveClerk } from '@hooks/useActiveClerk';

import AuthenticationService from '@services/AuthenticationService';

import { AppContext } from '@context/AppContext';

const ActivateClerkWarn: React.FC <any> = ({}): React.ReactElement => {

    const {
        user, 
        setUser,
        userWindow,
        setIsLoading
    } = useContext(AppContext)

    const onRefreshToken = (data: any) => {
        setUser((prev: any) => ({
            ...prev,
            access_token: data.access_token,
            refresh_token: data.refresh_token
        }))
    }

    const authService = useRef(new AuthenticationService(user?.access_token ?? null, 
        null, 
        user?.refresh_token,
        onRefreshToken
    ))

    const setActiveUserSession = useCallback(async ()=>{
        try {
            setIsLoading(true)
            await authService.current.setActiveSession(user?.user.id, {}, {
                params: {
                    window_id: userWindow.id
                }
            })
        } catch (e:any) {
            console.error(e)
        } finally {
            setIsLoading(false)
        }
    }, [])

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
                    onClick={setActiveUserSession}
                >
                    ACTIVATE
                </Button>
            </div>
        </ConditionalRenderingLayout>
    )
}

export default ActivateClerkWarn;