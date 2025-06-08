export async function fetchStrings({ baseUrl, token, project, component, targetLang }) {
  const url = `${baseUrl}/translations/${project}/${component}/${targetLang}/units/?translated=no`;

  try {
    const response = await fetch(url, {
      headers: { Authorization: `Token ${token}` }
    });

    const isJson = response.headers.get("content-type")?.includes("application/json");

    if (!response.ok) {
      const errData = isJson ? await response.json() : null;
      const message = errData?.detail || `Status ${response.status}`;
      console.error("Weblate API error:", errData || response.statusText);
      return {
        data: [],
        error: `API Error (${response.status}): ${message}`
      };
    }

    if (!isJson) {
      return { data: [], error: "Unexpected response format (non-JSON)." };
    }

    const data = await response.json();
    const results = Array.isArray(data.results) ? data.results : [];

    return { data: results, error: null };
  } catch (err) {
    console.error("Network/API error:", err);
    return {
      data: [],
      error: `Network Error: ${err.message || "Unknown error"}`
    };
  }
}
