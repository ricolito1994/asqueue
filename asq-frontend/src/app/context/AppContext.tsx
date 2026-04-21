import React, {
    useEffect,
    useState,
} from 'react'

// import { UserLogin } from '@models/user.model';


import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const AppContext = React.createContext<any>(null);

const AppContextProvider = ({ children }: {children: React.ReactNode}) => {
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    const [isProcessing, setIsProcessing] = useState<Boolean>(false);

    const [user, setUser] = useState<any>(null);
    const [userWindow, setUserWindow] = useState<any>(null)
    
    return (
        <AppContext.Provider value={{
            isLoading,
            setIsLoading,
            user,
            setUser,
            isProcessing,
            setIsProcessing,
            userWindow,
            setUserWindow
        }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider }