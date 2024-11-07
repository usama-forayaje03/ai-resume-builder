import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoaderCircle, MoreVertical,} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import GlovalApi from "../../../sarvice/GlovalApi";
import { toast } from "sonner";

export default function ResumeCardItem({ resume ,refreshData }) {
  console.log("Theme Color:", resume?.themeColor);
  const navigation = useNavigate();
  const [openDeleteAlert , setOpenDeleteAlert] = useState(false)
  const [loading , setLoading ] = useState(false) 

  const onDelete = () => {
    setLoading(true)
    GlovalApi.DeleteResumeById(resume.documentId ).then(res => {
      console.log(res);
      toast('Resume Deleted !!')
      refreshData()
      setLoading(false)
      setOpenDeleteAlert(false)
    },error => setLoading(false))
  }

  return (
    <div>
      {/* // Resume Edit Link} */}
      <Link to={"/dashBoard/resume/" + resume.documentId + "/edit"}>
        <div
          className="p-14  bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 h-[280px]  rounded-t-lg border-t-4 "
          style={{ borderColor: resume?.themeColor }}
        >
          <div className="flex justify-center items-center height-[180px]">
            {/* Image Placeholder */}
            <img src="/cv.png" alt="note book" width={80} height={80} />
          </div>
        </div>
      </Link>

      <div
        className="flex justify-between p-3 text-white border rounded-b-lg shadow-lg"
        style={{
          background: resume?.themeColor,
        }}
      >
        <h2 className="text-sm">{resume.title}</h2>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="w-4 h-4 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                navigation("/dashBoard/resume/" + resume.documentId + "/edit")
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigation("/my-resume/" + resume.documentId + "/view")
              }
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigation("/my-resume/" + resume.documentId + "/view")
              }
            >
              Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenDeleteAlert(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialog open={openDeleteAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenDeleteAlert(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction disabled={loading}  onClick={onDelete}>
                {loading? <LoaderCircle className="animate-spin"/> : 'Continue' }
                </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
