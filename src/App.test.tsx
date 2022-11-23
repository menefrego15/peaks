import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import App from "./App";
import { QueryClientProvider, QueryClient } from "react-query";
import { useCharactersData } from "./hooks/useCharactersData";
import { createWrapper, renderWithClient } from "./utils";
import { server } from "./setupTests";
import { rest } from "msw";

describe("Pagination is working correctly", () => {
  it("page starts at 0", () => {
    const Wrapper = createWrapper();
    render(
      <Wrapper>
        <App />
      </Wrapper>
    );
    const page = screen.getByTestId(`current-page`);

    expect(page.innerHTML).toBe("0");
  });

  it("should add 2 and minus 1 to page", () => {
    const Wrapper = createWrapper();
    render(
      <Wrapper>
        <App />
      </Wrapper>
    );
    const page = screen.getByTestId(`current-page`);
    expect(page.innerHTML).toBe("0");
    fireEvent.click(screen.getByText(/next/i));
    fireEvent.click(screen.getByText(/next/i));
    expect(page.innerHTML).toBe("2");
    fireEvent.click(screen.getByText(/prev/i));
    expect(page.innerHTML).toBe("1");
  });
});

describe("Characters fetching", () => {
  test("Should return characters", async () => {
    const { result } = renderHook(() => useCharactersData({ page: 0 }), {
      wrapper: createWrapper(),
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.data?.results[0].name).toBe("IronMan");
  });

  test("Should show characters on ui after fetching", async () => {
    const result = renderWithClient(<App />);
    expect(await result.findByText(/IronMan/i)).toBeInTheDocument();
  });

  test("Render error if request fail", async () => {
    server.use(
      rest.get("*", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    const result = renderWithClient(<App />);

    expect(
      await result.findByText(/an error has occurred/i)
    ).toBeInTheDocument();
  });
});
