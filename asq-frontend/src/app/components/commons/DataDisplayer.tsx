import React, {useState, useEffect} from 'react';
import { Spin } from 'antd'

interface DataDisplayerProps {
    service: any,
    serviceMethod: string,
    serviceParams: Object,
    displayField: string,
    index: number,
}


const DataDisplayer: React.FC <DataDisplayerProps> = ({
    service,
    serviceMethod,
    serviceParams,
    displayField,
    index
}): React.ReactElement => {

    const [isLoading, setIsLoading] = useState <boolean> (true)
    const [data, setData]  = useState <any> (null)

    const loadData = async () => {
        try {
            setIsLoading(true)
            let data = await service[serviceMethod] (...Object.values(serviceParams));
            setData(data)
            setIsLoading(false)
        } catch (e) {
            console.error(e)
        }
    }
    
    useEffect (() => {
        service?.enableAbort();
        loadData()

        return () => {
            service?.abortController?.abort()
        }

    }, [index])


    return (
        <Spin spinning={isLoading}> 
            {data ? data[displayField] : ''}
        </Spin>
    )
} 

export default DataDisplayer;