let initialState = {
  loader: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "SET_LOADER":
      return {
        ...state,
        loader: true,
      };

    case "REMOVE_LOADER":
      return {
        ...state,
        loader: false,
      };

    default:
      return state;
  }
}
