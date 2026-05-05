import { 
    useState, 
    useEffect,
    useContext
} from 'react'

//import '@styles/App.css'
//import '@styles/index.css'
import '@styles/main.css'

import { Helmet } from 'react-helmet-async'
import { Route, Routes } from 'react-router-dom'
import { AppContext } from '@context/AppContext'
import { useNavigate } from "react-router-dom"

import QueueNumberLayout from '@layouts/QueueNumberLayout'
import NewTransactionLayout from '@layouts/NewTransactionLayout'
import LoadingLayout from '@layouts/LoadingLayout'

import TransactionWindow from '@pages/new-transaction/TransactionWindow'
import TransactionConcern from '@pages/new-transaction/TransactionConcern'
import WindowsChannelPage from '@pages/WindowsChannelPage'
import QueueLogsPage from '@pages/main/QueueLogsPage'
import ProfileSettings from '@pages/main/settings/ProfileSettings'
import ConcernSettings from '@pages/main/settings/ConcernSettings'
import UserSettings from '@pages/main/settings/UserSettings'
import WindowSettings from '@pages/main/settings/WindowSettings'

import SettingsLayout from '@layouts/SettingsLayout'

import MainLayout from '@layouts/MainLayout'

import Dashboard from '@pages/main/Dashboard'

import LoginLayout from './layouts/LoginLayout'

import ConditionalRenderingLayout from '@layouts/ConditionalRenderingLayout'

const App = (): React.ReactElement => {

    const {
        isLoading,
        setIsLoading,
        user,
        setUser,
        userWindow,
        setUserWindow
    }
    = useContext(AppContext)

    const navigate = useNavigate();

    useEffect(() => {
        let t = setTimeout(() => {
           //setIsLoading((prev: boolean) => !prev)
           setIsLoading(false)
        }, 1000)
        return () => clearTimeout(t)
    }, [])

    useEffect(() => {
        const exemptedRoute = [
            'new-transaction',
            'windows',
        ]

        let loc = location.pathname.split('/')[1];

        if (user && user?.user) {
            localStorage.setItem('user', JSON.stringify(user))
        } else {
            // restore user from local storage if it exists
            let storedUser = localStorage.getItem('user');
            if (storedUser) {
                let parsed = JSON.parse(storedUser);

                if (parsed && parsed.user) {
                    setUser(parsed)
                }
            }
        }

        if (userWindow) {
            localStorage.setItem('userWindow', JSON.stringify(userWindow))
        } else {
            // restore user from local storage if it exists
            let storedUserWindow = localStorage.getItem('userWindow');

            if (storedUserWindow) {
                let parsed = JSON.parse(storedUserWindow);
                if (parsed) {
                    setUserWindow(parsed)
                }
            }
        }

        if(! exemptedRoute.includes(loc) && loc === '') {
            navigate('')
        }
    }, [user, userWindow])
    
    const renderLayout: any = (): React.ReactElement => {
        let auth = localStorage.getItem('user');

        let parsed = auth ? JSON.parse(auth ?? '') : {};

        return (parsed && parsed.user) ? <MainLayout /> : <LoginLayout />
    }

    return (<>
        <LoadingLayout isLoading={isLoading}>
            <Routes>
                <Route element={renderLayout()} >
                    <Route path='/' element={<Dashboard />} />
                    
                    <Route path='/queues' element={<QueueLogsPage />} />
                    
                    <Route path='/settings' element={<SettingsLayout />}>
                        <Route path='profile' element={<ProfileSettings />} />
                        {user?.designation == 'admin' ? 
                            <>
                                <Route path='concern' element={<ConcernSettings />} />
                                <Route path='window' element={<WindowSettings />} />
                                <Route path='user' element={<UserSettings />} />
                            </>
                        : ''}
                    </Route>
                    
                </Route>    

                <Route path="*" element={<>Not found</>} />
           
                <Route path='/new-transaction' element={<NewTransactionLayout />}>
                    <Route path="company/:companyId/department/:departmentId/concerns" element={<TransactionConcern />} />
                    <Route path="company/:companyId/department/:departmentId/concerns/:concernId/windows" element={<TransactionWindow />} />
                </Route>

                <Route path='/windows' element={<NewTransactionLayout />} >
                    <Route path='company/:companyId/department/:departmentId' element={<WindowsChannelPage />} />
                </Route>
            </Routes>
        </LoadingLayout>
    </>);
}

export default App;