const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

async function request(path, options) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(body.message || 'API request failed');
  }

  return body;
}

export function registerUser(data) {
  return request('/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function loginUser(data) {
  return request('/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function fetchExpenses() {
  return request('/expenses', { method: 'GET' });
}

export function createExpense(data) {
  return request('/expenses', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateExpense(id, data) {
  return request(`/expenses/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}
