import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { render, screen, waitFor } from "./testUtils";
import theme from "../theme/theme";
import StoryList from "../pages/StoryList";
import { getCounselList } from "../api/axios";

jest.mock("../api/axios", () => {
  const originalModule = jest.requireActual("../api/axios");

  return {
    __esModule: true,
    ...originalModule,
    getCounselList: jest.fn(),
  };
});

describe("in StoryList Component", () => {
  const StoryListComponent = (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/counsels" element={<StoryList />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );

  beforeEach(() => {
    window.history.pushState({}, "", "/counsels");
  });

  test("render no result message if array is empty", async () => {
    getCounselList.mockImplementation(() =>
      Promise.resolve({
        data: {
          data: {
            counsels: [],
          },
        },
      })
    );
    render(StoryListComponent);

    await waitFor(() => {
      expect(screen.getByText("검색 결과가 없습니다.")).toBeInTheDocument();
      expect(screen.queryAllByText("작성자", { exact: false })).toHaveLength(0);
    });
  });

  test("render StoryList if data is existed", async () => {
    getCounselList.mockImplementation(() =>
      Promise.resolve({
        data: {
          data: {
            counsels: [
              {
                _id: "623bc9107c796347fb35faff",
                content: "좋은 개발자가 되고 싶어요!",
                counselee: { imageURL: "", nickname: "" },
                counselors: [],
                createdAt: "2022-03-24T01:27:44.000Z",
                tag: ["개발자", "코딩"],
                title: "고민이 있어요",
              },
            ],
          },
        },
      })
    );
    render(StoryListComponent);

    await waitFor(() => {
      expect(screen.queryByText("검색 결과가 없습니다.")).toBeNull();
      expect(screen.queryAllByText("작성자", { exact: false })).toHaveLength(1);
    });
  });
});
