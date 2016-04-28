function createRandomGroup(numberOfObjs, maxW, maxH) {
  var group = [];
  for (var i = 0 ; i < numberOfObjs; i++) {
    var randX = Math.floor(Math.random() * maxW);
    var randY = Math.floor(Math.random() * maxH);
    group.push({x: randX, y: randY});
  }
  return group;
}


describe('foo', function() {
  it('should', function() {
    var gridWidth = 10000;
    var gridHeight = 10000;

    var groupA = createRandomGroup(5000, gridWidth, gridHeight);
    var groupB = createRandomGroup(4000, gridWidth, gridHeight);

    var groupAObjDims = {w: 4, h: 10};
    var groupBObjDims = {w: 25, h: 25};

    groupA = groupA.map(function(objA) {
      objA.x -= (groupAObjDims.w / 2);
      objA.y -= (groupAObjDims.h / 2);
      objA.w = groupAObjDims.w;
      objA.h = groupAObjDims.h;
      return objA;
    });

    groupB = groupB.map(function(objB) {
      objB.x -= (groupBObjDims.w / 2);
      objB.y -= (groupBObjDims.h / 2);
      objB.w = groupBObjDims.w;
      objB.h = groupBObjDims.h;
      return objB;
    });


    var factor = 5;
    var collisions = [];
    var cb = function(objA, objB) {
      collisions.push({a: objA, b: objB});
      // console.log('collision: ' + JSON.stringify(objA) + ' | ' + JSON.stringify(objB));
    };

    var start = Date.now();
    handleCollision(groupA, groupB, gridWidth, gridHeight, factor, cb);
    var end = Date.now();
    console.log('total time:' + (end-start) + 'ms');
  });
});
