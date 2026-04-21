import React, { 
  useEffect,
  //  useState,
  //  useContext
} from 'react'

import {Spin} from 'antd';

import '@styles/loading.layout.css'

interface LoadingLayoutProps {
    isLoading: boolean,
    children: React.ReactNode
}

const LoadingLayout: React.FC <LoadingLayoutProps> = ({isLoading, children}): React.ReactElement => {
    useEffect(() => {
        //console.log(isLoading)
    }, [isLoading])

    return (<>
     {isLoading ? 
        <div className="main-loading-component">
            <Spin size="large" />
        </div> :
        <>{children}</>
     }
    </>)
}

export default LoadingLayout;