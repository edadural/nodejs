const express = require("express");
const app = express();
require("./db/mongoose.js");
const UserActivation = require("./models/user");

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`sunucu çalışıyor,port num: `, port);
});
app.use(express.json());

app.post("/users", (req, res) => {
  // console.log(req,body)
  // res.send('Test')

  const UserActivation = new UserActivation(req.body);
  User.save()
    .then(() => {
      res.status(201).send(UserActivation);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

//development:kodun geliştirildiği

//production : kodun gönderildiği son kullanıcıya erişildiği : bulut
