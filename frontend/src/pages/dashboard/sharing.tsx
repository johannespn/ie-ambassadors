import Camera from "@/assets/camera.svg";
import Edit from "@/assets/edit.svg";
import Trash from "@/assets/trash.svg";
import UploadFolder from "@/assets/upload-folder.svg";
import { FileUpload } from "@/components/FileUpload";
import { Input } from "@/components/Input";
import { Loading } from "@/components/LoadingPage";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Modal, ModalProps } from "@/components/Modal";
import { TextInput } from "@/components/TextInput";
import {
  authedFetcher,
  MicrositeData,
  updateMicrosite,
  uploadFile,
} from "@/utils/api";
import { clearLocalStorage } from "@/utils/user";
import { Form, Formik, FormikHelpers } from "formik";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import * as Yup from "yup";
import DashboardLayout from "../../components//Dashboard/DashboardLayout";

const ambassadorBaseUrl = process.env.NEXT_PUBLIC_FRONTEND_HOST! + "/a/";
type FormValues = {
  shareExperience: string;
  aboutMe: string;
  profession: string;
  country: string;
};

export default function DashboardSharing() {
  const router = useRouter();
  const [initialValues, setInitialValues] = useState({
    profession: "",
    country: "",
    shareExperience: "",
    aboutMe: "",
  });
  const validationSchema = Yup.object({
    shareExperience: Yup.string().required().min(200, "Minimum 200 characters"),
    aboutMe: Yup.string().min(20, "Minimum 20 characters"),
  });

  const [userName, setUserName] = useState("");
  const [profession, setProfession] = useState("");
  const [country, setCountry] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [videoSharing, setVideoSharing] = useState("");
  const [pageName, setPageName] = useState("");
  const pageUrl = ambassadorBaseUrl + pageName;

  const [showDeleteBannerModal, setShowDeleteBannerModal] = useState(false);
  const [showEditPageDetailsModal, setShowEditPageDetailsModal] =
    useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showDeleteVideoModal, setShowDeleteVideoModal] = useState(false);
  const [isPublishButtonEnabled, setIsPublishButtonEnabled] = useState(false);

  const [submitApiError, setSubmitApiError] = useState("");
  const [bannerApiError, setBannerApiError] = useState("");
  const [profilePictureApiError, setProfilePictureApiError] = useState("");
  const [videoApiError, setVideoApiError] = useState("");
  const [videoSubmitting, setVideoSubmitting] = useState(false);
  const [apiSuccess, setApiSuccess] = useState("");

  const { data, error, isLoading } = useSWR(
    "/ambassador/get-microsite",
    authedFetcher
  );

  useEffect(() => {
    if (data) {
      const {
        aboutMe,
        shareExperience,
        userName,
        pageName,
        bannerImage,
        profilePicture,
        profession,
        country,
        videoSharing,
      } = data;
      setInitialValues({ shareExperience, aboutMe, profession, country });
      if (userName) setUserName(userName);
      if (pageName) setPageName(pageName);
      if (bannerImage) setBannerImage(bannerImage);
      if (profilePicture) setProfilePicture(profilePicture);
      if (profession) setProfession(profession);
      if (country) setCountry(country);
      if (videoSharing) setVideoSharing(videoSharing);
      if (!userName || !pageName) setShowEditPageDetailsModal(true);
      setIsPublishButtonEnabled(
        shareExperience &&
          userName &&
          bannerImage &&
          profilePicture &&
          profession &&
          country
      );
    }
  }, [data]);

  async function handleBannerChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }
    const bannerImage = e.target.files[0];
    const res = await uploadFile(bannerImage, "bannerImage");
    if (res.status === 200) {
      setBannerApiError("");
      mutate("/ambassador/get-microsite");
    } else {
      setBannerApiError("Something went wrong");
    }
  }

  async function handleProfilePictureChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    if (!e.target.files) {
      return;
    }
    const profilePicture = e.target.files[0];
    const res = await uploadFile(profilePicture, "profilePicture");
    if (res.status === 200) {
      setProfilePictureApiError("");
      mutate("/ambassador/get-microsite");
    } else {
      setProfilePictureApiError("Something went wrong");
    }
  }

  async function handleVideoChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }
    setVideoSubmitting(true);
    const videoMessage = e.target.files[0];
    const res = await uploadFile(videoMessage, "video");
    if (res.status === 200) {
      setVideoApiError("");
      mutate("/ambassador/get-microsite");
    } else {
      setVideoApiError("Something went wrong");
    }
    setVideoSubmitting(false);
  }

  function handleVideoTrashClick() {
    setShowDeleteVideoModal(true);
  }

  async function handleDeleteBannerYesClick() {
    const res = await updateMicrosite({ ...data, bannerImage: "" });
    if (res.status === "Success") {
      setBannerApiError("");
      mutate("/ambassador/get-microsite");
      setShowDeleteBannerModal(false);
    } else {
      setBannerApiError("Something went wrong");
    }
  }

  function handleDeleteBannerNoClick() {
    setShowDeleteBannerModal(false);
  }

  function handleBannerTrashClick() {
    setShowDeleteBannerModal(true);
  }

  function handleEditPageUrlClick() {
    setShowEditPageDetailsModal(true);
  }

  function handlePublishButtonClick() {
    setShowPublishModal(true);
  }

  async function handleSubmit(
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) {
    const res = await updateMicrosite({ ...data, ...values });
    if (res.status === "Success") {
      mutate("/ambassador/get-microsite");
      setApiSuccess("Success! Your page was updated.");
    } else {
      setSubmitApiError("Something went wrong");
    }
    setSubmitting(false);
  }

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    clearLocalStorage();
    router.push("/login");
  }

  return (
    <DashboardLayout title="My sharing" backButton={true}>
      <Head>
        <title>My sharing - IE Ambassador</title>
        <meta
          name="description"
          content="Inner Engineering Ambassadors Dashboard Sharing"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="w-full self-center">
        {bannerImage ? (
          <div className="relative w-full h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64 2xl:h-72">
            <Image
              className="object-cover object-center"
              fill={true}
              src={bannerImage}
              alt="custom banner image"
              priority={true}
            />
          </div>
        ) : (
          <div className="flex h-32 sm:h-48 bg-blue-900 text-white justify-center items-center">
            Customize your banner image!
          </div>
        )}
        <div className="-mt-3 sm:-mt-5 gap-3 flex justify-end mr-16 sm:mr-0 sm:justify-center">
          <FileUpload
            className="w-8 h-8 sm:w-10 relative"
            onChange={handleBannerChange}
          >
            <Image src={Camera} alt="camera icon" fill={true} />
          </FileUpload>
          <div
            className="w-8 h-8 sm:w-10 relative"
            onClick={handleBannerTrashClick}
          >
            <Image src={Trash} alt="trash icon" fill={true} />
          </div>
        </div>
        <span className="text-sm text-red-900">{bannerApiError}</span>
      </div>
      <div className="gap-3 sm:gap-12 flex flex-col relative w-full">
        <div className="-top-12 flex flex-col absolute items-center ml-6 sm:ml-16">
          <div
            className={`${
              profilePicture ? "" : "bg-orange-900"
            } sm:-mt-4 w-28 h-28 sm:w-36 sm:h-36 relative flex flex-col justify-center items-center text-white inline-block rounded-full ring ring-white ring-offset-base-100 ring-offset-4`}
          >
            {profilePicture ? (
              <Image
                className="object-fill object-center rounded-full"
                src={profilePicture}
                alt="profile picture"
                fill={true}
              />
            ) : (
              <p className="text-center text-xs sm:text-base">
                Customize
                <br />
                your picture!
              </p>
            )}
          </div>
          <FileUpload
            className="-mt-3 sm:-mt-5 w-8 h-8 sm:w-10 sm:h-10 relative"
            onChange={handleProfilePictureChange}
          >
            <Image src={Camera} alt="camera icon" fill={true} />
          </FileUpload>
          <span className="text-sm text-red-900">{profilePictureApiError}</span>
        </div>
        <div className="mt-24 sm:mt-28 xl:mt-8 px-6 w-full max-w-3xl self-center">
          <p className="mr-2 text-lg sm:text-xl inline-block">{userName}</p>
          <div className="w-5 h-5 relative inline-block align-text-bottom cursor-pointer">
            <Image
              src={Edit}
              alt="edit icon"
              onClick={handleEditPageUrlClick}
              fill={true}
              priority={true}
            />
          </div>
          <div className="flex flex-wrap gap-3 justify-between items-center">
            <a
              className="text-sm sm:text-md text-red-900"
              href={`${
                process.env.NEXT_PUBLIC_ENV === "local" ? "http://" : "https://"
              }${pageUrl}`}
              target="_blank"
              rel="noreferrer"
            >
              {pageUrl}
            </a>
          </div>
          <p className="mb-4 text-sm">
            <strong>Page status: </strong>
            <span className="text-red-900"> {data.status}</span>
            {data.status === "offline" && (
              <span className="ml-3 opacity-50 text-xs">
                (You can still preview the page by accessing the link above)
              </span>
            )}
          </p>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            enableReinitialize
          >
            {({ isSubmitting, submitForm }) => (
              <Form>
                <div className="mb-3 grid sm:grid-cols-[2fr_1fr] gap-4">
                  <Input
                    bg="bg-[#F9F9F9]"
                    name="profession"
                    label="Profession"
                  />
                  <Input bg="bg-[#F9F9F9]" name="country" label="Country" />
                </div>
                <p className="ml-1 mb-1">Video Message</p>
                <div className="mb-8">
                  {videoSharing ? (
                    <div className="relative h-96">
                      <video
                        className="max-h-96 absolute right-0 bottom-0 min-w-full min-h-full w-full h-auto object-contain bg-black bg-opacity-50 rounded-md overflow-hidden"
                        controls
                      >
                        <source src={videoSharing} />
                        Your browser does not support HTML5 video.
                      </video>
                      <div className="w-full absolute -bottom-5 flex justify-center">
                        <div
                          className=" relative w-10 h-10 sm:w-12 sm:h-12 relative"
                          onClick={handleVideoTrashClick}
                        >
                          <Image src={Trash} alt="trash icon" fill={true} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <FileUpload
                      onChange={handleVideoChange}
                      accept="video/mp4,video/x-m4v,video/*"
                    >
                      <div className="flex flex-col h-60 sm:h-96 bg-[#DADADA] rounded-md items-center justify-center cursor-pointer">
                        {videoSubmitting ? (
                          <LoadingSpinner
                            width={48}
                            height={48}
                            color="#10069F"
                          />
                        ) : (
                          <>
                            <Image
                              src={UploadFolder}
                              alt="folder with upload arrow"
                            />
                            <p className="text-sm">Upload your video</p>
                          </>
                        )}
                      </div>
                    </FileUpload>
                  )}
                  <p className="mt-6 sm:mt-1 text-sm text-right opacity-50">
                    Optimized for 16/9 and 9/16 video formats
                  </p>
                </div>
                <span className="text-sm text-red-900">{videoApiError}</span>
                <TextInput
                  className="mb-3"
                  name="shareExperience"
                  label="Sharing"
                  maxLength={1000}
                />
                <TextInput
                  className="mb-8"
                  name="aboutMe"
                  label="About me - optional"
                  maxLength={200}
                />
                <div className="flex flex-row justify-end gap-8 items-center">
                  <p
                    className="text-red-900 text-sm cursor-pointer"
                    onClick={submitForm}
                  >
                    Save
                  </p>
                  <button
                    className="!text-sm"
                    onClick={handlePublishButtonClick}
                    disabled={isSubmitting || !isPublishButtonEnabled}
                  >
                    {data.status === "offline" ? "Publish" : "Take offline"}
                  </button>
                </div>
                <span className="text-sm text-red-900">{submitApiError}</span>
                <span className="text-sm text-electric-700">{apiSuccess}</span>
              </Form>
            )}
          </Formik>
          {!isPublishButtonEnabled && (
            <div className="mt-4 flex flex-row justify-end opacity-50">
              <p className="mb-4 text-xs text-right w-1/2">
                To publish your page, you need to set a custom profile picture,
                custom banner image, name, profession, country and your sharing
                text.
              </p>
            </div>
          )}
        </div>
      </div>
      <Modal
        title="Delete Banner?"
        isOpen={showDeleteBannerModal}
        onVisibilityChange={(isVisible: boolean) => {
          setShowDeleteBannerModal(isVisible);
        }}
      >
        <p>Do you really want to delete the banner image?</p>
        <div className="items-center px-4 py-3">
          <button className="mr-4" onClick={handleDeleteBannerYesClick}>
            Yes
          </button>
          <button
            className="bg-white text-red-900"
            onClick={handleDeleteBannerNoClick}
          >
            No
          </button>
        </div>
      </Modal>
      <PageDetailsModal
        title="Edit Your Page Details"
        data={data}
        isOpen={showEditPageDetailsModal}
        onVisibilityChange={(isVisible: boolean) => {
          setShowEditPageDetailsModal(isVisible);
        }}
      />
      <DeleteVideoModal
        title="Delte Your Video Sharing"
        data={data}
        isOpen={showDeleteVideoModal}
        onVisibilityChange={(isVisible: boolean) => {
          setShowDeleteVideoModal(isVisible);
        }}
      />
      <PublishModal
        title="Publish"
        isOpen={showPublishModal}
        data={data}
        onVisibilityChange={(isVisible: boolean) => {
          setShowPublishModal(isVisible);
        }}
        pageUrl={pageUrl}
      />
    </DashboardLayout>
  );
}

