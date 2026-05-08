import React, { 
  useEffect,
  useState,
  //  useContext
  useRef
} from 'react'

import { Outlet } from 'react-router-dom'

const QueueScreenLayout: React.FC <any> = ({}): React.ReactElement => {
    return(<><Outlet /></>)
}

export default QueueScreenLayout;