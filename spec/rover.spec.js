const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!


it("constructor sets position and default values for mode and generatorWatts", function() {
  let testRover = new Rover(55555);
  expect(testRover.position)
    .toEqual(55555);
  expect(testRover.mode)
    .toEqual("NORMAL");
  expect(testRover.generatorWatts)
    .toEqual(110);
    
});


it("response returned by receiveMessage contains name of message", function() {
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  let message = new Message('Test message with two commands', commands);
  let rover = new Rover(55555)
  let response = rover.receiveMessage(message);
  expect(response.message).toEqual('Test message with two commands')
})

it("response returned by receiveMessage including two results if two commands are sent in the message", function() {
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  let message = new Message('Test message with two commands', commands);
  let rover = new Rover(98382);
  let response = rover.receiveMessage(message);
  expect(response.results.length).toEqual(2);

})

it("responds correctly to status check command", function() {
  let commands = [new Command('STATUS_CHECK')];
  let message = new Message('Test message with STATUS_CHECK command', commands);
  let rover = new Rover(98382);
  let response = rover.receiveMessage(message);
  
  expect(response.results[0].roverStatus.position).toEqual(98382);
  expect(response.results[0].roverStatus.mode).toEqual("NORMAL");
  expect(response.results[0].roverStatus.generatorWatts).toEqual(110);
})
})