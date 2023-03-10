let users = {}

const addUser = (userId, socketId) => {
    users[userId] = {
        socket_id: socketId
    }
}

const removeUser = (socketId) => {
    for (let key in users) {
        var user = users[key]

        if (users[key].socket_id == socketId) {
            delete users[key]
            break
        }
    }

    console.log("Client disconnected ", users)
}

const getUser = (userId) => {
}

const findUser = (socketId) => {
    for (let key in users) {
        if (users[key].socket_id == socketId) {
            return key
        }
    }
}

module.exports = (io) => {
    io.on("connection", (socket) => {
        socket.on("disconnect", () => {
            const userId = findUser(socket.id)
            socket.broadcast.emit("socket:user-disconnect", userId)

            removeUser(socket.id)
            // io.emit("socket:all-users", users)
        });

        socket.on("socket:add-user", userId => {
            if (!users.hasOwnProperty(userId)) {
                addUser(userId, socket.id)
                io.to(socket.id).emit("socket:login")
                socket.broadcast.emit("socket:new-user", userId)
                // io.emit("socket:all-users", users)
            }
            else if (users.hasOwnProperty(userId)) {
                removeUser(socket.id)
                io.to(socket.id).emit("socket:alrealdy-login")
            }

            console.log("Client connected ", users)
        })

        socket.on("socket:start-conversation", values => {
            values.participants.map((participantKey, i) => {
                if (participantKey != values.user_id) {
                    if (users.hasOwnProperty(participantKey)) {
                        io.to(users[participantKey].socket_id).emit("socket:receive-conversation", values.user_id)
                    }
                }
            })
        })

        socket.on("socket:delete-conversation", (participants, userId) => {
            participants.map((participantKey, i) => {
                if (participantKey != userId) {
                    if (users.hasOwnProperty(participantKey)) {
                        io.to(users[participantKey].socket_id).emit("socket:receive-delete-conversation", userId)
                    }
                }
            })
        })

        socket.on("socket:send-message", (values) => {
            values.participants.map((participantKey, i) => {
                if (participantKey != values.message_data.user_id._id) {
                    if (users.hasOwnProperty(participantKey)) {
                        io.to(users[participantKey].socket_id).emit("socket:receive-message", values)
                    }
                }
            })
        })
    })
}