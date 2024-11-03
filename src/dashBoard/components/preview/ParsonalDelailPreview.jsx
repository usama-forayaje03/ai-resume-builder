export default function ParsonalDelailPreview({ resumeInfo }) {
  return (
    <div>
      <h2
        style={{ color: resumeInfo?.themeColor }}
        className="text-xl font-bold text-center"
      >
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>
      <h2 className="text-sm font-medium text-center">
        {resumeInfo?.jobTitle}{" "}
      </h2>
      <h2 style={{ color: resumeInfo?.themeColor }} className="text-xs font-normal text-center">
        {resumeInfo?.address}{" "}
      </h2>

      <div className="flex justify-between">
        <h2 style={{ color: resumeInfo?.themeColor }}  className="text-xs font-normal">{resumeInfo?.phone}</h2>
        <h2 style={{ color: resumeInfo?.themeColor }} >{resumeInfo?.email}</h2>
      </div>
      <hr style={{ borderColor: resumeInfo?.themeColor }}  className="border-[1.5px] my-2"/>
    </div>
  );
}
