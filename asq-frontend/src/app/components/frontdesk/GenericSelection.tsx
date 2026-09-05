import React, {
    useState,
    useEffect
} from 'react'

import { FileText } from 'lucide-react';

import ConditionalRenderingLayout from '@layouts/ConditionalRenderingLayout';

interface GenericSelectionInterface {
    selectionData: any,
    next: (data: any) => void,
    nextPage: (page: number) => void,
    prevPage: (page: number) => void,
    children: React.ReactElement
}

const GenericSelection: React.FC<GenericSelectionInterface> = ({
    selectionData,
    next,
    nextPage,
    prevPage,
    children
}): React.ReactElement => {

    const [currentPage, setCurrentPage] = useState(1);
    const [hasNext, setHasNext] = useState(false);
    const [hasPrev, setHasPrev] = useState(false);

    useEffect (() => {
        setHasNext(selectionData.prev_page_url!==null)
        setHasPrev(selectionData.next_page_url!==null)
        setCurrentPage(selectionData.current_page)
    }, [selectionData]);

    useEffect(() => {
        if (currentPage + 1 > currentPage)
            nextPage(currentPage)
        else if (currentPage - 1 < currentPage)
            prevPage(currentPage)
    }, [currentPage])
    
    return (
        <div className={`w-full max-w-6xl transition-opacity duration-150`}>
            {children}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectionData?.data?.map((data: any) => (
                    <button
                        key={data.id}
                        onClick={() => next(data)}
                        className={`
                            bg-white 
                            border-2 
                            border-[#D1D9F0] 
                            rounded-2xl p-6 
                            text-left 
                            hover:border-blue-500 
                            hover:bg-blue-50 
                            transition
                        `}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-blue-300 rounded-xl flex items-center justify-center">
                                <FileText />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {data.name}
                                </h2>
                                <p className="text-gray-500">
                                    department
                                </p>
                            </div>
                        </div>
                    </button>
                )
                )}
                <ConditionalRenderingLayout
                    condition={hasNext}
                    elseRender={''}
                >
                    <button
                        onClick={() =>
                            setCurrentPage((prev:number) => prev + 1)
                        }
                        className="bg-linear-to-br from-[#1B4FD8] to-[#1239A6] text-white rounded-2xl p-6 text-left"
                    >
                        <h3 className="text-lg font-semibold">
                            Next 
                        </h3>
                        <p className="text-white/80 text-sm">
                            More
                        </p>
                    </button>
                </ConditionalRenderingLayout>
                <ConditionalRenderingLayout
                    condition={hasPrev}
                    elseRender={''}
                >
                    <button
                        onClick={() =>
                            setCurrentPage((prev:number) => prev - 1)
                        }
                        className="bg-gray-200 text-gray-700 rounded-2xl p-6 text-left"
                    >
                        <h3 className="text-lg font-semibold">
                            Previous
                        </h3>
                        <p className="text-sm text-gray-500">
                            Go back
                        </p>
                    </button>
                </ConditionalRenderingLayout>
            </div>
        </div>
    )
}

export default GenericSelection;