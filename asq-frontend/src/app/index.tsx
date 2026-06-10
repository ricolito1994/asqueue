import { 
    useEffect,
    useContext
} from 'react'

import '@styles/main.css'

import { Helmet } from 'react-helmet-async'
import { Route, Routes, Navigate } from 'react-router-dom'
import { AppContext } from '@context/AppContext'
import { useNavigate } from "react-router-dom"

import LoadingLayout from '@layouts/LoadingLayout'
import QueueScreenLayout from '@layouts/QueueScreenLayout'

import TransactionWindow from '@pages/new-transaction/TransactionWindow'

import QueueLogsPage from '@pages/main/QueueLogsPage'

import QueueDisplayV2 from '@pages/QueueDisplayV2'

import LoginLayout from './layouts/LoginLayout'

import ConditionalRenderingLayout from '@layouts/ConditionalRenderingLayout'

import SettingsLayout from '@layouts/SettingsLayout'

import FrontDeskLayout from './layouts/FrontDeskLayout'
import ClerkLayout from './layouts/ClerkLayout'
import ClerkDashboard from './layouts/clerk/ClerkDashboard'

import ProfileSettings from '@pages/main/settings/ProfileSettings'

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

        let parsed = (auth ? JSON.parse(auth) : (user ? user: {} ));

        return (parsed && parsed.user) ? <ClerkLayout /> : <LoginLayout />
    }

    return (<>
        <LoadingLayout isLoading={isLoading}>
            <Routes>

                {/* New Routing for Clerk */}
                <Route element={renderLayout()}>
                    <Route path="/" >
                        <Route path="" element={<ClerkDashboard />} /> 
                        <Route path="/queue-logs" element={<QueueLogsPage />} /> 
                        <Route path="/settings" element={<SettingsLayout />} >
                            <Route path="" element={<ProfileSettings />} />
                        </Route>
                    </Route>
                    {/* <Route path="/clerk/settings"   element={<SettingsPage />} />  */}
                </Route>    

                <Route path="*" element={<>Not found</>} />
           
                <Route path='/new-transaction'>
                    <Route path="company/:companyId/department/:departmentId/concerns" element={<FrontDeskLayout />} />
                    <Route path="company/:companyId/department/:departmentId/concerns/:concernId/windows" element={<TransactionWindow />} />
                </Route>

                <Route path='/windows' element={<QueueScreenLayout />} >
                    <Route path='company/:companyId/department/:departmentId' element={<QueueDisplayV2 />} />
                </Route>
            </Routes>
        </LoadingLayout>
    </>);
}

export default App;