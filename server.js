const base = require('./src/airtable');

const getProfile = async () => {
  let profileList = [];
  return new Promise((resolve, reject) => {
    base('Profile').select({
      maxRecords: 100,
      pageSize: 10,
      view: "Danh sách đầy đủ"
    }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record) {
        console.log('Retrieved', record.get('full_name'));
        const profile = {
          full_name: record.get('full_name'),
          birthday: record.get('birthday')
        }
        profileList.push(profile);
      });
      fetchNextPage();
    }, function done(err) {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(profileList);
      }
    });
  })
}

// where your node app starts

// init project
const express = require('express');
const cors = require('cors');
const app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

app.use(cors());

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/profiles', async function(request, response) {
  const profiles = await getProfile();
  response.json(profiles);
})
// Hello
// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
