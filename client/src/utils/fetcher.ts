export const fetcher = async (
  url: string,
  requestParams: RequestInit | undefined = {},
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const response = await fetch(url, requestParams);

  if (!response.ok) {
    const { status } = response;
    const message = await response.text();
    alert(`${status} : ${message}`);
    return;
  }
  return await response.json();
};
