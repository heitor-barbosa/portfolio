export type ContributionLevel =
  | "NONE"
  | "FIRST_QUARTILE"
  | "SECOND_QUARTILE"
  | "THIRD_QUARTILE"
  | "FOURTH_QUARTILE";

export type ContributionDay = {
  date: string;
  contributionCount: number;
  contributionLevel: ContributionLevel;
};

export type ContributionCalendar = {
  totalContributions: number;
  weeks: Array<{ contributionDays: ContributionDay[] }>;
  generatedAt: string;
};

const CACHE_KEY = "heitor-github-contributions";
const CACHE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1_000;

function isCalendar(value: unknown): value is ContributionCalendar {
  if (!value || typeof value !== "object") return false;
  const calendar = value as Partial<ContributionCalendar>;
  return (
    typeof calendar.totalContributions === "number" &&
    typeof calendar.generatedAt === "string" &&
    Array.isArray(calendar.weeks) &&
    calendar.weeks.every(
      (week) =>
        Array.isArray(week.contributionDays) &&
        week.contributionDays.every(
          (day) =>
            typeof day.date === "string" &&
            typeof day.contributionCount === "number" &&
            typeof day.contributionLevel === "string",
        ),
    )
  );
}

export async function fetchContributions(signal?: AbortSignal) {
  const response = await fetch("/api/github-contributions", {
    headers: { Accept: "application/json" },
    signal,
  });

  if (!response.ok)
    throw new Error(`Contributions request failed: ${response.status}`);

  const calendar: unknown = await response.json();
  if (!isCalendar(calendar)) throw new Error("Invalid contributions response");
  return calendar;
}

export function readCachedContributions(): ContributionCalendar | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached = JSON.parse(raw) as { savedAt?: number; calendar?: unknown };
    if (
      typeof cached.savedAt !== "number" ||
      Date.now() - cached.savedAt > CACHE_MAX_AGE_MS ||
      !isCalendar(cached.calendar)
    ) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    return cached.calendar;
  } catch {
    return null;
  }
}

export function cacheContributions(calendar: ContributionCalendar) {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ savedAt: Date.now(), calendar }),
    );
  } catch {
    // The graph still works when browser storage is disabled or full.
  }
}
