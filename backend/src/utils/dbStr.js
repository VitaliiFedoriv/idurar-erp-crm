const user = encodeURIComponent(process.env.DB_USER);
const pass = encodeURIComponent(process.env.DB_PASS);
const cluster = encodeURIComponent(process.env.DB_CLASSTER);

exports.dbUrl = `mongodb+srv://${user}:${pass}@${cluster}/?retryWrites=true&w=majority&appName=vitalii`;
