import prisma from "../../../../prisma/db"
async function shortenUrl(originalUrl: string) {
	try {
		const url = await prisma.urls.create({
			data: {
				shortUrl: "",
				originalUrl: originalUrl,
				id_: 0,
			},
		})

		const shortUrl = base62(Number(url.id_))
		await prisma.urls.update({
			where: { id: url.id },
			data: { shortUrl: shortUrl },
		})
		return shortUrl
	} catch {
		throw new Error("Could not shorten the URL!")
	}
}

// minimum num(db id) -> 1000000
function base62(num: number) {
	const base62: string =
		"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
	const result = []
	let rem
	while (num) {
		rem = num % 62
		num = Math.floor(num / 62)
		result.push(base62[rem])
	}
	result.reverse()
	return result.join("")
}

export default shortenUrl

export { base62 }
