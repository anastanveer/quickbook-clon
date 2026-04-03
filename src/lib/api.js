async function request(path, options = {}) {
  const response = await fetch(path, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => ({}));
    throw new Error(errorPayload.message || `Request failed: ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export function getDashboard(days) {
  return request(`/api/dashboard?days=${days}`);
}

export function updateSettings(payload) {
  return request('/api/settings', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function getSales(days) {
  return request(`/api/sales?days=${days}`);
}

export function createSale(payload) {
  return request('/api/sales', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateSale(id, payload) {
  return request(`/api/sales/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function deleteSale(id) {
  return request(`/api/sales/${id}`, {
    method: 'DELETE',
  });
}

export function getExpenses(days) {
  return request(`/api/expenses?days=${days}`);
}

export function createExpense(payload) {
  return request('/api/expenses', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateExpense(id, payload) {
  return request(`/api/expenses/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function deleteExpense(id) {
  return request(`/api/expenses/${id}`, {
    method: 'DELETE',
  });
}

export function getInvoices(days) {
  return request(`/api/invoices?days=${days}`);
}

export function createInvoice(payload) {
  return request('/api/invoices', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateInvoice(id, payload) {
  return request(`/api/invoices/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function deleteInvoice(id) {
  return request(`/api/invoices/${id}`, {
    method: 'DELETE',
  });
}

export function subscribeToRealtimeEvents(onMessage) {
  const eventSource = new EventSource('/api/events');

  eventSource.onmessage = (event) => {
    try {
      onMessage(JSON.parse(event.data));
    } catch (error) {
      console.error('Failed to parse realtime event', error);
    }
  };

  eventSource.onerror = () => {
    console.warn('Realtime event stream disconnected; browser will retry automatically.');
  };

  return () => {
    eventSource.close();
  };
}
