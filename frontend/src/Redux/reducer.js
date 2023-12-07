const initialState = {
  isAuth: false,
  user: {},
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "LOGOUT": {
      return { ...state, isAuth: false };
    }
    case "LOGIN_SUCCESS": {
      return { ...state, isAuth: true, user: payload };
    }
    default: {
      return state;
    }
  }
};
