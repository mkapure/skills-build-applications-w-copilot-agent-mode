export const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export function normalizeCollectionResponse(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === 'object') {
    if (Array.isArray(payload.results)) {
      return payload.results;
    }

    if (Array.isArray(payload.items)) {
      return payload.items;
    }

    if (Array.isArray(payload.data)) {
      return payload.data;
    }
  }

  return [];
}

export async function fetchCollection(resourcePath) {
  const response = await fetch(`${API_BASE_URL}/${resourcePath}/`);

  if (!response.ok) {
    throw new Error(`Request failed for ${resourcePath}: ${response.status}`);
  }

  const payload = await response.json();
  return normalizeCollectionResponse(payload);
}
