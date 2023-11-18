import Layout from '@/components/layouts/Layout';
import { Button } from '@/components/ui/button';
import React, { FC } from 'react'

interface proofattachmentProps {

}

const proofattachment: FC<proofattachmentProps> = ({ }) => {
    return (
        <Layout>
            <div className="w-[80%]">

                <h2 className=' font-extrabold text-5xl '>Taxing Laughter: The Joke Tax
                    Chronicles</h2>
                <p className=' pt-3'>The king, seeing how much happier his subjects were, realized the error of his ways and <br />repealed the joke tax.</p>
                <div className=" grid grid-cols-2 justify-center items-center pt-3 ">
                    <div className="flex items-start justify-center shrink-0 gap-2">
                        <div className=" w-12 h-12 rounded-xl bg-slate-300"></div>
                        <div className=" flex flex-col justify-center items-start gap-1">
                            <h3 className=' font-semibold'>Proof of employeement</h3>
                            <p className=' text-sm max-w-[80%]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut la</p>
                            <Button>Sign up</Button>

                        </div>
                    </div>
                    <div className="flex items-start justify-center shrink-0 gap-2">
                        <div className=" w-12 h-12 rounded-xl bg-slate-300"></div>
                        <div className=" flex flex-col justify-center items-start gap-1">
                            <h3 className=' font-semibold'>Proof of employeement</h3>
                            <p className=' text-sm max-w-[80%]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut la</p>
                            <Button>Sign up</Button>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default proofattachment;