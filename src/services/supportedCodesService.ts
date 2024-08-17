
const key: string | undefined = process.env.APP_EXCHANGERATE_API_COM;
const baseUrl = process.env.APP_EXCHANGERATE_BASEURL;
const supportedCodesUrl = `${baseUrl}/codes`

export const supportedCodesService = async ()=>{
	try {
		const options: RequestInit = {
			method: "GET",
			headers: {Authorization: `Bearer ${key}`}
		}

		const response = await fetch( supportedCodesUrl, options)
		if (!response.ok) {
			throw new Error('Http error! status: '+ response)
		}
		const data = await response.json()
		return data['supported_codes']
	} catch (error) {
		console.error(error)
	}
}