import type { VercelRequest, VercelResponse } from "@vercel/node";

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
const GITHUB_LOGIN = "heitor-barbosa";
const REQUEST_TIMEOUT_MS = 8_000;

const query = `
  query ContributionCalendar($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

type GitHubResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          weeks: Array<{
            contributionDays: Array<{
              date: string;
              contributionCount: number;
              contributionLevel: string;
            }>;
          }>;
        };
      };
    } | null;
  };
  errors?: Array<{ message: string }>;
};

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.error("GITHUB_TOKEN is not configured");
    response.setHeader("Cache-Control", "private, no-store");
    return response.status(503).json({ error: "Contributions unavailable" });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const githubResponse = await fetch(GITHUB_GRAPHQL_URL, {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "heitor-barbosa-portfolio",
      },
      body: JSON.stringify({ query, variables: { login: GITHUB_LOGIN } }),
      signal: controller.signal,
    });

    if (!githubResponse.ok) {
      console.error(`GitHub API returned ${githubResponse.status}`);
      if (githubResponse.status === 403 || githubResponse.status === 429) {
        response.setHeader("Retry-After", "60");
      }
      response.setHeader("Cache-Control", "private, no-store");
      return response.status(502).json({ error: "Contributions unavailable" });
    }

    const result = (await githubResponse.json()) as GitHubResponse;
    const calendar =
      result.data?.user?.contributionsCollection?.contributionCalendar;

    if (result.errors?.length || !calendar) {
      console.error(
        "GitHub GraphQL response did not include a contribution calendar",
      );
      response.setHeader("Cache-Control", "private, no-store");
      return response.status(502).json({ error: "Contributions unavailable" });
    }

    response.setHeader(
      "Cache-Control",
      "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400, stale-if-error=86400",
    );
    response.setHeader("X-Content-Type-Options", "nosniff");
    return response.status(200).json({
      ...calendar,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "AbortError";
    console.error(
      timedOut ? "GitHub API request timed out" : "GitHub API failed",
    );
    response.setHeader("Cache-Control", "private, no-store");
    return response
      .status(timedOut ? 504 : 502)
      .json({ error: "Contributions unavailable" });
  } finally {
    clearTimeout(timeout);
  }
}
