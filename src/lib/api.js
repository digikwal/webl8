export async function fetchStrings({ baseUrl, token, project, component, targetLang }) {
  const url = `${baseUrl}/translations/${project}/${component}/${targetLang}/units/?translated=no`;

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Token ${token}` }
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("Weblate API error:", err);
      return { data: [], error: `API Error: ${err.detail || "Failed to fetch strings."}` };
    }

    const data = await res.json();
    return { data: data.results || [], error: null };
  } catch (err) {
    console.error("Network/API error:", err);
    return { data: [], error: `Network Error: ${err.message}` };
  }
}