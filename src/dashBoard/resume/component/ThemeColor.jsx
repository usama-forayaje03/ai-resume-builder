import { useContext, useEffect, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"  // Importing Popover UI components
import { Button } from '@/components/ui/button'  // Importing Button UI component
import { LayoutGrid } from 'lucide-react'  // Importing Icon
import { ResumeInfoContext } from '@/context/ResumeInfoContext'  // Importing Resume Info Context
import { useParams } from 'react-router-dom'  // Hook to use URL parameters
import { toast } from 'sonner'  // For displaying toast notifications
import GlovalApi from "../../../../sarvice/GlovalApi";  // Importing API call service

function ThemeColor() {
    // List of available colors to choose from
    const colors = [
        "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
        "#33FFA1", "#FF7133", "#71FF33", "#7133FF", "#FF3371",
        "#33FF71", "#3371FF", "#A1FF33", "#33A1FF", "#FF5733",
        "#5733FF", "#33FF5A", "#5A33FF", "#FF335A", "#335AFF"
    ];
    
    
    // Accessing resumeInfo and setResumeInfo from the context
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    
    // Local state to store selected color
    const [selectedColor, setSelectedColor] = useState("#FF5733");

    // Access resumeId from the URL parameters
    const { resumeId } = useParams();
   
    // Handler function to select a color
    const onColorSelect = (color) => {
        setSelectedColor(color);  // Setting the selected color in local state

        // Updating the resumeInfo context with the selected color
        setResumeInfo({
            ...resumeInfo,
            themeColor: color
        });

        // Preparing data to send to the server
        const data = {
            data: {
                themeColor: color
            }
        };

        // Making an API call to update the theme color on the server
        GlovalApi.UpdateResume(resumeId, data).then(resp => {
            console.log(resp);
            toast('Theme Color Updated');  // Display success message
        });
    };

    return (
        <Popover>
            {/* Button to trigger popover for selecting color */}
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="flex gap-2">
                    <LayoutGrid /> Theme
                </Button>
            </PopoverTrigger>
            
            {/* Popover content displaying color options */}
            <PopoverContent>
                <h2 className='mb-2 text-sm font-bold'>Select Theme Color</h2>
                <div className='grid grid-cols-5 gap-3'>
                    {colors.map((item, index) => (
                        <div 
                            key={index}  // Unique key for each color option
                            onClick={() => onColorSelect(item)}  // Click event for color selection
                            className={`h-5 w-5 rounded-full cursor-pointer
                            hover:border-black border
                            ${selectedColor == item && 'border border-black'}
                            `}
                            style={{
                                background: item  // Setting the background color for the div
                            }}
                        >
                        </div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default ThemeColor;
