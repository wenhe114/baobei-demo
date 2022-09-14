<template>
  <div>
    socket
  </div>
</template>
<script>
import io from "weapp.socket.io";
export default {
  name: "socket-io",
  cname: "socket",
  mounted() {
    const socket = io("https://base-ws.hi-he.com/socket.io/?vendorId=1997&storeCode=ST03740033&memberCode=12147483647&EIO=3&transport=websocket");
    console.log('socketsocketsocketsocketsocket',socket);
    socket.on("connect", () => {
      console.log("connection created.链接成功");
    });

    socket.on("new message", (d) => {
      const { username, message } = d;
      console.log("received: ", username, message);
    });

    socket.emit("add user", "Jack");
  },
};
</script>