export const httpGet = async (url: string, body: object) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (response.status !== 200) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
  return response.json();
};
