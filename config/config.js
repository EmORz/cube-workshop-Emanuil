require('dotenv').config()



module.exports = {
    development: {

        //port: 'mongodb://localhost:27017/CubicEmo1'
         port: process.env.PORT,
         
         databaseUrl: `mongodb+srv://user:${process.env.PASS}@softuniemo-q41wx.mongodb.net/cubicle?retryWrites=true&w=majority`
        //connectionString: 'mongodb://localhost:27017/SoftUniWikiEmo',
    },
    production: {}
};