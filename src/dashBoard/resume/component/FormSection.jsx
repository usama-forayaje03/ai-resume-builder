import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import PersonalDetails from "../../components/form/PersonalDetails";
import {Button} from '@/components/ui/button'
import { useState } from "react";
export default function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(2)
  const [enableNext, setEnableNext] = useState(false)
  return (
    <div>
      <div className="flex items-center justify-between">
        
        <Button className="flex gap-2" size='sm' variant='outline'> <LayoutGrid/>Theme</Button>
        <div className="flex gap-2">
          {activeFormIndex > 1 &&  <Button onClick={() => setActiveFormIndex(activeFormIndex - 1)} size='sm'> <ArrowLeft  /> </Button>}
          <Button disabled={!enableNext} onClick={() => setActiveFormIndex(activeFormIndex + 1)} className="flex gap-2" size='sm'>Next <ArrowRight/></Button>
        </div>
      </div>
      {/* {Personal Details} */}
      {activeFormIndex === 1 ? <PersonalDetails enableNext={(v) => setEnableNext(v)}/> : null}
      
      {/* {Summery} */}

      {/* {Experience} */}

      {/* {Educational Details} */}

      {/* {Skills} */}

    </div>
  )
}
