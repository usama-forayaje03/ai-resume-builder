import { useContext, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { ResumeInfoContext } from "../../../context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import GlovalApi from "../../../../sarvice/GlovalApi";

function Skills() {
    // Loading and skills list state
    const [loading, setLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const { resumeId } = useParams(); 
    const [skillsList, setSkillsList] = useState([
        { name: '', rating: 0 }
    ]);

    // Handle change for each skill
    const handleChange = (index, name, value) => {
        const newEntries = [...skillsList];
        newEntries[index][name] = value;
        setSkillsList(newEntries);
    };

    // Add new skill entry
    const addNewSkills = () => {
        setSkillsList([...skillsList, { name: '', rating: 0 }]);
    };

    // Remove last skill entry
    const removeSkills = () => {
        if (skillsList.length > 1) {
            setSkillsList(skillsList.slice(0, -1));
        } else {
            toast("At least one skill entry is required!");
        }
    };

    // Save skills to the server
    const onSave = async () => {
        setLoading(true);
        const data = { data: { skills: skillsList.map(({ id, ...rest }) => rest) } };
    
        try {
            const resp = await GlovalApi.UpdateResume(resumeId, data);
            toast("Skills updated!");
        } catch (error) {
            toast("Server Error, Please try again!");
        } finally {
            setLoading(false);
        }
    };

    // Update resumeInfo when skillsList changes
    useEffect(() => {
        setResumeInfo({ ...resumeInfo, skills: skillsList });
    }, [skillsList]);

    // Set skillsList from resumeInfo initially
    useEffect(()=> {
        resumeInfo && setSkillsList(resumeInfo?.skills)
    },[]);

    return (
        <div>
            <div className="p-5 mt-10 border-t-4 rounded-lg shadow-lg border-t-primary">
                <h2 className="text-lg font-bold">Skills</h2>
                <p>Add your top skills</p>
                <div>
                    {skillsList.map((item, index) => (
                        <div key={index} className="flex justify-between p-3 py-2 mb-2 border rounded-lg">
                            <div>
                                <label className="text-xs">Name</label>
                                <Input
                                    className="w-full"
                                    defaultValue={item?.name}
                                    onChange={e => handleChange(index, 'name', e.target.value)}
                                />
                            </div>
                            <Rating
                                style={{ maxWidth: 130, marginTop: 15 }}
                                value={item.rating}
                                onChange={(v) => handleChange(index, 'rating', v)}
                            />
                        </div>
                    ))}
                </div>
                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={addNewSkills} className="text-primary">+ Add More Skills</Button>
                        <Button variant="outline" onClick={removeSkills} className="text-primary">- Remove</Button>
                    </div>
                    <Button disabled={loading} onClick={onSave}>
                        {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Skills;
