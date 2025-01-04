import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconCirclePlus, IconBrandYoutube } from "@tabler/icons-react";
import React, { useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  initialErrorPublishBody,
  initialPublishBody,
  PublishErrorVideoBody,
  PublishVideoBody,
} from "./layout.interface";
import { FileUpload } from "@/components/ui/file-upload";
import axios from "axios";
import { BASE_URL } from "@/env";
import { useAuthStore } from "@/auth/Auth.interface";
import { toast } from "sonner";
import { RotatingLines } from "react-loader-spinner";

function DropDown() {
  const openModal = useRef<HTMLButtonElement>(null);

  const [file, setFile] = useState<File | null>(null);

  const [sendPublishBody, setSendPublishBody] =
    useState<PublishVideoBody>(initialPublishBody);
  const [errorPublishBody, setErrorPublishBody] =
    useState<PublishErrorVideoBody>(initialErrorPublishBody);

  const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  const [videoFileError, setVideoFileError] = useState<boolean>(false);

  let accessToken = useAuthStore((state) => state.accessToken);

  const handleValueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;

    if (target.name === "thumbnail") {
      const file = target.files?.[0];
      if (file) {
        setSendPublishBody((prev) => ({
          ...prev,
          [target.name]: file,
        }));
      }
    } else {
      setSendPublishBody((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }

    setErrorPublishBody((prev) => ({ ...prev, [e.target.name]: false }));
    setVideoFileError(false);
  };

  const handleFileUpload = (selectedFile: File | null) => {
    setFile(selectedFile);
  };

  const validateForm = () => {
    let isValid = true;
    Object.entries(sendPublishBody).forEach(([key, value]) => {
      if (!value) {
        setErrorPublishBody((prev) => ({
          ...prev,
          [key]: true,
        }));
        isValid = false;
      }
    });

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (file == null) {
      setVideoFileError(true);
      return;
    }

    const formData = new FormData();
    formData.append("title", sendPublishBody.title);
    formData.append("description", sendPublishBody.description);
    formData.append("thumbnail", sendPublishBody.thumbnail);
    formData.append("videoFile", file);

    setButtonLoader(true);
    try {
      const response = await axios.post(`${BASE_URL}videos/`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.data.success == true) {
        toast('Video has been upload', {
          action: {
            label: 'Undo',
            onClick: () => console.log('Undo')
          }
        })
        setSendPublishBody(initialPublishBody)
        setFile(null)
        setButtonLoader(false);
        openModal?.current?.click()
      } else {
        let errorMessage: string = response?.data?.message ?? "";
        if (errorMessage != "") {
          toast(errorMessage, {
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          });
        }else{
          toast('Unable to upload video', {
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          });
        }
        setSendPublishBody(initialPublishBody)
        setFile(null)
        setButtonLoader(false);
        openModal?.current?.click()
      }
    } catch (error: any) {
      console.log("Video Upload : ", error);
      let errorMessage: string = error?.response?.data?.message ?? "";
      if (errorMessage != "") {
        toast(errorMessage, {
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
      }
      setSendPublishBody(initialPublishBody)
      setFile(null)
      setButtonLoader(false);
      openModal?.current?.click()
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex flex-row align-center">
            <IconCirclePlus />
            Create
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Choose One</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="flex flex-row align-center"
              onClick={() => openModal?.current?.click()}
            >
              <IconBrandYoutube />
              Upload Video
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* -------------------------------------------- This is publish modal ----------------------------------------- */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" ref={openModal} style={{ display: "none" }}></Button>
        </DialogTrigger>
        <DialogContent
          className="md:max-w-[625px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Upload Video</DialogTitle>
            <DialogDescription>
              Enter your title, description and upload a video!
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col">
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="title"
                className={`text-left ${
                  errorPublishBody.title && "text-red-500"
                }`}
              >
                Title
              </Label>
              <Input
                id="title"
                value={sendPublishBody.title}
                className="col-span-3"
                name="title"
                placeholder="title"
                onChange={handleValueChange}
              />
              {errorPublishBody.title && (
                <p className="text-left text-sm text-red-500">
                  Title is required
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <Label
                htmlFor="description"
                className={`text-left ${
                  errorPublishBody.description && "text-red-500"
                }`}
              >
                Description
              </Label>
              <Input
                id="description"
                value={sendPublishBody.description}
                className="col-span-3"
                name="description"
                placeholder="description"
                onChange={handleValueChange}
              />
              {errorPublishBody.description && (
                <p className="text-left text-sm text-red-500">
                  Description is required
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <Label
                htmlFor="title"
                className={`text-left ${
                  errorPublishBody.thumbnail && "text-red-500"
                }`}
              >
                Thumbnail
              </Label>
              <Input
                id="thumbnail"
                type="file"
                className="col-span-3"
                name="thumbnail"
                onChange={handleValueChange}
                accept="image/*"
              />
              {errorPublishBody.thumbnail && (
                <p className="text-left text-sm text-red-500">
                  Thumbnail is required
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <Label
                htmlFor="title"
                className={`text-left ${videoFileError && "text-red-500"}`}
              >
                Video
              </Label>
              <FileUpload onChange={handleFileUpload} />
              {videoFileError && (
                <p className="text-left text-sm text-red-500">
                  Video is required
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit} disabled={buttonLoader}>
              {buttonLoader ? (
                <RotatingLines
                  visible={true}
                  width="100"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                  strokeColor="white"
                />
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DropDown;
