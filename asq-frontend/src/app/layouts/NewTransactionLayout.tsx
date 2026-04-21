import React, { 
  useEffect,
  useState,
  //  useContext
  useRef
} from 'react'

import { Outlet } from 'react-router-dom'

import "@styles/new-transaction.layout.css"

import { useParams } from 'react-router-dom';

import hero from '@assets/hero.png'

import { Button } from 'antd';

import { DoubleLeftOutlined } from '@ant-design/icons';

import { useNavigate } from "react-router-dom";

import LoadingLayout from './LoadingLayout';

import { TTSService } from '@services/TTSService';

import AuthenticationService from '@services/AuthenticationService';


// frontdesk layout - render for new/incoming transaction/concern
const NewTransactionLayout: React.FC <any> = (): React.ReactElement => {
    const tts = useRef<any>(new TTSService());
    
    const navigate = useNavigate();

    const authService = useRef(new AuthenticationService(null));

    const [department, setDepartment] = useState<any>(null)


    const {
      companyId, 
      departmentId,
      concernId,
    } = useParams();

    const back = () => {
        navigate(`/new-transaction/company/${companyId}/department/${departmentId}/concerns`)
    }

    useEffect(() => {
        const getDepartment = async () => {
            try {
                let dept = await authService.current.department(parseInt(departmentId ?? ''), null)
                setDepartment(dept)
            } catch (e) {
                console.error(e)
            }
        }
        getDepartment()
    }, [])

    return (
        <div className='new-transaction-layout'>
            <div className='new-transaction-layout-container'>
                <div className='new-transaction-title-container'>
                    <div className="company-logo">
                        {/** should be company logo */}
                        <img src={hero} width={100}/>
                    </div>
                    <div className="company-department">
                        <h1>{department?.name}</h1> {/** company name */}
                        <h3>{department?.company?.name}</h3> {/** department */}
                    </div>
                    <div className="back-button">
                        {concernId ? 
                            <Button 
                                color="purple" 
                                variant="solid"
                                onClick={()=>back()}
                                style={{
                                    width: '200px',
                                    height: '50px'
                                }}
                            >
                                <DoubleLeftOutlined />
                                BACK
                            </Button>
                        :
                            <Button 
                                color="purple" 
                                variant="solid"
                                onClick={()=>tts.current.speak('GOOD DAY ITS QUEUEING TIME!')}
                                style={{
                                    width: '200px',
                                    height: '50px'
                                }}
                            >
                                <DoubleLeftOutlined />
                                ENABLE VOICE
                            </Button>
                        }
                    </div>
                </div>
                <Outlet />
            </div>
        </div>
    )
}

export default NewTransactionLayout;