class Rover {
   // Write code here!
  constructor(position) {
    this.position = position;
    this.mode = "NORMAL";
    this.generatorWatts = 110;
  }

  receiveMessage(messageObject) {

    let messageName = messageObject.name;
    let returnObject = {};
    returnObject["message"] = messageName;
    
    let resultArray = []
    let resultObject = {}
    for (let i=0; i < messageObject.commands.length; i++){
      if (messageObject.commands[i].commandType === "STATUS_CHECK") {
        resultObject["completed"] = true;
        resultObject["roverStatus"] = {
          position: this.position,
          mode: this.mode,
          generatorWatts: this.generatorWatts
        }
        resultArray.push(resultObject);
      } else if (messageObject.commands[i].commandType === "MODE_CHANGE") {
        resultObject["completed"] = true;
        this.mode = messageObject.commands[i].value
        resultArray.push(resultObject);
      }
    }
    returnObject["results"] = resultArray
    return returnObject
  }
}

module.exports = Rover;