import shortenUrl, { base62 } from "@/app/lib/utilities/url"
import { describe } from "node:test"

describe("tests url utilities", () => {
	it("shortens a url", () => {
		const dbId: number = 1000000
		expect(base62(dbId)).toBe("4c92")
	})
	it("shortens a url (in db)", () => {
		const urlToShorten = "https://www.google.com"
		expect(shortenUrl(urlToShorten)).not.toBeNull()
	})
})
