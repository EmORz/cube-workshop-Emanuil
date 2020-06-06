module.exports = {
    development: {

        //port: 'mongodb://localhost:27017/CubicEmo1'
         port: process.env.PORT || 3000,
         databaseUrl: `mongodb+srv://user:123@softuniemo-q41wx.mongodb.net/cubicle?retryWrites=true&w=majority`
        //connectionString: 'mongodb://localhost:27017/SoftUniWikiEmo',
    },
    production: {}
};