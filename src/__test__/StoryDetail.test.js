import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";

import StoryDetail from "../pages/StoryDetail";
import { render, screen, waitFor, fireEvent } from "./testUtils";
import { getCounsel, updateCounselors } from "../api/axios";

jest.mock("react-redux", () => {
  const originalModule = jest.requireActual("react-redux");

  return {
    __esModule: true,
    ...originalModule,
    useSelector: jest.fn(),
  };
});

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");

  return {
    __esModule: true,
    ...originalModule,
    useParams: jest.fn(),
  };
});

jest.mock("../api/axios", () => {
  const originalModule = jest.requireActual("../api/axios");

  return {
    __esModule: true,
    ...originalModule,
    getCounsel: jest.fn(),
    updateCounselors: jest.fn(),
  };
});

describe("in StoryDetail Component", () => {
  const StoryDetailComponent = (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/counsels/:counsel_id" element={<StoryDetail />} />
        </Routes>
      </BrowserRouter>
      <div id="portal-root"></div>
    </>
  );

  beforeEach(() => {
    useParams.mockReturnValue({ counsel_id: "123" });
    getCounsel.mockImplementation(() =>
      Promise.resolve({
        data: {
          data: {
            content: "좋은 개발자가 되고 싶어요!",
            counselee: { _id: "623", nickname: "Jorie", imageURL: "" },
            createdAt: "2022-03-24T01:27:44.000Z",
            tag: ["개발자", "코딩"],
            title: "고민이 있어요",
            _id: "623bc9107c796347fb35faff",
          },
        },
      })
    );
    window.history.pushState({}, "", "/counsels/:counsel_id");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render story detail", async () => {
    render(StoryDetailComponent);

    await waitFor(() => {
      expect(screen.getByText("Jorie")).toBeInTheDocument();
      expect(screen.getByText("고민이 있어요")).toBeInTheDocument();
      expect(
        screen.getByText("좋은 개발자가 되고 싶어요!")
      ).toBeInTheDocument();
    });
  });

  test("should not render 사연 수락하기 button if story is wriiten by user", async () => {
    useSelector.mockImplementation((selector) =>
      selector({
        user: {
          isLoggedIn: true,
          status: "",
          data: {
            _id: "623",
            imageURL: "",
            email: "thwjd9897@gmail.com",
            notification: "",
            nickname: "소정",
          },
        },
      })
    );

    render(StoryDetailComponent);

    await waitFor(() => {
      expect(screen.queryByText("사연 수락하기")).toBeNull();
    });
  });

  test("should render 사연 수락하기 button if story is not wriiten by user", async () => {
    useSelector.mockImplementation((selector) =>
      selector({
        user: {
          isLoggedIn: true,
          status: "",
          data: {
            _id: "111123",
            imageURL: "",
            email: "thwjd9897@gmail.com",
            notification: "",
            nickname: "소정",
          },
        },
      })
    );

    render(StoryDetailComponent);

    await waitFor(() => {
      expect(screen.getByText("사연 수락하기")).toBeInTheDocument();
    });
  });

  test("should render success", async () => {
    updateCounselors.mockImplementation(() => Promise.resolve("ok"));
    useSelector.mockImplementation((selector) =>
      selector({
        user: {
          isLoggedIn: true,
          status: "",
          data: {
            _id: "111123",
            imageURL: "",
            email: "thwjd9897@gmail.com",
            notification: "",
            nickname: "소정",
          },
        },
      })
    );
    render(StoryDetailComponent);

    await waitFor(() => {
      expect(screen.getByText("사연 수락하기")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: "사연 수락하기" }));

    await waitFor(() => {
      expect(
        screen.getByText("사연 수락이 완료되었습니다.")
      ).toBeInTheDocument();
    });
  });
});
