"use client"
import { useAppStore } from "@/store/store"
import { useUser } from "@clerk/nextjs"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"
import { useState } from "react"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/firebase"
import toast from "react-hot-toast"

function RenameModal() {
    const { user } = useUser();
    const [fileId, isRenameModalOpen, setIsRenameModalOpen, filename] = useAppStore(state => [state.fileId, state.isRenameModalOpen, state.setIsRenameModalOpen, state.filename])
    const [input, setInput] = useState("")

    const renameFile = async () => {
        if (!user || !fileId) return;

        const toastId = toast.loading("Renaming...")

        await updateDoc(doc(db, "users", user.id, "files", fileId), {
            filename: input,
        });

        toast.success("Renamed Successfully", {
            id: toastId,
        });

        setInput("");
        setIsRenameModalOpen(false);
    }

    return (
        <Dialog
            open={isRenameModalOpen}
            onOpenChange={(isOpen) => {
                setIsRenameModalOpen(isOpen);
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="pb-2">Rename the File</DialogTitle>
                    <Input
                        id="link"
                        defaultValue={filename}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDownCapture={(e) => {
                            if (e.key === "Enter") {
                                renameFile();
                            }
                        }}
                    />
                    <div className="flex justify-end space-x-2 py-3">
                        <Button
                            size={"sm"}
                            className=" px-3"
                            variant={"ghost"}
                            onClick={() => setIsRenameModalOpen(false)}
                        >
                            <span className="sr-only">Cancel</span>
                            <span>Cancel</span>
                        </Button>
                        <Button
                            size={"sm"}
                            className=" px-3"
                            type="submit"
                            onClick={() => renameFile()}
                        >
                            <span className="sr-only">Rename</span>
                            <span>Rename</span>
                        </Button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default RenameModal
