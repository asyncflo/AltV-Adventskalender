const alt = require("alt-client");

alt.onServer("advent:openCalendar", () => {
    const today = new Date().getDate();

    alt.emitServer("advent:claimGift");
    alt.log(`Du hast dein Geschenk für den ${today}. Dezember abgeholt!`);
});
