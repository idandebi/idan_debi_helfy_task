const API_URL = 'http://localhost:4000/api/tasks';

async function handleResponse(res) {
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Something went wrong');
  }
  if (res.status === 204) {
    return null;
  }
  return res.json();
}

export function getTasks() {
  return fetch(API_URL).then(handleResponse);
}

export function createTask(task) {
  return fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  }).then(handleResponse);
}

export function updateTask(id, task) {
  return fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  }).then(handleResponse);
}

export function deleteTask(id) {
  return fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  }).then(handleResponse);
}

export function toggleTask(id) {
  return fetch(`${API_URL}/${id}/toggle`, {
    method: 'PATCH',
  }).then(handleResponse);
}
