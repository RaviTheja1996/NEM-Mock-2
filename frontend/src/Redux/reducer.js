const initialState = {
  isAuth: false,
  logged_user: {},
  isLoading: false,
  registered_user: {},
  blogs: [],
  token: "",
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "LOGOUT": {
      return { ...state, isAuth: false };
    }
    case "LOGIN_SUCCESS": {
      return {
        ...state,
        isAuth: true,
        logged_user: payload.user,
        token: payload.token,
      };
    }
    case "REGISTER": {
      return { ...state, registered_user: payload };
    }
    case "BLOGS_DATA_FETCH": {
      return { ...state, blogs: payload }
    }
    default: {
      return state;
    }
  }
};
