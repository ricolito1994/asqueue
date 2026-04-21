import React, {
    useEffect,
    useContext,
    useState
} from 'react'

import {
    notification,
    Table,
    Button,
    Spin
} from 'antd'

interface DatatableProps {
    children: React.ReactElement,
    columnData : any [],
    service: any,
    method: string,
    props: any,
    isDataTableLoading: boolean,
    setIsDataTableLoading: Function,
    rowClassName? : any,
    scrollVal?:any,
    style?:any,
    setResultsReusableOutsideDataTable? : any,
}

import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import '@styles/data-table.styles.css'

const Datatable  = <T=any> ({
    children,
    columnData,
    service,
    method,
    props,
    isDataTableLoading,
    setIsDataTableLoading,
    rowClassName,
    scrollVal,
    style,
    setResultsReusableOutsideDataTable
}: DatatableProps): React.ReactElement => {
    const [resultData, setResultData] = useState<T|any>([]);
    const [paginationLinks, setPaginationLinks] = useState<any>([])
    const [currentPage, setCurrentPage] = useState<Number>(1);
    const [partialSize, setPartialSize] = useState<number>(0);
    const [totalSize, setTotalSize] = useState<number>(0);

    const processData = async (firstLoad:boolean = false) => {
        try {
            if (! firstLoad)
                setIsDataTableLoading(true)
            let data = await service[method] (...Object.values(props));
            
            let rData = data.data.data ?? data.data;
            
            let linksData = data.data.links ?? data.links

            let resultData = rData.map((item:any, index:number) => { return {
                ...item, key: index.toString()
            }})

            if (setResultsReusableOutsideDataTable)
                setResultsReusableOutsideDataTable(resultData)

            setResultData(resultData);
            setPaginationLinks(linksData)
            setPartialSize(data.data.to ?? data.to)
            setTotalSize(data.data.total ?? data.total)
        } catch (e) {
            console.error(e)
        } finally {
            setIsDataTableLoading(false)
        }
    }

    const renderPagniationLabel = (pagination: any, index:any) : React.ReactNode => {
        if (pagination.label.includes("Next")) {
            return (
                <Button key={index} disabled={!pagination.url || isDataTableLoading} type="link" onClick={() =>{
                    setIsDataTableLoading((prev : any)=> !prev);
                    
                    setCurrentPage(pagination.page);
                }}>
                    <RightOutlined />
                </Button> 
            )
        } else if (pagination.label.includes("Previous")){
            return  (
                <Button key={index} disabled={!pagination.url || isDataTableLoading} type="link" onClick={() =>{
                    setIsDataTableLoading((prev : any)=> !prev);
                    setCurrentPage(pagination.page);
                }}>
                    <LeftOutlined />
                </Button> 
            )
        } 
        return  (
            <Button key={index} disabled={isDataTableLoading} type={!pagination.active ? "default" : 'primary'} 
                onClick={() => {
                    setIsDataTableLoading((prev : any)=> !prev);
                    setCurrentPage(pagination.page)
                }}>
                {pagination.label}
            </Button> 
        );
    }

    useEffect (() => {
        if (! isDataTableLoading) return

        //setTimeout(() => {
            props = {
                ...props,
                page: currentPage
            }
            service.enableAbort();
            processData()
            return () => {
                service.abortController.abort()
            }
        //}, 500);
    }, [currentPage, isDataTableLoading])

    return (
       <div className="data-table">
            {children}
            <div className="data-table-container">
                <Table 
                    dataSource={resultData}
                    columns={columnData}
                    pagination={false}
                    scroll={!scrollVal ? { y: 300 }: scrollVal}
                    style={!style ? {
                        height: '370px'
                    }: style}
                    loading={isDataTableLoading}
                    rowClassName={rowClassName}
                    sticky
                />
            </div>
            <div className="paginator">
                <div className="total-number-of-items">
                    {partialSize ?? 0} out of {totalSize ?? 0} items
                </div>
                <div className="buttons">
                    <div className="buttons-container">
                        {paginationLinks.map(
                            (value:any, key:number) => {
                                return (renderPagniationLabel(value, key))
                            }
                        )}
                    </div>
                </div>
            </div>
       </div>
    )
}
export default Datatable;