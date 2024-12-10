const alt = require("alt-server");
const config = require("./config");

let claimedDays = {}; // Speichert, welche Spieler an welchem Tag das Geschenk erhalten haben

alt.on("playerConnect", (player) => {
    if (!claimedDays[player.id]) claimedDays[player.id] = [];
});

alt.onClient("advent:claimGift", (player) => {
    const today = new Date().getDate(); // Heutiger Tag
    const rewards = config.calendarRewards[today];

    if (!rewards) {
        player.notify("Heute gibt es kein Geschenk!");
        return;
    }

    if (claimedDays[player.id].includes(today)) {
        player.notify("Du hast dein heutiges Geschenk bereits erhalten!");
        return;
    }

    // Geschenk dem Spieler geben
    claimedDays[player.id].push(today);
    player.notify(`Du hast das Geschenk des Tages erhalten: ${rewards.item} x${rewards.amount}`);

    // Hier das Item in das Inventar des Spielers hinzufügen
    giveItemToPlayer(player, rewards.item, rewards.amount);
});

// Beispiel-Inventar Funktion (an dein System anpassen)
function giveItemToPlayer(player, item, amount) {
    alt.log(`${player.name} hat ${item} x${amount} erhalten.`);
    // Implementiere hier die Logik, um das Item ins Inventar des Spielers hinzuzufügen.
}

// Befehl: /x-mas
alt.on("playerCommand", (player, command) => {
    const args = command.split(" ");
    if (args[0].toLowerCase() === "x-mas") {
        alt.emitClient(player, "advent:openCalendar");
    }
});
