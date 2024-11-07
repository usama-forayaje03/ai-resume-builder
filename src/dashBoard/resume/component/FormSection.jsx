import { ArrowLeft, ArrowRight, Home, LayoutGrid } from "lucide-react";
import PersonalDetails from "../../components/form/PersonalDetails";
import {Button} from '@/components/ui/button'
import { useState } from "react";
import Summery from "../../components/form/Summery";
import Experience from "../../components/form/Experience";
import Education from "../../components/form/Education";
import Skills from "../../components/form/Skills";
import { Link, Navigate, useParams } from "react-router-dom";
import ThemeColor from "./ThemeColor";


export default function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1)
  const [enableNext, setEnableNext] = useState(false)
  const {resumeId} = useParams()

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex gap-5">
          <Link to={'/dashBoard'}>
        <Button><Home/></Button>
        </Link>
        <ThemeColor/>
        </div>
        <div className="flex gap-2">
          {activeFormIndex > 1 &&  <Button onClick={() => setActiveFormIndex(activeFormIndex - 1)} size='sm'> <ArrowLeft  /> </Button>}
          <Button disabled={!enableNext} onClick={() => setActiveFormIndex(activeFormIndex + 1)} className="flex gap-2" size='sm'>Next <ArrowRight/></Button>
        </div>
      </div>
      
      {/* {Personal Details} */}
      {activeFormIndex === 1 ? 
      <PersonalDetails enableNext={(v) => setEnableNext(v)}/> 
      : activeFormIndex === 2 
      ? // {/* {Summery} */}
      <Summery enableNext={enableNext}/> 
      : activeFormIndex == 3 
      ? // {/* {Experience} */}
      <Experience enableNext={(v) => setEnableNext(v)}/>
      : activeFormIndex === 4 
       ? //{/* {Educational Details} */}
      <Education enableNext={enableNext}/>
      : activeFormIndex === 5 
      ? //{/* {Skills} */}
      <Skills/>
      : activeFormIndex == 6
      ? <Navigate to={'/my-resume/'+resumeId+"/view"} />
      :
      null }
    </div>
  )
}
