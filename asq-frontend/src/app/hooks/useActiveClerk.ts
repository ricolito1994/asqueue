import React, {
    useEffect,
    useRef,
    useContext,
    useState,
} from 'react';

import { QueueManagerService } from '@services/QueueManagerService';

import { AppContext } from '@context/AppContext';

import dayjs from 'dayjs';

export const useActiveClerk = () => {

    const {user} = useContext(AppContext)

    const [activeWindow, setActiveWindow] = useState<any>(null)

    const qm = useRef(new QueueManagerService(null))

    const today = dayjs()

    useEffect(() => {
        const getWindow = async () => {
            let window = await qm.current.findWindowByAssignedTo(user?.user?.id, null, {
                params: {
                    "company_id" : user?.user?.company_id,
                    "department_id": user?.user?.department_id,
                    "session_type" : "active",
                    "date" : today.format("YYYY-MM-DD")
                }
            })
            setActiveWindow(window)
        }
        getWindow();
    }, [])

    return {
        activeWindow
    }
}