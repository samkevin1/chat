import Pusher from 'pusher';

const pusher = new Pusher({
  appId: "1141747",
  key: "f92e5f8212276c96294f",
  secret: "84102fb0f3c0bf7aa118",
  cluster: "us2",
  useTLS: true
});

export default pusher;