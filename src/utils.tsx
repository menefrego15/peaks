import { render } from "@testing-library/react";
import { rest } from "msw";
import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export const handlers = [
  rest.get("*/characters*", (req: any, res: any, ctx: any) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          results: [
            {
              name: "IronMan",
              thumbnail: {
                path: "https://cdn-icons-png.flaticon.com/512/30/30779",
                extension: "png",
              },
            },
            {
              name: "Hulk",
              thumbnail: {
                path: "https://cdn-icons-png.flaticon.com/512/30/30779",
                extension: "png",
              },
            },
          ],
        },
      })
    );
  }),
];

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

export function renderWithClient(ui: React.ReactElement) {
  const testQueryClient = createTestQueryClient();
  const { rerender, ...result } = render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
  );
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <QueryClientProvider client={testQueryClient}>
          {rerenderUi}
        </QueryClientProvider>
      ),
  };
}

export function createWrapper() {
  const testQueryClient = createTestQueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
}
