import { useEffect, useState } from "react";
import Header from "../../../components/castom/Header";
import { Button } from "../../../components/ui/button";
import { ResumeInfoContext } from "../../../context/ResumeInfoContext";
import ResumePreview from "../../../dashBoard/resume/component/ResumePreview";
import { useParams } from "react-router-dom";
import GlovalApi from "../../../../sarvice/GlovalApi";
import { RWebShare } from "react-web-share";
import { toast } from "sonner";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const { resumeId } = useParams();
  useEffect(() => {
    GetResumeInfo();
  }, []);

  const GetResumeInfo = () => {
    GlovalApi.GetResumeById(resumeId).then((res) => {
      setResumeInfo(res.data.data);
    });
  };
  const handleDownload = () => {
    window.print();
  };
  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />
        <div className="mx-10 my-10 md:mx-20 lg:mx-36">
          <h2 className="text-2xl font-medium text-center">
            Congratulation ! Your Ultimate AI Generates Resume Is Ready !
          </h2>
          <p className="text-center text-gray-400">
            Now you are ready to download your resume and you can shear unique
            resume url with your friends and family
          </p>
          <div className="flex justify-between my-10 mx-28">
            <Button onClick={handleDownload}>Download</Button>
            <RWebShare
              data={{
                text: "Hello every one , This is my Resume , please open url to see it",
                url: import.meta.env.VITE_BASE_URL+'/my-resume/'+resumeId+"/view",
                title: resumeInfo?.firstName+' '+resumeInfo?.lastName+'resume',
              }}
              onClick={() => toast("shared successfully!")}
            >
              <Button>Shear</Button>
            </RWebShare>
          </div>
        </div>
      </div>
      <div className="mx-10 my-10 md:mx-20 lg:mx-36" id="print-area">
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
