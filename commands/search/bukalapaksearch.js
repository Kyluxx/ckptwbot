const {
    quote
} = require("@mengkodingan/ckptw");
const axios = require("axios");

module.exports = {
    name: "bukalapaksearch",
    aliases: ["bukalapak", "bukalapaks"],
    category: "search",
    permissions: {
        coin: 10
    },
    code: async (ctx) => {
        const input = ctx.args.join(" ") || null;

        if (!input) return await ctx.reply(
            `${quote(tools.cmd.generateInstruction(["send"], ["text"]))}\n` +
            quote(tools.cmd.generateCommandExample(ctx.used, "evangelion"))
        );

        try {
            const apiUrl = tools.api.createUrl("agatz", "/api/bukalapak", {
                message: input
            });
            const result = (await axios.get(apiUrl)).data.data;

            const resultText = result.map((r) =>
                `${quote(`Nama: ${r.title}`)}\n` +
                `${quote(`Rating: ${r.rating}`)}\n` +
                `${quote(`Terjual: ${r.terjual}`)}\n` +
                `${quote(`Harga: ${r.harga}`)}\n` +
                `${quote(`Toko: ${r.store.nama} - ${r.store.lokasi} (${r.store.link})`)}\n` +
                `${quote(`URL: ${r.link}`)}`
            ).join(
                "\n" +
                `${quote("─────")}\n`
            );
            return await ctx.reply(
                `${resultText}\n` +
                "\n" +
                config.msg.footer
            );
        } catch (error) {
            return await tools.cmd.handleError(ctx, error, true);
        }
    }
};