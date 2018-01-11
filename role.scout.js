module.exports = {
  evaluate_room(creep){
    if(creep.room.name === creep.memory.scout_room){
      var room_profile = Memory.room_profile ? Memory.room_profile.filter(function(find_room){return find_room.room_home_base == Memory.base_profile[i].base_index}) : [];
      if(room_profile.length === 0) {
        settingsProfiler.room_profile(creep.memory.scout_room,creep.memory.base_id);
      }
      creep.moveTo(creep.room.controller);
    }
  	else {
  	    var targetPos = new RoomPosition(25, 25, Memory.attackRoomID_1);
          var result = creep.moveTo(targetPos);
  	}
  }
}
