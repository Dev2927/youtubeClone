import { useAuthStore } from "@/auth/Auth.interface";
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";
import { IconBrandYoutube } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/env";
import { VideoBody } from "./Card.interface";
import { toast } from "sonner";
import { useLoaderState, userDataState } from "@/layout/layout.interface";
import { useNavigate } from "react-router-dom";

function Card() {
  let showLoader = useLoaderState((state) => state.showLoader);

  const [storeVideo, setStoreVideo] = useState<VideoBody[]>([]);

  const navigate = useNavigate();
  let refreshToken = localStorage.getItem("@token");

  let addAccessToken = useAuthStore((state) => state?.addAccessToken);
  let addAvatar = userDataState((state) => state?.addAvatar);
  let addCoverImage = userDataState((state) => state?.addCoverImage);
  let addEmail = userDataState((state) => state?.addEmail);
  let addFullName = userDataState((state) => state?.addFullName);
  let addUserName = userDataState((state) => state?.addUserName);
  let addId = userDataState((state) => state?.addId);

  useEffect(() => {
    (async () => {
      const body = {
        refreshToken: refreshToken,
      };

      try {
        const res = await axios.post(`${BASE_URL}users/refresh-token`, body);
        if (res.data.success == true) {
          addAccessToken(res?.data?.data?.accessToken);
          getUserDetails(res?.data?.data?.accessToken);
        } else {
          localStorage.clear();
          navigate("/login");
        }
      } catch (error) {
        console.log("Refresh Token : ", error);
        localStorage.clear();
        navigate("/login");
      }
    })();
  }, []);

  const getUserDetails = async (accessToken: string) => {
    try {
      const response = await axios.get(`${BASE_URL}users/current-user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.data.success === true) {
        addAvatar(response?.data?.data?.avatar);
        addCoverImage(response?.data?.data?.coverImage);
        addEmail(response?.data?.data?.email);
        addFullName(response?.data?.data?.fullName);
        addUserName(response?.data?.data?.username);
        addId(response?.data?.data?._id);
        getAllVideo(response?.data?.data?._id , accessToken);
      }
    } catch (error) {
      console.log("Get User : ", error);
    }
  };

  const getAllVideo = async (userId: string, accessToken: string) => {
    showLoader(true);
    try {
      const response = await axios.get(`${BASE_URL}videos/admin/all`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.data.success == true) {
        const updateVideos = response?.data?.data?.videos.map((item: any) => ({
          ...item, 
          showOptions: item.videoOwner === userId
        }))
        setStoreVideo(updateVideos);
        showLoader(false);
      } else {
        setStoreVideo([]);
        showLoader(false);
      }
    } catch (error: any) {
      console.log(error);
      setStoreVideo([]);
      let errorMessage = error?.response?.data?.message ?? "";
      if (errorMessage != "") {
        toast(errorMessage, {
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
      }
      showLoader(false);
    }
  };

  return (
    <BentoGrid className="m-1">
      {storeVideo.length > 0 &&
        storeVideo?.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            thumbnail={item.thumbnail}
            icon={<IconBrandYoutube className="h-4 w-4 text-neutral-500" />}
            options={item.showOptions}
            className="border-2 border-gray-100"
          />
        ))}
    </BentoGrid>
  );
}

export default Card;
