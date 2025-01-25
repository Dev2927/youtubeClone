import { create } from "zustand";

export interface loaderState {
  isVisible: boolean;
  showLoader: (visible: boolean) => void;
}

export const useLoaderState = create<loaderState>((set) => ({
  isVisible: false,
  showLoader: (visible) => set({ isVisible: visible }),
}));

export interface UserDetailsBody {
  avatar: string;
  coverImage: string;
  email: string;
  fullName: string;
  username: string;
  _id: string;
  addAvatar: (avatar: string) => void;
  addCoverImage: (coverImage: string) => void;
  addEmail: (email: string) => void;
  addFullName: (fullName: string) => void;
  addUserName: (username: string) => void;
  addId: (id: string) => void;
}

export const userDataState = create<UserDetailsBody>((set) => ({
  avatar: "",
  coverImage: "",
  email: "",
  fullName: "",
  username: "",
  _id: "",
  addAvatar: (avatar) => set({ avatar: avatar }),
  addCoverImage: (coverImage) => set({ coverImage: coverImage }),
  addEmail: (email) => set({ email: email }),
  addFullName: (fullName) => set({ fullName: fullName }),
  addUserName: (username) => set({ username: username }),
  addId: (_id) => set({ _id: _id }),
}));

export interface headerBody {
  title: string;
  subTitle: string;
  breadCrumb: string[];
  addTitle: (title: string) => void;
  addSubTitle: (subTitle: string) => void;
  addBreadCrumb: (breadCrumbs: string[]) => void;
}

export const headerBodyStore = create<headerBody>((set) => ({
  title: "",
  subTitle: "",
  breadCrumb: [],
  addTitle: (title) => set({ title: title }),
  addSubTitle: (subTitle) => set({ subTitle: subTitle }),
  addBreadCrumb: (breadCrumb) => set({ breadCrumb: breadCrumb }),
}));

export interface PublishVideoBody {
  title: string;
  description: string;
  thumbnail: string;
}

export const initialPublishBody: PublishVideoBody = {
  title: "",
  description: "",
  thumbnail: "",
};

export interface PublishErrorVideoBody {
  title: boolean;
  description: boolean;
  thumbnail: boolean;
}

export const initialErrorPublishBody: PublishErrorVideoBody = {
  title: false,
  description: false,
  thumbnail: false
};


