var settingsProfiler = require('settings.profiler');

module.exports = {
  scout(creep){
    if(creep.room.name === creep.memory.target_room){
      var room_profile = Memory.room_profile ? Memory.room_profile.filter(function(find_room){return find_room.room_id == creep.room.name}) : undefined;
      if(room_profile.length === 0) {
        settingsProfiler.room_profile(creep,creep.room,creep.memory.base_id);
        console.log('Scout creep is adding new profile for room ' + creep.room.name);
      }

      if(creep.memory.moveto_length++ < 5) creep.moveTo(creep.room.controller);
    }
  	else {
      creep.memory.moveto_length = 0;
  	  var targetPos = new RoomPosition(25, 25, creep.memory.target_room);
      creep.moveTo(targetPos);
  	}
  },
  add_scout_room(room_name, base_id_index) {
    if(Memory.room_scout_queue === undefined) Memory.room_scout_queue = [];
    Memory.room_scout_queue.push(
      {
        target_room : room_name,
        base_id : base_id_index
      });
    console.log('Adding room ' + room_name + ' to scout queue, from base ' + base_id_index + '.');
  }
}
