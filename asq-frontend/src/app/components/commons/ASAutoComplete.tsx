import React, {
    useState, 
    useEffect, 
    useMemo
} from 'react';
import { useDebounce } from '@hooks/useDebounce';
import { 
    AutoComplete, 
    Input, 
    Spin 
} from 'antd';

interface AutoCompletePropsData {
    service? : any,
    functionName? : any,
    data: any,
    setData: Function,
    payload?: any
    wAutoCompleteIndexPayload: string,
    wAutoCompleteIndexRsLabel: string,
    style?: any,
    placeholder?: any,
    clearData? : Function | undefined | null,
    wAutoUniqueID? : any
}

const ASAutoComplete : React.FC<AutoCompletePropsData> = ({
    service,
    functionName,
    data,
    setData,
    payload,
    wAutoCompleteIndexPayload,
    wAutoCompleteIndexRsLabel,
    style,
    placeholder,
    clearData,
    wAutoUniqueID
}): React.ReactElement  => {

    const [autoCompleteInputValue, setAutoCompleteInputValue] = useState<string>(data);
    const [resultData, setResultData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const debouncedAutoCompleteValue = useDebounce<any>(autoCompleteInputValue)

    useEffect(() => { 
      window.addEventListener(`wAutoCompleteClear:${wAutoUniqueID}`, handleClearData);
      return () => {
        window.removeEventListener(`wAutoCompleteClear:${wAutoUniqueID}`, handleClearData);
      }
    }, [])

    useEffect(()=>{
      const getData = async (value:any, signal:any|null = null) => {
        try {
            setIsLoading(true)
            if(signal) service?.setAbortControllerSignal(signal)
            if(!value) return;
            payload.payload[wAutoCompleteIndexPayload] = value;
            if(service[functionName]) {
                let data = await service[functionName](...Object.values(payload))
                setResultData(data)
            } else {
                throw "Function not existent";
            }
        } catch (e: any) {
            // err
            // throw e;
        } finally {
            setIsLoading(false)
        }
      }
      const controller = new AbortController();
      const signal = controller.signal;
      getData(debouncedAutoCompleteValue, signal)

      if (debouncedAutoCompleteValue.length === 0)
        setResultData([])
      
      return () => {
        controller.abort();
      }  
    }, [debouncedAutoCompleteValue])

    const searchValues = useMemo(()=>{
        return (resultData?.data?.data
            .map((item : any, index: any) => { 
                return {
                    item,
                    ...{
                        label : item[wAutoCompleteIndexRsLabel],
                        value : item.id
                    },
                } 
            })
        )
    }, [debouncedAutoCompleteValue, resultData]);
    
    const handleSelect = (value:any) => {
        let result = searchValues.find( (x:any) => x.value === value)
        setAutoCompleteInputValue(result.label)
        setData(result)
    }

    const handleChange = (value:any) => {
        setAutoCompleteInputValue(value)
    }    

    const handleClearData = () => {
        setAutoCompleteInputValue("")
    }

    return (<>
        <Spin spinning={isLoading}>
            <div className={"auto-complete-container"}>
                <AutoComplete
                    options={searchValues}
                    value={autoCompleteInputValue}
                    onSelect={handleSelect}
                    onSearch ={handleChange}
                    onClear={()=>{if(clearData) clearData()}}
                    style={style}
                    allowClear
                >
                    <Input 
                        placeholder={placeholder} 
                        style={style}
                    />
                </AutoComplete>
            </div>
        </Spin>
    </>)
}

export default React.memo(ASAutoComplete);