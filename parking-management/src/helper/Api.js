import Url from "./Url";

//Please read the function name carefully. their working can be understand by their names

export const _setLocalStorage = (key, value) => {
  if (Window !== "undefined") localStorage.setItem(key, JSON.stringify(value));
};

export const authenticate = (response, next) => {
  _setLocalStorage("user", response);
  next();
};
export const logoutUser = (next) => {
  localStorage.removeItem("user");
  next();
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") {
    return false;
  }
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(localStorage.getItem("user"));
  } else {
    return false;
  }
};

export const signinUser = async (data) => {
  try {
    let result = await fetch(Url._signin, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
      }),
    });
    return result.json();
  } catch (error) {
    throw new Error(error);
  }
};
export const initApp = async () => {
  try {
    const user = isAuthenticated();
    let result = await fetch(Url._initApp, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": user.token,
      },
      body: JSON.stringify({}),
    });
    return result.json();
  } catch (error) {
    throw new Error(error);
  }
};
export const getAllParkingSpaces = async () => {
  try {
    let result = await fetch(Url._getAllParkingSpaces, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result.json();
  } catch (error) {
    throw new Error(error);
  }
};

export const bookNewParking = async (data) => {
  try {
    const user = isAuthenticated();
    let result = await fetch(Url._bookNewParking, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": user.token,
      },
      body: JSON.stringify({ ...data }),
    });
    return result.json();
  } catch (error) {
    throw new Error(error);
  }
};
export const releaseParking = async (id) => {
  try {
    const user = isAuthenticated();
    let result = await fetch(Url._releaseParking + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": user.token,
      },
    });
    return result.json();
  } catch (error) {
    throw new Error(error);
  }
};

export const downloadReport = async () => {
  try {
    let result = await fetch(Url._getReport, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result.json();
  } catch (error) {
    throw new Error(error);
  }
};
