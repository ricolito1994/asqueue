import React from 'react';

interface ConditionalRenderingLayoutProps {
    children: React.ReactNode,
    condition: boolean,
    elseRender: React.ReactElement | string
}

const ConditionalRenderingLayout: React.FC <ConditionalRenderingLayoutProps> = ({
    children, 
    condition, 
    elseRender
}): React.ReactElement => {
    return (<>
        {condition ? children : elseRender}
    </>)
}

export default ConditionalRenderingLayout