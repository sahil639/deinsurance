import React, { FC } from 'react'
import { Card } from '../ui/card';

interface LayoutProps {
    children: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <div className='w-full bg-gray-100 h-screen flex justify-center items-center'>
            <div className="flex flex-row font-bold text-lg fixed top-0 left-0 right-0 justify-between items-center py-3 shadow-sm px-10 bg-white">
                DESURANCE
            </div>
            <Card className=' w-[85%] h-[80%] p-12 overflow-x-hidden overflow-y-scroll'>
            {children}
            </Card>
        </div>
    )
}

export default Layout;