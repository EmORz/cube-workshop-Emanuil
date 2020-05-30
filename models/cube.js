// •	Id - number
// •	Name – string
// •	Description – string
// •	Image URL – string
// •	Difficulty Level– number
const { v4 } = require("uuid");
const fs = require("fs")
const path = require('path')
const databaseFile = path.join(__dirname,"..","config/database.json")

class Cube {
  constructor(name, description, imageURL, difficulty) {
    this.id = v4();
    this.name = name || "No name"
    this.description = description
    this.imageURL=imageURL || "placeholder"
    this.difficulty = difficulty || 0

  }

  save(){
    const newCube = {
      id: this.id,
      name: this.name,
      description: this.description,
      imageURL:this.imageURL,
      difficulty: this.difficulty
    }

    fs.readFile(databaseFile, (err, dbData)=>{
      if (err) {
        throw err
      }
      const cubes = JSON.parse(dbData);
      
      cubes.push(newCube)
     

      fs.writeFile(databaseFile, JSON.stringify(cubes),(err)=>{
        if (err) {
          throw error
        }
        console.log("New cube was stored! OK :)")
      })
    })
   
      
  }
}

module.exports = Cube
