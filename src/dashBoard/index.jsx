import { useUser } from "@clerk/clerk-react";
import AddResume from "./components/AddResume";
import GlovalApi from "../../sarvice/GlovalApi";
import { useEffect, useState } from "react";
import ResumeCardItem from "./components/ResumeCardItem";

export default function DashBoard() {
  const {user}=useUser()
  const [resumeList,setResumeList] = useState([])

  useEffect(()=>{
    user&&GetResumesList()
  },[user])

// Use to set resume list

const GetResumesList=()=>{
  GlovalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
  .then(resp=>{
    setResumeList(resp.data.data);
  })
}
  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="text-3xl font-bold">My Resume</h2>
      <p>Start Crating Ai Resume For Your Next Job Role</p>
      <div className="grid grid-cols-2 gap-5 mt-10 md:grid-cols-3 lg:grid-cols-5 ">
        <AddResume/>
        {resumeList && resumeList.map((resume, index) => <ResumeCardItem resume={resume} key={index}/> )}
      </div>
    </div>
  )
}
