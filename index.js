const app = require("./app");
const PORT = process.env.PORT || 5060;
app.listen(PORT, function () {
    console.log(`App Running at ${PORT}`);
});
