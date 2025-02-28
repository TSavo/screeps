var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
			var sourceNum =
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
			else {
				var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
				if(targets.length) {
					Memory.numHarvesters -= 1;
					creep.memory.role = 'builder';
					Memory.numBuilders += 1;
					return;
				}
				else {
					Memory.numHarvesters -= 1;
					creep.memory.role = 'upgrader';
					Memory.numUpgraders += 1;
					return;
				}
			}
        }
    }
};

module.exports = roleHarvester;