// ./src/routes/fetch/+server.js
import { getSourceStrings } from '$lib/api.js';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const form = await request.formData();
  const token = form.get('token');
  const component = form.get('component');

  if (!token || !component) {
    return jsonResponse({ success: false, error: 'Missing token or component.' }, 400);
  }

  const { data, error } = await getSourceStrings({ token, component });

  if (error) {
    return jsonResponse({ success: false, error }, 502);
  }

  return jsonResponse({ success: true, data }, 200);
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
