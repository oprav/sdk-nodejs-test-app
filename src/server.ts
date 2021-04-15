const express = require('express');
const app = new express();

import {Client} from '@okta/okta-sdk-nodejs';
import { Application } from '@okta/okta-sdk-nodejs/src/types/models/Application';

const client: Client = new Client({
  orgUrl:'https://dev-org.oktapreview.com',
  token: '',
});



app.get('/logs', (req: any, res: any) => {
  try {
    const logEvents = client.getLogs({
      since: '2021-03-11'
    });
  } catch (err) {
  console.log(err);
  }
});


app.get('/application/:id', async (req: any, res: any) => {
  const app: Application = await client.getApplication(req.params.id);
  if (app) {
    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify(app, null, 4));
  }
});

app.listen(8081, () => {
  console.log('up and running on 8081')
});
