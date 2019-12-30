const raspi = require('raspi-io').RaspiIO;
const five = require('johnny-five');
const https = require('https');
const ifttt = require('./iftttConfig');

// Configure the Raspberry Pi with Johhny Five
const board = new five.Board({io: new raspi()});

const onOptions = {
   hostname: ifttt.config.on.hostname,
   port: ifttt.config.on.port,
   path: ifttt.config.on.path,
   method: ifttt.config.on.method
};

const offOptions = {
   hostname: ifttt.config.off.hostname,
   port: ifttt.config.off.port,
   path: ifttt.config.off.path,
   method: ifttt.config.off.method,
};

// Connect to the motion sensor when the board is ready
board.on('ready', function() {
  const motion = new five.Motion('7');
  motion.on('change', function() {
    console.log('sensed change');

    const photoresistor = new five.Sensor.Digital(0);
    photoresistor.on('change', () => {
      const isLight = photoresistor.boolean;
      if (!isLight) {
       const turnOnReq = https.request(onOptions, res => {
          res.on('data', d => {
            console.log('data from turning on lights: ', d);
          });

         res.on("error", err => {
           console.log('Error: ' + err.message);
         });
       });

       turnOnReq.end();
     } else {
       const turnOffReq = https.request(offOptions, res => {
         res.on('data', d => {
           console.log('data from turning off lights: ', d);
         });

        res.on('error', err => {
          console.log('Error: ' + err.message);
        });
      });

      turnOffReq.end();
     }
    });
  });
});
