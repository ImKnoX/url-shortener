const prisma = require("../utils/db");
const randID = require("../utils/rand");

/**
 * The function `getOneSlug` retrieves a single URL slug from the database using its ID.
 * @param id - The `id` parameter in the `getOneSlug` function is used to specify the unique identifier
 * of the URL that you want to retrieve from the database.
 * @returns The `getOneSlug` function is returning the data object fetched from the Prisma database
 * using the `findUnique` method with the provided `id`.
 */
async function getOneSlug(slug) {
    const data = await prisma.url.findFirst({
        where: {
            slug
        }
    })
    return data;
}

/**
 * The function `createSlug` creates a new entry in a database table with a unique slug ID, URL, and
 * custom slug.
 * @param data - The `data` parameter in the `createSlug` function contains an object with two
 * properties: `url` and `slug`. These properties are used to create a new entry in the database using
 * Prisma. The `url` property represents the URL that will be shortened, and the `slug`
 * @returns The `createSlug` function is returning the results of creating a new URL record in the
 * database using Prisma. The function generates a unique `slug_id` using `nanoid()` and saves the
 * provided `url` and `slug` in the database. The `results` variable contains the response from the
 * database operation, which is then returned by the function.
 */
async function createSlug(data) {
    const { url } = data;
    const results = await prisma.url.create({
        data: {
            slug: randID(24),
            url
        }
    })
    return results
}

module.exports = {
    getOneSlug,
    createSlug
}