import React, { 
    useEffect,
    useState,
    useContext,
    useRef,
} from 'react'

import {
    Form,
    Button,
    Input,
    Card,
    Spin,
    notification
} from 'antd'

import {
    UserOutlined,
    LockOutlined
} from '@ant-design/icons'

import AuthenticationService from '@services/AuthenticationService'

import { QueueManagerService } from '@services/QueueManagerService'
import {AppContext} from '@context/AppContext'

import '@styles/login.layout.style.css'
// import {UserLogin} from '@models/user.model'

interface ProcessAuthenticationModel {
    username: string,
    password: string,
}

const LoginLayout: React.FC <any> = (): React.ReactElement => {
    const [processLogin, setProcessLogin] = useState<boolean>(false);
    const [api, contextHolder] = notification.useNotification();

    const {
        user,
        setUser,
        setUserWindow
    }
    = useContext(AppContext)

    const auth = useRef(new AuthenticationService(null));

    const qmService = useRef(new QueueManagerService(null));

    const authenticate = async (values: ProcessAuthenticationModel) => {
        try {
            setProcessLogin(true);
            let loginData = await auth.current.login<any>(values)
            console.log(loginData.user.id)
            let userWindow = await qmService.current.findWindowByAssignedTo(loginData.user.id, null, {
                params : {
                    company_id : loginData.user.company.id,
                    department_id: loginData.user.department.id,
                }
            })
            setUser(loginData)
            setUserWindow(userWindow)
        } catch (e: any) {
            api.open({
                message: e?.response.data.message,
                description: e?.response.data.reason,
                type: 'error'
            })
        } finally {
            setProcessLogin(false);
        }
    }

    return (
        <Spin className='login-spin' spinning={processLogin} size="large" description="Loading...">
            {contextHolder}
            <div className="login-container">
                <Card title="QUEUEING SYSTEM" className="login-card box-shadow">
                    <Form
                        name="login"
                        onFinish={authenticate}
                        layout="vertical"
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: "Please enter username" }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Username" />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: "Please enter password" }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </Spin>
    )
}

export default LoginLayout;