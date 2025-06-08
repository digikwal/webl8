const WEBLATE_API = 'https://hosted.weblate.org/api';

interface FetchResult<T> {
  data: T | null;
  error: string | null;
}

export async function fetchProjects(token: string): Promise<FetchResult<any>> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

  try {
    const response = await fetch(`${WEBLATE_API}/projects/`, {
      headers: { Authorization: `Token ${token}` },
      signal: controller.signal
    });

    const data = await response.json();
    clearTimeout(timeout);

    if (!response.ok) {
      return { data: null, error: data?.detail || 'Failed to fetch projects.' };
    }

    return { data, error: null };
  } catch (err: any) {
    clearTimeout(timeout);
    return {
      data: null,
      error: err.name === 'AbortError' ? 'Request timed out.' : err.message || 'Unknown error.'
    };
  }
}
