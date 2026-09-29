import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";

export const contributionFixture = {
  totalContributions: 12,
  generatedAt: "2026-09-28T12:00:00.000Z",
  weeks: [
    {
      contributionDays: [
        {
          date: "2026-09-22",
          contributionCount: 0,
          contributionLevel: "NONE",
        },
        {
          date: "2026-09-23",
          contributionCount: 1,
          contributionLevel: "FIRST_QUARTILE",
        },
        {
          date: "2026-09-24",
          contributionCount: 2,
          contributionLevel: "SECOND_QUARTILE",
        },
        {
          date: "2026-09-25",
          contributionCount: 3,
          contributionLevel: "THIRD_QUARTILE",
        },
        {
          date: "2026-09-26",
          contributionCount: 6,
          contributionLevel: "FOURTH_QUARTILE",
        },
      ],
    },
  ],
};

export function successfulContributionResponse() {
  return {
    ok: true,
    status: 200,
    json: vi.fn().mockResolvedValue(contributionFixture),
  } as unknown as Response;
}

beforeEach(() => {
  localStorage.clear();
  document.documentElement.dataset.theme = "dark";
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue(successfulContributionResponse()),
  );
  // jsdom has no top-layer rendering. These shims only model open/close state.
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute("open");
  };
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
