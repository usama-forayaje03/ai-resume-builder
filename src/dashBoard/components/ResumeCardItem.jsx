import { Notebook } from "lucide-react";
import { Link } from "react-router-dom";

export default function ResumeCardItem({resume}) {
  console.log(resume);
  
  return (
    <Link to={'/dashBoard/resume/'+resume.resumeId+"/edit"}>
      <div className="p-14  border border-primary h-[280px] 
           rounded-lg hover:scale-105 hover:shadow-md  shadow-primary bg-secondary  transition-all duration-300">
        <Notebook/>
      </div>
        <h2 className="my-1 text-center">{ resume.title }</h2>
    </Link>
  )
}