interface DeleteVideoModalProps extends Omit<ModalProps, "children"> {
  data: MicrositeData;
}

function DeleteVideoModal({
  isOpen,
  onVisibilityChange,
  data,
}: DeleteVideoModalProps) {
  const [apiError, setApiError] = useState("");

  async function handleYesClick() {
    alert("Delete video currently not supported");
    onVisibilityChange(false);
    // const res = await updateMicrosite({ ...data, videoSharing: "" });
    // if (res.status === "Success") {
    //   mutate("/ambassador/get-microsite");
    //   onVisibilityChange(false);
    // } else {
    //   setApiError("Something went wrong");
    // }
  }
  function handleNoClick() {
    onVisibilityChange(false);
  }
  return (
    <Modal
      title="Delete Your Video Sharing"
      isOpen={isOpen}
      onVisibilityChange={onVisibilityChange}
    >
      <p>Do you really want to delete your video sharing?</p>
      <br />
      <div className="flex flex-row items-center gap-6">
        <button className="w-full" onClick={handleYesClick}>
          Yes
        </button>
        <button
          className="w-full bg-white text-red-900"
          onClick={handleNoClick}
        >
          No
        </button>
        <span className="text-sm text-red-900">{apiError}</span>
      </div>
    </Modal>
  );
}

