import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { ResumeInfoContext } from "../../../context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import GlovalApi from "../../../../sarvice/GlovalApi";

function Education() {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const param = useParams();
  
  // Initial education list
  const [educationalList, setEducationalList] = useState([
    {
      universityName: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  // Handle input changes
  const handleChang = (e, index) => {
    const newEntries = [...educationalList];
    const { name, value } = e.target;
    newEntries[index][name] = value;
    setEducationalList(newEntries);
  };

  // Add a new education entry
  const addNewEducation = () => {
    setEducationalList([
      ...educationalList,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  // Remove the last education entry
  const removeEducation = () => {
    if (educationalList.length > 1) {
      setEducationalList(educationalList.slice(0, -1));
    } else {
      toast("At least one education entry is required!");
    }
  };

  // Save changes to the backend
  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        education: educationalList.map(({ id, ...rest }) => rest),
      },
    };

    GlovalApi.UpdateResume(param.resumeId, data).then(
      (resp) => {
        setLoading(false);
        toast("Details updated!");
      },
      () => {
        setLoading(false);
        toast("Server Error, Please try again!");
      }
    );
  };

  // Update resume info on educational list change
  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      education: educationalList,
    });
  }, [educationalList]);

  useEffect(()=>{
    resumeInfo&&setEducationalList(resumeInfo?.education)
  },[])

  return (
    <div>
      <div className="p-5 mt-10 border-t-4 rounded-lg shadow-lg border-t-primary">
        <h2 className="text-lg font-bold">Education</h2>
        <p>Add your educational details</p>
        <div>
          {educationalList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 p-3 my-5 border rounded-lg">
                {/* University Name */}
                <div className="col-span-2">
                  <label>University Name</label>
                  <Input
                    name="universityName"
                    defaultValue={item?.universityName}
                    onChange={(e) => handleChang(e, index)}
                  />
                </div>
                {/* Degree */}
                <div>
                  <label>Degree</label>
                  <Input
                    name="degree"
                    defaultValue={item?.degree}
                    onChange={(e) => handleChang(e, index)}
                  />
                </div>
                {/* Major */}
                <div>
                  <label>Major</label>
                  <Input
                    name="major"
                    defaultValue={item?.major}
                    onChange={(e) => handleChang(e, index)}
                  />
                </div>
                {/* Start Date */}
                <div>
                  <label>Start Date</label>
                  <Input
                    type="date"
                    name="startDate"
                    defaultValue={item?.startDate}
                    onChange={(e) => handleChang(e, index)}
                  />
                </div>
                {/* End Date */}
                <div>
                  <label>End Date</label>
                  <Input
                    type="date"
                    name="endDate"
                    defaultValue={item?.endDate}
                    onChange={(e) => handleChang(e, index)}
                  />
                </div>
                {/* Description */}
                <div className="col-span-2">
                  <label>Description</label>
                  <Input
                    name="description"
                    defaultValue={item?.description}
                    onChange={(e) => handleChang(e, index)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          {/* Add Education */}
          <div className="flex gap-2">
            <Button variant="outline" onClick={addNewEducation} className="text-primary">+ Add More Education</Button>
            {/* Remove Education */}
            <Button variant="outline" onClick={removeEducation} className="text-primary">- Remove</Button>
          </div>
          {/* Save */}
          <Button disabled={loading} onClick={onSave}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Education;
