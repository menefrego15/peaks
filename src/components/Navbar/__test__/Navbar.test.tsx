import React, { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Navbar from "../Navbar";
import { createWrapper } from "../../../utils";
import App from "../../../App";

test("Button prev should be disabled if we are at first page", async () => {
  render(<Navbar page={0} setPage={() => {}} />);
  const buttonPrev = await screen.findByRole("button", {
    name: "prev",
  });
  expect(buttonPrev).toBeDisabled();
});

test("Button next should be in the document", async () => {
  render(<Navbar page={0} setPage={() => {}} />);
  const buttonNext = await screen.findByRole("button", {
    name: "next",
  });
  expect(buttonNext).toBeInTheDocument();
});

test("Button Show Favorites should be in the document", async () => {
  render(<Navbar page={0} setPage={() => {}} />);
  const buttonFav = await screen.findByRole("button", {
    name: "show favorites",
  });
  expect(buttonFav).toBeInTheDocument();
});

test("Show favorites button should work", async () => {
  const Wrapper = createWrapper();
  render(
    <Wrapper>
      <App />
    </Wrapper>
  );
  const buttonShowFav = await screen.findByRole("button", {
    name: "show favorites",
  });
  const favoritebtn = screen.getByTestId(`favorite-btn`);
  fireEvent.click(buttonShowFav);
  expect(favoritebtn.innerHTML).toBe("Don't show favorites");
});
