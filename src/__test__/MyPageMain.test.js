import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { render, screen, waitFor } from "./testUtils";
import { getReservedCounselList } from "../api/axios";
import theme from "../theme/theme";
import MyPageMain from "../pages/MyPageMain";

jest.mock("react-redux", () => {
  const originalModule = jest.requireActual("react-redux");

  return {
    __esModule: true,
    ...originalModule,
    useSelector: jest.fn(),
  };
});

jest.mock("../api/axios", () => {
  const originalModule = jest.requireActual("../api/axios");

  return {
    __esModule: true,
    ...originalModule,
    getReservedCounselList: jest.fn(),
  };
});

describe("in MyPageMain Component", () => {
  const MyPageMainComponent = (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/mypage/main" element={<MyPageMain />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
      <div id="portal-root"></div>
    </>
  );

  beforeEach(() => {
    useSelector.mockImplementation((selector) =>
      selector({
        user: {
          isLoggedIn: true,
          status: "",
          data: {
            _id: "123",
            imageURL: "",
            email: "thwjd9897@gmail.com",
            notification: "",
            nickname: "소정",
          },
        },
      })
    );
    window.history.pushState({}, "", "/mypage/main");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render user's information", async () => {
    getReservedCounselList.mockImplementation(() =>
      Promise.resolve({
        data: {
          data: {
            counsels: [],
          },
        },
      })
    );
    render(MyPageMainComponent);

    await waitFor(() => {
      expect(screen.getByText("thwjd9897@gmail.com")).toBeInTheDocument();
      expect(screen.getByText("소정")).toBeInTheDocument();
    });
  });

  test("should render no reservation message if array is empty", async () => {
    getReservedCounselList.mockImplementation(() =>
      Promise.resolve({
        data: {
          data: {
            counsels: [],
          },
        },
      })
    );
    render(MyPageMainComponent);

    await waitFor(() => {
      expect(
        screen.getByText("현재 등록된 예약이 없습니다.")
      ).toBeInTheDocument();
    });
  });

  test("render ReservationList if data is existed", async () => {
    getReservedCounselList.mockImplementation(() =>
      Promise.resolve({
        data: {
          data: {
            counsels: [
              {
                _id: "623bc9107c796347fb35faff",
                content: "좋은 개발자가 되고 싶어요!",
                counselee: { nickname: "counselee" },
                counselor: { nickname: "counselor" },
                startDate: "2022-03-30T05:00:00.000Z",
                title: "고민이 있어요",
              },
            ],
          },
        },
      })
    );
    render(MyPageMainComponent);

    await waitFor(() => {
      expect(screen.queryByText("현재 등록된 예약이 없습니다.")).toBeNull();
      expect(screen.queryAllByText("상대방", { exact: false })).toHaveLength(1);
    });
  });
});
