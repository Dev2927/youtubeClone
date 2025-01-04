import { useAuthStore } from "@/auth/Auth.interface";
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";
import {
  IconBrandYoutube,
  IconClipboardCopy,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/env";
import { VideoBody } from "./Card.interface";
import { toast } from "sonner";
import { useLoaderState } from "@/layout/layout.interface";

function Card() {

  let accessToken = useAuthStore((state) => state.accessToken)
  let showLoader = useLoaderState((state) => state.showLoader)

  const [storeVideo, setStoreVideo] = useState<VideoBody[]>([])

  useEffect(() => {
    getAllVideo()
  }, [])

  const getAllVideo = async () => {
    showLoader(true)
    try {
      const response = await axios.get(`${BASE_URL}videos/admin/all`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      if(response.data.success == true){
        setStoreVideo(response?.data?.data?.videos)
        showLoader(false)
      }else{
        setStoreVideo([])
        showLoader(false)
      }
    } catch (error: any) {
      console.log(error)
      setStoreVideo([])
      let errorMessage = error?.response?.data?.message ?? ""
      if(errorMessage != "") {
        toast(errorMessage, {
          action: {
            label: 'Undo',
            onClick: () => console.log('Undo')
          }
        })
      }
      showLoader(false)
    }
  }

  return (
    <BentoGrid className="m-1">
      {storeVideo.length > 0 && storeVideo?.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          thumbnail={item.thumbnail}
          icon={<IconBrandYoutube className="h-4 w-4 text-neutral-500" />}
          className="border-2 border-gray-100"
        />
      ))}
    </BentoGrid>
  );
}

export default Card;
