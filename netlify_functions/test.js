const axios = require("axios");
exports.handler = function(event, context, callback) {
  // your server-side functionality
  axios({
    method: "post",
    url: "http://localhost:9000/",
    data: { name: "James" },
  })
    .then(response => {
      console.log(response);
      callback(null, {
        statusCode: 2000,
        body: process.env.GREETING,
      });
    })
    .catch(err => {
      console.log(err);
      callback(new Error("Something went wrong"));
    });
};
