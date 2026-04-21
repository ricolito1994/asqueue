
import React from 'react'

import {Card} from 'antd'

import { useClock } from '@/app/hooks/useClock'


const Clock : React.FC <any> = ({}) : React.ReactElement => {
    const t = useClock()
    return (
        <Card 
            className='box-shadow' 
            style={{
                height: '100%'
            }}
        >   
            <div>
                <h1>{t.time.toLocaleTimeString()}</h1>
            </div>
            <div>
                <h2>{t.time.toLocaleDateString()}</h2>
            </div>
            <div>
                <h2>{t.today}</h2>
            </div>
        </Card>
    )
}

export default Clock;