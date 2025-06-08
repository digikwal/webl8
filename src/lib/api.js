/**
 * Fetch untranslated strings from Weblate
 *
 * @param {Object} params
 * @param {string} params.baseUrl - Weblate API base URL
 * @param {string} params.token - Weblate API token
 * @param {string} params.project - Weblate project name
 * @param {string} params.component - Weblate component name
 * @param {string} params.targetLang - Target language code
 * @returns {Promise<{ data: Array, error: string | null }>}
 */
export async function fetchStrings({ baseUrl, token, project, component, targetLang }) {
  const endpoint = `${baseUrl}/translations/${project}/${component}/${targetLang}/units/?translated=no`;

  try {
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Token ${token}`
      }
    });

    const isJson = response.headers.get('content-type')?.includes('application/json');

    if (!response.ok) {
      const errData = isJson ? await response.json() : null;
      const message = errData?.detail || response.statusText || 'Unknown error';
      console.error('❌ Weblate API error:', errData || response.status);
      return {
        data: [],
        error: `API Error (${response.status}): ${message}`
      };
    }

    if (!isJson) {
      console.error('⚠ Unexpected response format: not JSON');
      return {
        data: [],
        error: 'Unexpected response format (non-JSON).'
      };
    }

    const json = await response.json();
    const results = Array.isArray(json.results) ? json.results : [];

    return {
      data: results,
      error: null
    };
  } catch (err) {
    console.error('⚠ Network/API error:', err);
    return {
      data: [],
      error: `Network Error: ${err.message || 'Unknown error'}`
    };
  }
}
