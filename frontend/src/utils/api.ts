const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function backendRequest(
  endpoint: RequestInfo,
  options?: RequestInit
) {
  const res = await fetch(API_URL + endpoint, {
    ...options,
    headers: {
      ...options?.headers,
    },
  });
  return res;
}

export async function authedFetcher(endpoint: RequestInfo) {
  const bearer = localStorage.getItem("token");
  if (!bearer) {
    throw Error("No authorization token found. Please log in");
  }
  const data = await fetcher(endpoint, { headers: { Authorization: bearer } });
  return data;
}

export async function fetcher(endpoint: RequestInfo, options?: RequestInit) {
  const res = await backendRequest(endpoint, options);
  return res.json();
}

type RegistrationData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export async function register(data: RegistrationData) {
  const res = await backendRequest("/authenticate/register", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}

type LoginData = {
  email: string;
  password: string;
};

export async function login(data: LoginData) {
  const res = await backendRequest("/authenticate/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
}

type status = "online" | "offline";
export type MicrositeData = {
  userName: string;
  email: string;
  pageName: string;
  status: status;
  profilePicture: string;
  profession: string;
  country: string;
  ieCompleted: Date;
  aboutMe: string;
  shareExperience: string;
  videoSharing: string;
  bannerImage: string;
  userId: string;
};

export async function updateMicrosite(data: Partial<MicrositeData>) {
  const bearer = localStorage.getItem("token");
  if (!bearer) {
    throw Error("No bearer token found. Please log in");
  }
  const res = await backendRequest("/ambassador/update-microsite", {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      authorization: bearer,
      "Content-Type": "application/json",
    },
  });
  return res.json();
}

type MediaType = "bannerImage" | "profilePicture" | "video";

export async function uploadFile(file: File, mediaType: MediaType) {
  const bearer = localStorage.getItem("token");
  if (!bearer) {
    throw Error("No bearer token found. Please log in");
  }

  const formData = new FormData();
  formData.append("files", file);

  return backendRequest("/ambassador/upload-files?mediaType=" + mediaType, {
    method: "PATCH",
    body: formData,
    headers: { authorization: bearer },
  });
}

export async function resetPasswordToken(email: string) {
  const res = await backendRequest("/authenticate/reset-password-token", {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
  // return res.json();
}

type ResetPasswordData = {
  email: string;
  newPassword: string;
  confirmNewPassword: string;
  token: string;
};

export async function resetPassword(data: ResetPasswordData) {
  const res = await backendRequest("/authenticate/reset-password", {
    method: "POST",
    body: JSON.stringify({
      ...data,
      confirmeNewPassword: data.confirmNewPassword,
      token: data.token.replaceAll(" ", "+"),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
  // return res.json();
}
