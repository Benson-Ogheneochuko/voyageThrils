
const key: string | undefined = process.env.APP_EXCHANGERATE_API_COM;
const baseUrl = process.env.APP_EXCHANGERATE_BASEURL;

const exhangeUrl = `${baseUrl}/pair`;

export const convertService = async ({
  base = "USD",
  target = "NGN"
}: {
  base?: string;
  target?: string;
}): Promise<any> => {
  try {
    const options: RequestInit = {
      method: "GET",
      headers: { Authorization: `Bearer ${key}` }
    };
    const response = await fetch(`${exhangeUrl}/${base}/${target}`, options);
    if (!response.ok) {
      throw new Error('Http error! status: '+ response)
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error converting currency: ", error);
    throw error;
  }
};
