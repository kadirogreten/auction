
module.exports = (socket) => {
    console.log(socket.id + " connected!");

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
        console.log(socket.id + ' disconnected');
    });
};