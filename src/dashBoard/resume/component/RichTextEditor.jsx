// Import libraries and context
import { Brain, LoaderCircle } from "lucide-react";
import { useContext, useState } from "react";
import { Button } from '@/components/ui/button';
import { 
  BtnBold, BtnBulletList, BtnItalic, BtnLink, 
  BtnNumberedList, BtnRedo, BtnUnderline, BtnUndo, 
  Editor, EditorProvider, Separator, Toolbar 
} from "react-simple-wysiwyg";
import { ResumeInfoContext } from "../../../context/ResumeInfoContext";
import { toast } from "sonner";
import { AIChatSession } from "../../../../sarvice/AiModal";

  // AI prompt template
  const PROMPT= 'position title: {positionTitle}, Depends on position title give me 4-6 bullet points for my experience in resume (Please do not add experience level and No JSON array), give me result in HTML tags';

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
  
  // Local state for editor content and loading status
  const [value, setValue] = useState(defaultValue);  
  const [loading, setLoading] = useState(false);   
  // Access resume info from context
  const { resumeInfo , setResumeInfo } = useContext(ResumeInfoContext);

  // Generate summary using AI
  const GenerateSummeryFromAI = async () => {
    setLoading(true); 

    // Ensure position title is provided
    if (!resumeInfo?.experience[index]?.title) {
      toast('Please Add Position Title'); 
      setLoading(false);
      return;
    }

    // Set AI prompt and get response
    const prompt = PROMPT.replace('{positionTitle}', resumeInfo?.experience[index]?.title);
    const result = await AIChatSession.sendMessage(prompt);
    const resp = await result.response.text(); 
    setValue(resp.replace(/\[|\]/g, '').trim()); // Clean response text
    setLoading(false); 
  };

  return (
    <div>
      {/* Button and label above editor */}
      <div className="flex justify-between my-2">
        <label className="text-xs">Summary</label>
        <Button 
          disabled={loading}
          onClick={GenerateSummeryFromAI} 
          variant='outline' 
          size='sm' 
          className='flex gap-2 border-primary text-primary'
        >
          {loading ? 
            <LoaderCircle className="animate-spin"/> : 
            <>
              <Brain className="w-4 h-4"/> Generate From AI
            </>
          }
        </Button>
      </div>
      
      {/* Text editor with toolbar */}
      <EditorProvider>
        <Editor 
          value={value} 
          onChange={(e) => {

            const updatedValue = e.target.value;
            setValue(updatedValue); 
            onRichTextEditorChange(updatedValue); // Notify parent of changes
          }}
        >
          <Toolbar>
            {/* Formatting options */}
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
            <BtnUndo />
            <BtnRedo />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
