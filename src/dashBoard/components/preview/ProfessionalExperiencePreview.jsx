
export default function ProfessionalExperiencePreview({resumeInfo}) {
  return (
    <div className="my-6">
      <h2 style={{color: resumeInfo?.themeColor}} className="mb-2 text-sm font-bold text-center">Professional Experience</h2>
      <hr className="border-[1.2px]" style={{borderColor: resumeInfo?.themeColor}} />

      {
        resumeInfo?.experience.map((exper, index) => (
            <div className="my-5" key={index}>
                <h2 style={{ color: resumeInfo?.themeColor }} className="text-sm font-bold">{exper?.title}</h2>
                <h2 className="flex justify-between text-xs">
                    {exper?.companyName}, 
                    {exper?.city}, 
                    {exper.state},
                    <span>{exper.startDate} {exper?.currentlyWorking?'Present':exper.endDate}</span>

                </h2>
                <p className="my-2 text-xs">{exper.workSummery}</p>
            </div>
        ))
      }
    </div>
  )
}
