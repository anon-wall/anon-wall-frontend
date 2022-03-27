import userReducer, { login, logout } from "../features/userSlice";
import { ACCESS_TOKEN } from "../constants/home";

jest.mock("../api", () => {
  return {
    async firebaseLogin() {
      return {
        _id: "1",
        imageURL: "http://test.image.url",
        email: "test@gmail.com",
        notification: "60",
        nickname: "test",
      };
    },
  };
});

describe("User Reducer", () => {
  const mockRemoveItem = jest.spyOn(Storage.prototype, "removeItem");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the initial state when passed an empty action", () => {
    const initialState = undefined;
    const action = { type: "" };
    const result = userReducer(initialState, action);

    expect(result).toEqual({
      isLoggedIn: false,
      status: "",
      data: {
        _id: "",
        imageURL: "",
        email: "",
        notification: "",
        nickname: "",
      },
    });
  });

  it("should logout", () => {
    const state = {
      isLoggedIn: true,
      status: "",
      data: {
        _id: "1",
        imageURL: "http://image.url",
        email: "test@gmail.com",
        notification: "",
        nickname: "testNickname",
      },
    };

    const action = logout();
    const result = userReducer(state, action);

    expect(result.isLoggedIn).toEqual(false);
    expect(mockRemoveItem).toHaveBeenCalledWith(ACCESS_TOKEN);
    Object.values(result.data).forEach((item) => {
      expect(item).toBeFalsy();
    });
  });
});

describe("User redux thunks", () => {
  describe("login with mocked dispatch", () => {
    it("should get User info", async () => {
      const dispatch = jest.fn();
      const state = {
        isLoggedIn: false,
        status: "",
        data: {
          _id: "",
          imageURL: "",
          email: "",
          notification: "",
          nickname: "",
        },
      };
      const thunk = login();

      await thunk(dispatch, () => state, undefined);
      const { calls } = dispatch.mock;

      expect(calls).toHaveLength(2);
      expect(calls[0][0].type).toEqual("user/login/pending");
      expect(calls[1][0].type).toEqual("user/login/fulfilled");
      expect(calls[1][0].payload).toEqual({
        _id: "1",
        imageURL: "http://test.image.url",
        email: "test@gmail.com",
        notification: "60",
        nickname: "test",
      });
    });
  });
});
