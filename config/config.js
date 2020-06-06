module.exports = {
    development: {

        //port: 'mongodb://localhost:27017/CubicEmo1'
         port: process.env.PORT || 3000
        //connectionString: 'mongodb://localhost:27017/SoftUniWikiEmo',
    },
    production: {}
};