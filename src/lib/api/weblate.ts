const WEBLATE_API = 'https://hosted.weblate.org/api';

export interface WeblateProject {
  name: string;
  slug: string;
  url: string;
  web: string;
  id: number;
  components: string[];
  repository?: string | null;
  instructions?: string;
}

interface FetchResult<T> {
  data: T | null;
  error: string | null;
}

export async function fetchProjects(token: string): Promise<FetchResult<WeblateProject[]>> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(`${WEBLATE_API}/projects/`, {
      headers: {
        Authorization: `Token ${token}`,
        Accept: 'application/json',
      },
      signal: controller.signal,
    });

    const json = await response.json();
    clearTimeout(timeout);

    if (!response.ok) {
      const message = typeof json?.detail === 'string' ? json.detail : 'Failed to fetch projects.';
      return { data: null, error: message };
    }

    return { data: json as WeblateProject[], error: null };
  } catch (err: unknown) {
    clearTimeout(timeout);

    const message =
      err instanceof DOMException && err.name === 'AbortError'
        ? 'Request timed out.'
        : err instanceof Error
          ? err.message
          : 'Unknown error.';

    return { data: null, error: message };
  }
}
