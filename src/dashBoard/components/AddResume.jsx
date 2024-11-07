import { Loader2, PlusSquare } from "lucide-react";
import { Button } from "../../components/ui/button"; 
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from 'uuid';
import GlovalApi from './../../../sarvice/GlovalApi';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";


function AddResume() {
    const [openDialog, setOpenDialog] = useState(false);
    const [resumTitle, setResumeTitle] = useState('');
    const [loading, setLoading] = useState(false)
    const { user } = useUser();
    const navigation=useNavigate()

    const onCreate=async()=>{
        setLoading(true)
        const uuid=uuidv4();
        const data={
            data:{
                title:resumTitle,
                resumeId:uuid,
                userEmail:user?.primaryEmailAddress?.emailAddress,
                userName:user?.fullName
            }
        }
        
        // API কলের জন্য await ব্যবহার করা

        GlovalApi.CreateNewResume(data).then(resp=>{
            console.log(resp.data.data.documentId);
            if(resp)
            {
                setLoading(false);
                navigation('/dashboard/resume/'+resp.data.data.documentId+"/edit");
            }
        },(error)=>{
            setLoading(false);
        })

    }

    return (
        <div>
            <div onClick={() => setOpenDialog(true)} className="flex items-center justify-center py-24  border rounded-lg p-14 bg-secondary h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed">
                <PlusSquare />
            </div>
            <Dialog open={openDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Resume</DialogTitle>
                        <DialogDescription>
                            <p>Add a title for your new resume</p>
                            <Input 
                                onChange={(e) => setResumeTitle(e.target.value)} 
                                className='my-2' 
                                placeholder="Ex. Full Stack Resume"
                            />
                        </DialogDescription>
                        <div className="flex justify-end gap-5">
                            <Button onClick={() => setOpenDialog(false)} variant='ghost'>Cancel</Button>
                            <Button onClick={onCreate} disabled={!resumTitle || loading}>
                            {loading? <Loader2 className="animate-spin"/> : 'Create'} </Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddResume;
