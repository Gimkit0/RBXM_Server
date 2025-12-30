export default async function handler(req, res) {
    const { id } = req.query;

    if (!id || isNaN(id)) {
        return res.status(400).send("Invalid asset id");
    }

    const url = new URL("https://assetdelivery.roproxy.com/v1/asset/");
    url.searchParams.set("id", id);

    try {
        const response = await fetch(url.toString());

        if (!response.ok) {
            return res.status(response.status).send("Failed to fetch asset");
        }

        const buffer = Buffer.from(await response.arrayBuffer());

        res.setHeader("Content-Type", "application/octet-stream");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${id}.rbxm"`
        );

        res.status(200).send(buffer);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}
