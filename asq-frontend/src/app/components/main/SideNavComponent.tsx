import React, {
    useState,
    useEffect,
    useContext,
    useRef,
} from 'react'

import '@styles/side-nav.component.styles.css'

import { Link, useLocation } from 'react-router-dom'

import { AppContext } from '@context/AppContext';

import {
    HomeOutlined,
    SettingOutlined,
    UserOutlined
} from '@ant-design/icons'

const SideNavComponent: React.FC <any> = ({children}) => {

    const location = useLocation();

    const {user} = useContext(AppContext)

    const isActiveLink = (path: string): string => {
        return location.pathname.split('/')[1] === path ? 'active' : '';
    }

    return (
        <div id='side-nav-component'>
            
            <div id='side-nav-container'>
                <ul>
                    <li>
                        <Link className={isActiveLink("")} to='/'>
                            <HomeOutlined /> Dashboard
                        </Link>
                    </li>
                    {/*<li>
                        <Link className={isActiveLink("settings")} to='/settings'>
                            <SettingOutlined /> Settings
                        </Link>
                    </li>*/}
                    <li>
                        <Link className={isActiveLink("queues")} to='/queues'>
                            <SettingOutlined /> Queue Logs
                        </Link>
                    </li>
                    <li>
                        <Link className={isActiveLink("settings")} to='/settings/profile'>
                            <UserOutlined /> Settings
                        </Link>
                    </li>
                    {/*<li>
                        <Link className={isActiveLink("me")} to='/me'>
                            <UserOutlined /> Settings
                        </Link>
                    </li>  */}
                </ul>
            </div>

        </div>
    )
}

export default SideNavComponent;