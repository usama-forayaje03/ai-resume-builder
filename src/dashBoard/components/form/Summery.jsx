import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "../../../context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import GlovalApi from "../../../../sarvice/GlovalApi";
import { toast } from "sonner";
import { Brain, LoaderCircle } from "lucide-react";
import { AIChatSession } from "../../../../sarvice/AiModal";

// Prompt template for AI-generated summary based on job title
const prompt="Job Title: {jobTitle} , Depends on job title give me list of {summery} for 3 experience level, Mid Level and Freasher level in 3 - 4 lines in array format, With summery and  {experience_level} Field in JSON Format"
// Job Title: {jobTitle} , Depends on job title give me summery for my resume with 4-5 lines
export default function Summery({ enableNext }) {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [summery, setSummery] = useState(); // State to store user's summary input
    const [loading, setLoading] = useState(false); // Loading indicator for API calls
    const params = useParams();
    const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState(); // State for storing AI-generated summaries

    // Function to generate a summary from AI using the job title in `resumeInfo`
    const generateSummeryFromAi = async () => {
        setLoading(true);
        const PROMPT=prompt.replace('{jobTitle}',resumeInfo?.jobTitle);
        console.log(PROMPT);
        const result=await AIChatSession.sendMessage(PROMPT);
        console.log(JSON.parse(result.response.text()))
        
        setAiGenerateSummeryList(JSON.parse(result.response.text()))
        setLoading(false);
    }

    // Sync `summery` state with `resumeInfo` whenever `summery` changes
    useEffect(() => {
        summery &&
            setResumeInfo({
                ...resumeInfo,
                summery: summery,
            });
    },[summery]);

    // Save the user's summary to the backend and enable the next section on success
    const onSave = (e) => {
        e.preventDefault();
        setLoading(true);
        const data={
          data:{
              summery:summery
          }
      }
        GlovalApi.UpdateResume(params?.resumeId, data).then(
            (resp) => {
                console.log(resp); // Log response for debugging
                enableNext(true);
                setLoading(false);
                toast("Detail updated."); // Show success message
            },
            (error) => {
                setLoading(false);
                toast("Server Error, Please try again!"); // Error handling
            }
        );
    };

    return (
        <div>
            <div className="p-5 mt-10 border-t-4 rounded-lg shadow-lg border-t-primary">
                <h2 className="text-lg font-bold">Summery</h2>
                <p>Add a summary for your job title</p>

                <form onSubmit={onSave} className="mt-7">
                    {/* Header with button to trigger AI summary generation */}
                    <div className="flex items-center justify-between">
                        <label>Add Summery</label>
                        <Button
                            size="sm"
                            className="flex gap-2 border-primary text-primary"
                            type="button"
                            variant="outline"
                            onClick={() => generateSummeryFromAi()}
                        >
                            <Brain className="w-4 h-4" /> Generate from AI
                        </Button>
                    </div>
                    {/* Text area for summary input */}
                    <Textarea
                        required
                        onChange={(e) => setSummery(e.target.value)}
                        value={summery}
                        defaultValue={summery ? summery : resumeInfo?.summery}
                        className="w-full mt-5 min-h-44"
                    />

                    {/* Save button */}
                    <div className="flex justify-end mt-2">
                        <Button type="submit" disabled={loading}>
                            {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
                        </Button>
                    </div>
                </form>
            </div>

            {/* Display AI-generated summary suggestions if available */}
            {aiGeneratedSummeryList && aiGeneratedSummeryList.length > 0 && (
              <div>
                  <h2 className="text-lg font-bold">Suggestions</h2>
                  {aiGeneratedSummeryList?.map((item, index) => (
                      <div key={index} onClick={() => setSummery(item?.summary)} className='p-5 my-4 rounded-lg shadow-lg cursor-pointer'>
                          <h2 className='my-1 font-bold text-primary'>Level: {item?.experience_level}</h2>
                          <p>{summery}</p>
                      </div>
                  ))}
              </div>
          )}

        </div>
    );
}
