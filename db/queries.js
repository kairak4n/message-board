const pool = require('./pool')

async function getAllMessages() {
    const { rows } = await pool.query("SELECT * FROM messages")
    return rows;
}

async function addMessage(message) {
    const values = [message.text, message.user, message.added]
    await pool.query("INSERT INTO messages (text, username, added) VALUES ($1, $2, $3)", [...values])
}

process.on('SIGINT', async () => {
    console.log('Shutting down server...');
    try {
        // End the pool gracefully
        await pool.end();
        console.log('PostgreSQL pool closed');
        process.exit(0); // Exit the process
    } catch (error) {
        console.error('Error while closing the pool:', error);
        process.exit(1); // Exit with error code if the pool fails to close
    }
});

process.on('SIGTERM', async () => {
    console.log('Shutting down server...');
    try {
        await pool.end();
        console.log('PostgreSQL pool closed');
        process.exit(0); // Exit the process
    } catch (error) {
        console.error('Error while closing the pool:', error);
        process.exit(1);
    }
});

module.exports = {
    getAllMessages,
    addMessage,
}