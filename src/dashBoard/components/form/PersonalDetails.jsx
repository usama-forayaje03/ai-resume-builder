import { useContext, useEffect, useState } from "react"
import { ResumeInfoContext } from "../../../context/ResumeInfoContext"
import {Button} from '@/components/ui/button' 
import {Input} from '@/components/ui/input' 
import { useParams } from "react-router-dom"
import GlovalApi from "../../../../sarvice/GlovalApi"
import { LoaderCircle } from "lucide-react"
import { toast } from "sonner"
export default function PersonalDetails({enableNext}) {
    const params = useParams()
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)
    const [formData , setFormData] = useState({})
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        console.log(params);
        
    },[])

    const handleChang = (e) => {
        enableNext(false)
        const {name,value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
        setResumeInfo({
            ...resumeInfo,
            [name]: value
        })

    }

    const onSave = (e) => {
        e.preventDefault()
        setLoading(true)
       const  data={
            data: formData
        }
        GlovalApi.UpdateResume(params?.resumeId,data).then(resp => {
            console.log(resp);
            enableNext(true)
            setLoading(false)
            toast("Detail updated.")
        },(error) => {
            setLoading(false)
        })
    }


  return (
    <div className="p-5 mt-10 border-t-4 rounded-lg shadow-lg border-t-primary">
      <h2 className="text-lg font-bold">Personal Details</h2>
      <p>Get Started with the basic information</p>

      <form  onSubmit={onSave}>
        <div className="grid grid-cols-2 gap-3 mt-5">
            <div>
                <label className="text-sm">First Name </label>
                <Input required onChange={handleChang} defaultValue={resumeInfo?.firstName} name='firstName'/>
            </div>
            <div>
                <label className="text-sm">Last Name </label>
                <Input required onChange={handleChang} defaultValue={resumeInfo?.lastName} name='lastName'/>
            </div>
            <div className="col-span-2">
                <label className="text-sm">Job Title</label>
                <Input required onChange={handleChang} defaultValue={resumeInfo?.jobTitle} name='jobTitle'/>
            </div>
            <div className="col-span-2">
                <label className="text-sm">Address</label>
                <Input required onChange={handleChang} name='address' defaultValue={resumeInfo?.address}/>
            </div>
            <div >
                <label className="text-sm">Phone</label>
                <Input required onChange={handleChang} name='phone' defaultValue={resumeInfo?.phone}/>
            </div>
            <div>
                <label className="text-sm">Email</label>
                <Input required onChange={handleChang} name='email' defaultValue={resumeInfo?.email}/>
            </div>
        </div>
        <div className="flex justify-end mt-3">
            <Button type='submit'
            disabled={loading}> {loading ? <LoaderCircle className="animate-spin" /> :  'Save'}</Button>
        </div>
      </form>
    </div>
  )
}