interface PublishModalProps extends Omit<ModalProps, "children"> {
  pageUrl: string;
  data: MicrositeData;
}

function PublishModal({
  isOpen,
  onVisibilityChange,
  pageUrl,
  data,
}: PublishModalProps) {
  const [apiError, setApiError] = useState("");
  const currentStatus = data.status;

  async function handleYesClick() {
    const res = await updateMicrosite({
      ...data,
      status: currentStatus === "online" ? "offline" : "online",
    });
    if (res.status === "Success") {
      mutate("/ambassador/get-microsite");
      onVisibilityChange(false);
    } else {
      setApiError("Something went wrong");
    }
  }
  function handleNoClick() {
    onVisibilityChange(false);
  }
  return (
    <Modal
      title="Change Status of Your Page"
      isOpen={isOpen}
      onVisibilityChange={onVisibilityChange}
    >
      <p>
        {currentStatus === "offline"
          ? "Do you really want to publish your page?"
          : "Do you really want to take your page offline?"}
      </p>
      <br />
      <p className="text-red-900">
        <strong className="text-black">Page status: </strong>
        {data.status}
      </p>
      <p className="text-red-900">
        <strong className="text-black">Page url: </strong>
        {pageUrl}
      </p>
      <br />
      <div className="flex flex-row items-center">
        <button className="mr-4 w-1/2 inline" onClick={handleYesClick}>
          Yes
        </button>
        <button
          className="w-1/2 bg-white text-red-900 inline"
          onClick={handleNoClick}
        >
          No
        </button>
        <span className="text-sm text-red-900">{apiError}</span>
      </div>
    </Modal>
  );
}

