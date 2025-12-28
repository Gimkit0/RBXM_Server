export default async function handler(req, res) {
    const assetId = req.query.id;
    if (!assetId) return res.status(400).send("Missing id");

    const url = `https://assetdelivery.roproxy.com/v1/asset/?id=${assetId}`;
    const response = await fetch(url);

    if (!response.ok) {
        return res.status(response.status).send("Failed");
    }

    const buffer = Buffer.from(await response.arrayBuffer());

    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader(
        "Content-Disposition",
        `attachment; filename="${assetId}.rbxm"`
    );

    res.send(buffer);
}
