import React, {
    useState,
    useEffect,
    useContext,
    useRef,
} from 'react'

import { Outlet } from 'react-router-dom';

import TopNavComponent from '@components/main/TopNavComponent';

import SideNavComponent from '@components/main/SideNavComponent';

import '@styles/main.component.styles.css'

const MainLayout: React.FC <any> = ({children}) => {
    return (
        <div id='main-layout'>
            <TopNavComponent />
            <div id="main-content">
                <SideNavComponent />
                <div id='main-container'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default MainLayout;