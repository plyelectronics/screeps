module.exports = {
  scout_room(creep){
    if(creep.room.name === creep.memory.scout_room){
      var room_profile = Memory.room_profile ? Memory.var room_profile = Memory.room_profile ?
        Memory.room_profile.filter(function(find_room){return (find_room.room_home_base == Memory.base_profile[i].base_index) &&
        (find_room.room_id == creep.memory.scout_room)}) :
        [];
      if(room_profile.length === 0) {
        settingsProfiler.room_profile(creep.memory.scout_room,creep.memory.base_id);
        console.log('Scout creep is adding new profile for room ' + creep.memory.scout_room);
      }

      if(creep.memory.moveto_length++ < 5) creep.moveTo(creep.room.controller);
    }
  	else {
      creep.memory.moveto_length = 0;
  	  var targetPos = new RoomPosition(25, 25, creep.memory.scout_room);
      creep.moveTo(targetPos);
  	}
  }
}
