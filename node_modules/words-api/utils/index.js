const isDev = () => {
    return process.env.IS_DEV ? true : false;
}

module.exports = {
    isDev
}