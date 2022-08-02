import axios from 'axios'

export const axiosClient = () => {
	const url = () => {
		if (process.env.VERCEL_URL) {
			return `https://${process.env.VERCEL_URL}`
		}
		return `http://localhost:${process.env.PORT || 3000}`
	}
	return axios.create({ baseURL: url() })
}
