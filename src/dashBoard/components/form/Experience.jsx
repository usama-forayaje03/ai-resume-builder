import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import RichTextEditor from "../../resume/component/RichTextEditor";
import { ResumeInfoContext } from "../../../context/ResumeInfoContext";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import  GlovalApi  from "../../../../sarvice/GlovalApi";
import { useParams } from "react-router-dom";

function Experience() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const param = useParams();

  const [experienceList, setExperienceList] = useState([]);

  // Experience entry handling (update field values)
  const handleChange = (index, e) => {
    const newEntries = experienceList.slice();
    const { name, value } = e.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };

  // Add a new experience entry to the list
  const addNewExperience = () => {
    setExperienceList([
      ...experienceList,
      {
        title: "",
        companyName: "",
        city: "",
        state: "",
        startDate: "",
        endDate: "",
        workSummery: "",
      },
    ]);
  };

  // Remove an experience entry
  const removeExperience = () => {
    if (experienceList.length > 1) {
      setExperienceList(experienceList.slice(0, -1));
    } else {
      toast("At least one experience entry is required!"); 
    }
  };

  // Handle the changes in the rich text editor
  const handleRichTextEditor = (value, index) => {
    const newEntries = [...experienceList];
    newEntries[index].workSummery = value;
    setExperienceList(newEntries);
  };
  

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        experience: experienceList.map(({ id, ...rest }) => rest),
      },
    };

    GlovalApi.UpdateResume(param.resumeId, data).then(
      (resp) => {
        console.log(resp);
        setLoading(false);
        toast("Details updated!");
      },
      (error) => {
        setLoading(false);
        toast("Server Error, Please try again!");
      }
    );
  };

  // Update the resume info whenever the experience list changes
  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      experience: experienceList,
    });
  }, [experienceList]);

  useEffect(()=> {
    resumeInfo && setExperienceList(resumeInfo?.experience)
  },[])
  

  return (
    <div>
      <div className="p-5 mt-10 border-t-4 rounded-lg shadow-lg border-t-primary">
        <h2 className="text-lg font-bold">Professional Experience</h2>
        <p>Add Your previous Job experience</p>
        <div>
          {/* Loop over each experience in the list */}
          {experienceList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 p-3 my-5 border rounded-lg">
                {/* Position Title Input */}
                <div>
                  <label className="text-xs">Position Title</label>
                  <Input
                  
                    name="title"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.title || ""}
                  />
                </div>
                {/* Company Name Input */}
                <div>
                  <label className="text-xs">CompanyName</label>
                  <Input
                  
                    name="companyName"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.companyName}
                  />
                </div>
                {/* City Input */}
                <div>
                  <label className="text-xs">City</label>
                  <Input
                  
                    name="city"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.city}
                  />
                </div>
                {/* State Input */}
                <div>
                  <label className="text-xs">State</label>
                  <Input
                  
                    name="state"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.state}
                  />
                </div>
                {/* Start Date Input */}
                <div>
                  <label className="text-xs">Start Date</label>
                  <Input
                  
                    type="date"
                    name="startDate"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.startDate}
                  />
                </div>
                {/* End Date Input */}
                <div>
                  <label className="text-xs">End Date</label>
                  <Input
                  
                    type="date"
                    name="endDate"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.endDate}
                  />
                </div>
                {/* Work Summary Editor */}
                <div className="col-span-2">
                  <RichTextEditor
                    index={index}
                    defaultValue={item?.workSummery}
                    onRichTextEditorChange={(value) => {
                      handleRichTextEditor(value, index);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            {/* Add More Experience Button */}
            <Button
              variant="outline"
              onClick={addNewExperience}
              className="text-primary"
            >
              + Add More Experience
            </Button>
            {/* Remove Experience Button */}
            <Button
              variant="outline"
              onClick={removeExperience}
              className="text-primary"
            >
              - Remove
            </Button>
          </div>
          {/* Save Button */}
          <Button disabled={loading} onClick={onSave}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Experience;
