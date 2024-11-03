export default function EducationalPreview({resumeInfo}) {
  return (
    <div className="my-6">
      <h2
        style={{ color: resumeInfo?.themeColor }}className="mb-2 text-sm font-bold text-center">Education
      </h2>
      <hr  className="border-[1.2px]" style={{ borderColor: resumeInfo?.themeColor }}/>
      {resumeInfo?.education.map((educ,index) => (
        <div className="my-5" key={index}>
            <h2 style={{ color: resumeInfo?.themeColor }} className="text-sm font-bold">{educ?.universityName}</h2>
            <h2 className="flex justify-between text-xs">{educ?.degree} in {educ?.major}
                <span>{educ?.startDate} - {educ?.endDate}</span>
            </h2>
            <p className="my-2 text-xs">{educ?.description}</p>
        </div>
      ))}
    </div>
  );
}
