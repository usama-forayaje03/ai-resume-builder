import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../../component/FormSection";
import ResumePreview from "../../component/ResumePreview";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";
import dummy from "../../../../data/dummy";

export default function EditResume() {
  const params = useParams();
  const [resumeInfo , setResumeInfo ] = useState()

  useEffect(() => {
    setResumeInfo(dummy)

  }, []);
  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
      <div className="grid grid-cols-1 gap-10 p-10 md:grid-cols-2">
        {/* form section */}
        <FormSection />
        {/* Preview Section */}
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}
