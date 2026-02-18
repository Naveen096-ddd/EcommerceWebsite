
import axiosInstance from "../apis/axiosInstancs";
// LOGIN
export const loginApi = (data) => {
  return axiosInstance.post("/login", data);
};
export const getUserDashApi = () => {
  return axiosInstance.get("/userdash");
};
export const getAdminDashApi = () => {
  return axiosInstance.get("/admindash");
};
export const getManagerDashApi = () => {
  return axiosInstance.get("/managerdash");
};

// SIGNUP
export const signupApi = (data) => {
  return axiosInstance.post("/register", data);
};

// FORGOT PASSWORD
export const forgotPasswordApi = (email) => {
  return axiosInstance.post("/forgot-password", { email });
};

// VERIFY OTP
export const verifyOtpApi = (data) => {
  return axiosInstance.post("/verify-otp", data);
};

// CHANGE PASSWORD
export const changePasswordApi = (data) => {
  return axiosInstance.post("/change-password", data);
};

//products
export const createProductApi = (data) =>{
  return axiosInstance.post("/products", data);
}

export const getProductsApi = () => {
  return axiosInstance.get("/products");
}

export const updateProductApi = (id, data) =>{
  return axiosInstance.put(`/products/${id}`, data);
}

export const deleteProductApi = (id) =>{
  return axiosInstance.delete(`/products/${id}`);
}


// ================= LOCATION =================

// Save User Location
export const saveUserLocationApi = (data) => {
  return axiosInstance.post("/api/location/user", data);
};

// Save Admin Location
export const saveAdminLocationApi = (data) => {
  return axiosInstance.post("/api/location/admin", data);
};
// 🔍 Get Admin Location
export const getAdminLocationApi = (username) => {
  return axiosInstance.get(`/api/location/admin/${username}`);
};


// Get Nearby Admins
export const getNearbyAdminsApi = (latitude, longitude, kms) => {
  return axiosInstance.get("/api/nearby-admins", {
    params: { latitude, longitude, kms }
  });
};


// ================= ORDER =================

// Place Order
export const placeOrderApi = (data) => {
  return axiosInstance.post("/placeorder", data);
};
export const acceptOrderApi = (data) => {
  return axiosInstance.post("/acceptOrder", data);
}
// Get Orders
export const getOrdersApi = () => {
  return axiosInstance.get("/placeorders");
}
