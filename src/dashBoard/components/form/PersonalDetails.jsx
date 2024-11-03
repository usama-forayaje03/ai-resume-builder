import { useContext } from "react"
import { ResumeInfoContext } from "../../../context/ResumeInfoContext"
import {Button} from '@/components/ui/button' 
import {Input} from '@/components/ui/input' 
export default function PersonalDetails({enableNext}) {
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)
    const handleChang = (e) => {
        enableNext(false)
        const {name,value} = e.target;
        setResumeInfo({
            ...resumeInfo,
            [name]: value
        })

    }
    const onSave = (e) => {
        e.preventDefault()
        enableNext(true)
    }
  return (
    <div className="p-5 mt-10 border-t-4 rounded-lg shadow-lg border-t-primary">
      <h2 className="text-lg font-bold">Personal Details</h2>
      <p>Get Started with the basic information</p>

      <form  onSubmit={onSave}>
        <div className="grid grid-cols-2 gap-3 mt-5">
            <div>
                <label className="text-sm">First Name </label>
                <Input required onChange={handleChang} name='firstName'/>
            </div>
            <div>
                <label className="text-sm">Last Name </label>
                <Input required onChange={handleChang} name='lastName'/>
            </div>
            <div className="col-span-2">
                <label className="text-sm">Job Title</label>
                <Input required onChange={handleChang} name='jobTitle'/>
            </div>
            <div className="col-span-2">
                <label className="text-sm">Address</label>
                <Input required onChange={handleChang} name='address'/>
            </div>
            <div >
                <label className="text-sm">Phone</label>
                <Input required onChange={handleChang} name='phone'/>
            </div>
            <div>
                <label className="text-sm">Email</label>
                <Input required onChange={handleChang} name='email'/>
            </div>
        </div>
        <div className="flex justify-end mt-3">
            <Button type='submit'>Save</Button>
        </div>
      </form>
    </div>
  )
}
