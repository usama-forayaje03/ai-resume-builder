import { useContext } from "react"
import { ResumeInfoContext } from "../../../context/ResumeInfoContext"
import ParsonalDelailPreview from "../../components/preview/ParsonalDelailPreview"
import SummeryPrivew from "../../components/preview/SummeryPrivew"
import ProfessionalExperiencePreview from "../../components/preview/ProfessionalExperiencePreview"
import EducationalPreview from "../../components/preview/EducationalPreview"
import SkillsPreview from "../../components/preview/SkillsPreview"

export default function ResumePreview() {
    const {resumeInfo , setResumeInfo} = useContext(ResumeInfoContext)
  return (
    <div className="h-full shadow-lg p-14 border-t-[20px]" style={{borderColor: resumeInfo?.themeColor}}>
      {/* Personal Detail */}
      <ParsonalDelailPreview resumeInfo={resumeInfo}/ >
      {/* Summary */}
        <SummeryPrivew resumeInfo={resumeInfo}/>
      {/* Professional Experience  */}
        <ProfessionalExperiencePreview resumeInfo={resumeInfo}/>
      {/* Educational */}
        <EducationalPreview resumeInfo={resumeInfo}/>
      {/* Skills */}
        <SkillsPreview resumeInfo={resumeInfo}/>
    </div>
  )
}
