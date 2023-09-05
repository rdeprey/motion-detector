# Motion Detector

Call an [IFTTT endpoint](https://ifttt.com/) based on input from a motion detector sensor and photoresistor attached to a Raspberry Pi. The script will trigger a different IFTTT endpoint based on whether motion is detected and whether the photoresistor detects light.

This repo assumes that you are using:

- A PIR motion sensor
- A photoresistor sensor
- A Raspberry Pi (the script is configured to use the `raspi` package for accessing the GPIO pins)

To run this code, you need to also have an IFTTT account.

## Configuration Files

You need one configuration file called `iftttConfig.js` in your project's root directory. It should look like the following:

```js
export default config = {
  on: {
    hostname: 'maker.ifttt.com',
    port: 443,
    path: 'Webhook Endpoint with your Service Key',
    method: 'POST or GET'
  }
};
```

This script uses [IFTTT's Webhook Integrations](https://ifttt.com/maker_webhooks). After you connect your IFTTT account to the Webhooks applet, you will get a service key and instructions on how to create your webhook. All of the values that you need for the configuration file will be available in IFTTT through the Webhook applet's documentation.

## Hardware Setup

The script expects the following sensor setup with the Raspberry Pi.

| Sensor               | Raspberry Pi Pin |
| -------------------- | ---------------- |
| PIR Motion Sensor    | Pin 7            |
| Photoresistor Sensor | Pin 0            |
