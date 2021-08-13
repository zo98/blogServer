const schedule = require("node-schedule");
const { clearImgs } = require("../utils/clearFiles");
function scheduleCronstyle() {
  setTimeout(() => {
    schedule.scheduleJob("00 0 * * * *", () => {
      clearImgs();
    });
    clearImgs()
  },6000);
}
scheduleCronstyle();