interface PageDetailsModalProps extends Omit<ModalProps, "children"> {
  data: MicrositeData;
}

function PageDetailsModal({
  isOpen,
  onVisibilityChange,
  data,
}: PageDetailsModalProps) {
  const { userName, pageName } = data;

  const [apiError, setApiError] = useState("");
  async function handleSubmit(values: { userName: string; pageName: string }) {
    const res = await updateMicrosite({
      ...data,
      userName: values.userName,
      pageName: values.pageName,
    });
    if (res.status === "Success") {
      mutate("/ambassador/get-microsite");
      onVisibilityChange(false);
    } else {
      setApiError("Something went wrong");
    }
  }

  return (
    <Modal
      title="Your Page Details"
      isOpen={isOpen}
      onVisibilityChange={onVisibilityChange}
    >
      <Formik
        enableReinitialize
        initialValues={{ userName, pageName }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object({
          pageName: Yup.string()
            .required("Required")
            .min(4, "Minimum 4 characters")
            .max(32, "Maximum 32 characters")
            .test(
              "isValidPageName",
              "Page name can only have lowercase letters and hyphens in the following format: 'shankaran-pillais-page'",
              (value) => {
                const hasCorrectFormat = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(
                  value!
                );
                if (!hasCorrectFormat) return false;
                else return true;
              }
            ),
          userName: Yup.string()
            .required("Required")
            .min(3, "Minumum 3 Characters")
            .max(28, "Maximum 28 characters"),
        })}
      >
        {({ values }) => {
          return (
            <Form>
              <Input name="userName" label="Full name" bg="bg-[#F9F9F9]" />
              <Input name="pageName" label="Unique url" bg="bg-[#F9F9F9]" />
              <p className="pl-1 text-sm">Your page url preview:</p>
              <p className="pl-1 mb-8 text-sm text-red-900">
                {ambassadorBaseUrl + values.pageName}
              </p>
              <div className="flex flex-row justify-end">
                <button className="!text-sm" type="submit">
                  Confirm
                </button>
                <span className="text-sm text-red-900">{apiError}</span>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
}
