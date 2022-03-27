import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { render, screen, waitFor, fireEvent } from "./testUtils";
import UploadStory from "../pages/UploadStory";
import { createCounsel } from "../api/axios";
import { INPUT_TAG, RESTRICT_REGEX, UPLOAD_SUCCESS } from "../constants/upload";

jest.mock("../api/axios", () => {
  const originalModule = jest.requireActual("../api/axios");

  return {
    __esModule: true,
    ...originalModule,
    createCounsel: jest.fn(),
  };
});

jest.mock("react-redux", () => {
  const originalModule = jest.requireActual("react-redux");

  return {
    __esModule: true,
    ...originalModule,
    useSelector: jest.fn(),
  };
});

describe("in UploadStory Component", () => {
  const UploadStoryComponent = (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/counsels/new" element={<UploadStory />} />
        </Routes>
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
    window.history.pushState({}, "", "/counsels/new");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("cannot type special character except (,) in hashtag input", async () => {
    render(UploadStoryComponent);

    const input = screen.getByPlaceholderText(INPUT_TAG);

    fireEvent.change(input, { target: { value: "!" } });

    await waitFor(() => {
      expect(screen.getByText(RESTRICT_REGEX)).toBeInTheDocument();
    });
  });

  test("render success message if submit is success", async () => {
    createCounsel.mockImplementation(() => Promise.resolve("ok"));
    render(UploadStoryComponent);

    const button = screen.getByRole("button", { name: "등록하기" });

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(UPLOAD_SUCCESS)).toBeInTheDocument();
    });
  });

  test("render error message", async () => {
    createCounsel.mockImplementation(() => Promise.reject({ message: "에러" }));
    render(UploadStoryComponent);

    const button = screen.getByRole("button", { name: "등록하기" });

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("에러")).toBeInTheDocument();
    });
  });
});
