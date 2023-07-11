const DOMAIN = import.meta.env.VITE_WEAVY_DOMAIN;
const KEY = import.meta.env.VITE_WEAVY_ACCESS_TOKEN;

export const ApiClient = async ({ endpoint, method, body }) => {
  if (!DOMAIN || !KEY) {
    console.error(`Weavy Environment Variables Missing!`);
    return;
  }

  try {
    const request = await fetch(`${DOMAIN}/api/${endpoint}`, {
      method: method || "GET",
      headers: {
        Authorization: `Bearer ${KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return await request.json();
  } catch (e) {
    console.log(`Error with ${endpoint} endpoint:`, e);
  }
};
