import Layout from '@/components/layouts/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import React, { FC } from 'react'

interface SubmitClaimProps {

}

const SubmitClaim: FC<SubmitClaimProps> = ({ }) => {
    return (
        <Layout>
            <div className="w-[80%] mx-auto">
                <h2 className=' text-5xl font-extrabold'>Submit Claim</h2>
                <p className='pt-1'>The king, seeing how much happier his subjects were, realized the error of his ways and repealed the <br /> joke tax.</p>
                <div className="mt-4 flex flex-col gap-4 ">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="name">Name</Label>
                        <Input type="text" id="name" placeholder="Enter the name" />
                    </div>
                    <div className="grid w-full gap-1.5">
                        <Label htmlFor="message">Your message</Label>
                        <Textarea placeholder="Type your message here." id="message" />
                        <p className="text-sm text-muted-foreground">
                            Your message will be copied to the support team.
                        </p>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="Upload">Upload</Label>
                        <Input id="Upload" type="file" />
                    </div>
                    <Button onClick={() => {
                        toast({
                            description: "Claim submitted sucessfully",
                        })
                    }} className='w-full'>Submit</Button>
                </div>
            </div>
        </Layout>
    )
}

export default SubmitClaim;