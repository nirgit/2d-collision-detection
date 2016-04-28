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
    var gridWidth = 100000;
    var gridHeight = 300000;

    var groupA = createRandomGroup(50000, gridWidth, gridHeight);
    var groupB = createRandomGroup(10000, gridWidth, gridHeight);

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


    var DIV_FACTOR = 10;
    var collisions = [];
    var cb = function(objA, objB) {
      collisions.push({a: objA, b: objB});
    };

    var start = Date.now();
    handleCollision(groupA, groupB, gridWidth, gridHeight, DIV_FACTOR, cb);
    var end = Date.now();
    console.log('total time:' + (end-start) + 'ms');
    console.log('amount of collisions is:' + collisions.length);
  });
});
