import React , {
    useRef,
    useContext,
    useCallback,
    useEffect
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
            {/* Alert banner */}
            <div className="flex items-center gap-2.5 px-4 py-2.5 bg-[#fefbe8] border border-[#e8d96a] rounded-lg text-[12.5px] text-[#7a6400]">
                <i className="ti ti-alert-triangle text-[16px] text-[#c9a800] shrink-0" aria-hidden="true" />
                <span>
                <strong>Warning:</strong> You are logged in but not an active clerk yet. Kindly press the button to activate.
                </span>
                <button 
                    className="ml-auto bg-blue-600 text-white text-[11.5px] font-medium px-3.5 py-1.5 rounded-lg hover:bg-blue-700 transition-colors shrink-0"
                    onClick={setActiveUserSession}
                >
                Activate
                </button>
            </div>
        </ConditionalRenderingLayout>
    )
}

export default ActivateClerkWarn;