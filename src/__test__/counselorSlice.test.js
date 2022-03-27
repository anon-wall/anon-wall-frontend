import counselorReducer, {
  deleteAvailableDates,
  getCounselorInfo,
  updateAvailableDates,
  updateCounselorInfo,
} from "../features/counselorSlice";

jest.mock("../api/axios", () => {
  return {
    async getCounselor(userId) {
      if (userId !== "1") {
        throw new Error("Fail");
      }

      return {
        data: {
          data: {
            counselor: {
              _id: "1",
              familyTitle: "아버지",
              shortInput: "안녕하세요.",
              longInput: "10년째 기러기 아빠 입니다.",
              tag: [],
              availableDates: [],
            },
          },
        },
      };
    },
    async updateCounselorSchedule(payload) {
      return {
        data: {
          data: {
            counselor: {
              availableDates: payload.availableDates,
            },
          },
        },
      };
    },
    async updateCounselor(payload) {
      return {
        data: {
          data: {
            counselor: { ...payload.newCounselorInfo },
          },
        },
      };
    },
  };
});

describe("Counselor Reducer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the initial state when passed an empty action", () => {
    const initialState = undefined;
    const action = { type: "" };
    const result = counselorReducer(initialState, action);

    expect(result).toEqual({
      status: "",
      error: null,
      data: {
        _id: "",
        familyTitle: "",
        shortInput: "",
        longInput: "",
        tag: [],
        availableDates: [],
      },
    });
  });

  it("should delete availableDates that matches id", () => {
    const initialState = {
      status: "",
      error: null,
      data: {
        _id: "",
        familyTitle: "",
        shortInput: "",
        longInput: "",
        tag: [],
        availableDates: [{ _id: 1 }, { _id: 2 }, { _id: 3 }],
      },
    };

    const action = deleteAvailableDates({ id: 1 });
    const result = counselorReducer(initialState, action);

    expect(result.data.availableDates.length).toEqual(2);
    result.data.availableDates.forEach(({ _id }) => {
      expect(_id).not.toEqual(1);
    });
  });
});

describe("Counselor redux thunks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getCounselorInfo with mocked dispatch", () => {
    it("should get couneslor info", async () => {
      const dispatch = jest.fn();
      const state = {
        status: "",
        error: null,
        data: {
          _id: "",
          familyTitle: "",
          shortInput: "",
          longInput: "",
          tag: [],
          availableDates: [],
        },
      };
      const thunk = getCounselorInfo("1");

      await thunk(dispatch, () => state, undefined);
      const { calls } = dispatch.mock;

      expect(calls).toHaveLength(2);
      expect(calls[0][0].type).toEqual("counselor/getCounselorInfo/pending");
      expect(calls[1][0].type).toEqual("counselor/getCounselorInfo/fulfilled");
      expect(calls[1][0].payload._id).toEqual("1");
    });

    it("should fail with not existing id", async () => {
      const dispatch = jest.fn();
      const state = {
        status: "",
        error: null,
        data: {
          _id: "",
          familyTitle: "",
          shortInput: "",
          longInput: "",
          tag: [],
          availableDates: [],
        },
      };

      const thunk = getCounselorInfo("2");

      await thunk(dispatch, () => state, undefined);
      const { calls } = dispatch.mock;

      expect(calls).toHaveLength(2);
      expect(calls[0][0].type).toEqual("counselor/getCounselorInfo/pending");
      expect(calls[1][0].type).toEqual("counselor/getCounselorInfo/rejected");
    });
  });

  describe("updateAvailableDates with mocked dispatch", () => {
    it("should update available dates", async () => {
      const dispatch = jest.fn();

      const payload = {
        userId: "1",
        availableDates: [{ type: "wDay", day: 0, startHour: 1, endHour: 14 }],
      };

      await updateAvailableDates(payload)(dispatch);
      const { calls } = dispatch.mock;

      expect(calls).toHaveLength(2);
      expect(calls[0][0].type).toEqual(
        "counselor/updateAvailableDates/pending"
      );
      expect(calls[1][0].type).toEqual(
        "counselor/updateAvailableDates/fulfilled"
      );
    });
  });

  describe("updateCounselorInfo with mocked dispatch", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should update counselor info", async () => {
      const dispatch = jest.fn();

      const payload = {
        userId: "1",
        newCounselorInfo: {
          _id: "",
          familyTitle: "아버지",
          shortInput: "안녕하세요!",
          longInput: "기러기 아빠입니다~!",
          tag: [],
          availableDates: [],
        },
      };

      await updateCounselorInfo(payload)(dispatch);
      const { calls } = dispatch.mock;

      expect(calls).toHaveLength(2);
      expect(calls[0][0].type).toEqual("counselor/updateCounselorInfo/pending");
      expect(calls[1][0].type).toEqual(
        "counselor/updateCounselorInfo/fulfilled"
      );
    });
  });
});
