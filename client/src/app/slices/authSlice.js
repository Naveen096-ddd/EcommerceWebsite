// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import Cookies from "js-cookie";
// import { loginApi, signupApi } from "../../apis/Api";

// // LOGIN
// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async ({ email, password, username }, { rejectWithValue }) => {
//     try {
//       const payload = username
//         ? { username, password }
//         : { email, password };

//       const res = await loginApi(payload);
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || "Login failed");
//     }
//   }
// );

// export const signupUser = createAsyncThunk(
//   "auth/signupUser",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const res = await signupApi(userData);
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || "Signup failed");
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: null,
//     role: null,
//     token: null,
//     loading: false,
//     error: null,
//     successMessage: null,
//   },
//   reducers: {
//     logout: (state) => {
//       // 🔥 Redux state reset
//       state.user = null;
//       state.role = null;
//       state.token = null;
//       state.loading = false;
//       state.error = null;
//       state.successMessage = null;

//       // 🔥 Clear cookies
//       Cookies.remove("token");
//       Cookies.remove("role");
//       Cookies.remove("username");

//       // 🔥 Clear localStorage (your app uses this!)
//       localStorage.removeItem("token");
//       localStorage.removeItem("role");
//       localStorage.removeItem("email");
//       localStorage.removeItem("loggedInUser");
//     },

//     clearAuthMessages: (state) => {
//       state.error = null;
//       state.successMessage = null;
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;

//         if (action.payload?.success) {
//           const token = action.payload.token || action.payload.data?.token;
//           const role = action.payload.role || action.payload.data?.role;
//           const username =
//             action.payload.username ||
//             action.payload.data?.username ||
//             action.meta.arg?.username ||
//             "";

//           state.user = username;
//           state.role = role;
//           state.token = token;

//           // 🔥 Cookies
//           Cookies.set("token", token, { expires: 1 });
//           Cookies.set("role", role, { expires: 1 });
//           Cookies.set("username", username, { expires: 1 });

//           // 🔥 localStorage (keep in sync)
//           localStorage.setItem("token", token);
//           localStorage.setItem("role", role);
//           localStorage.setItem("email", action.meta.arg?.email || "");
//           localStorage.setItem("loggedInUser", JSON.stringify({ username }));
//         } else {
//           state.error = "Invalid credentials";
//         }
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout, clearAuthMessages } = authSlice.actions;
// export default authSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { loginApi, signupApi } from "../../apis/Api";


// ================= LOGIN =================
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password, username }, { rejectWithValue }) => {
    try {
      const payload = username
        ? { username, password }
        : { email, password };

      const res = await loginApi(payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Login failed" }
      );
    }
  }
);


// ================= SIGNUP =================
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await signupApi(userData);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Signup failed" }
      );
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    role: null,
    token: null,
    loading: false,
    error: null,
    successMessage: null,
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.successMessage = null;

      Cookies.remove("token");
      Cookies.remove("role");
      Cookies.remove("username");

      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("email");
      localStorage.removeItem("loggedInUser");
    },

    clearAuthMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ================= LOGIN =================
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload?.success) {
          const token = action.payload.token || action.payload.data?.token;
          const role = action.payload.role || action.payload.data?.role;
          const username =
            action.payload.username ||
            action.payload.data?.username ||
            action.meta.arg?.username ||
            "";

          state.user = username;
          state.role = role;
          state.token = token;

          Cookies.set("token", token, { expires: 1 });
          Cookies.set("role", role, { expires: 1 });
          Cookies.set("username", username, { expires: 1 });

          localStorage.setItem("token", token);
          localStorage.setItem("role", role);
          localStorage.setItem("email", action.meta.arg?.email || "");
          localStorage.setItem("loggedInUser", JSON.stringify({ username }));
        } else {
          state.error = action.payload?.message || "Invalid credentials";
        }
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      })


      // ================= SIGNUP =================
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })

      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload?.success) {
          state.successMessage =
            action.payload.message || "Signup successful 🎉";
        } else {
          state.error =
            action.payload?.message || "Signup failed";
        }
      })

      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Signup failed";
      });
  },
});

export const { logout, clearAuthMessages } = authSlice.actions;
export default authSlice.reducer;