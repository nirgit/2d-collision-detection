'use strict';

function noop() {}

function getGridBuckets(squareDim, factor) {
  var squares = [];
  for (var i = 0; i < factor; i++) {
    for(var j = 0; j < factor; j++) {
      squares.push({
        x: j * squareDim.w,
        y: i * squareDim.h,
        groupA: [],
        groupB: []
      });
    }
  }
  return squares;
}

function setToMatchingGridBucket(bucketDimension, factor, gridBuckets, type, element) {
  var j = Math.max(0, Math.floor(element.x / bucketDimension.w));
  var i = Math.max(0, Math.floor(element.y / bucketDimension.h));

  var bucket = gridBuckets[j + i * factor];
  bucket[type].push(element);
}

function handleCollisionInBucket(collisionHandleCB, gridBucket) {
  var groupA = gridBucket.groupA;
  var groupB = gridBucket.groupB;
  groupA.sort(byX);
  groupB.sort(byX);

  for (var i = 0; i < groupA.length; i++) {
    var objA = groupA[i];
    for (var j = 0; j < groupB.length; j++) {
      var objB = groupB[j];
      if ((objB.x >= objA.x && objB.x <= objA.x + objA.w &&
          objB.y >= objA.y && objB.y <= objA.y + objA.h) ||
          (objA.x >= objB.x && objA.x <= objB.x + objB.w &&
              objA.y >= objB.y && objA.y <= objB.y + objB.h)) {
            collisionHandleCB(objA, objB);
          }
    }
  }
}

function byX(obj1, obj2) {
  return Math.sign(obj1.x - obj2.x);
}

/**
  *
  */
function handleCollision(groupA, groupB, gridWidth, gridHeight, factor, collisionHandleCB) {
  if (!gridWidth || gridWidth <= 0 || !gridHeight || gridHeight <= 0) {
    throw new Error('Grid dimensions must be valid and non-negative');
  }
  groupA = groupA || [];
  groupB = groupB || [];
  factor = Math.max(Math.round(factor) || 1, 1);
  collisionHandleCB = collisionHandleCB || noop;

  var squareDim = {w: gridWidth / factor, h: gridHeight / factor};
  var gridBuckets = getGridBuckets(squareDim, factor);

  var groupAMatcher = setToMatchingGridBucket.bind(null, squareDim, factor, gridBuckets, 'groupA');
  var groupBMatcher = setToMatchingGridBucket.bind(null, squareDim, factor, gridBuckets, 'groupB');

  groupA.forEach(groupAMatcher);
  groupB.forEach(groupBMatcher);

  gridBuckets.forEach(handleCollisionInBucket.bind(null, collisionHandleCB));

  // gridBuckets.forEach(function(bucket) {
  //   console.log('x = ' + bucket.x + ', y = ' + bucket.y);
  //   console.log('groupA = ' + bucket.groupA.reduce(function(a, v) {return a + ' (' + v.x + ',' + v.y + ')';}, ''));
  //   console.log('groupB = ' + bucket.groupB.reduce(function(a, v) {return a + ' (' + v.x + ',' + v.y + ')';}, ''));
  // });
}
