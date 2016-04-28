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
  var j = Math.floor(element.x / bucketDimension.w);
  var i = Math.floor(element.y / bucketDimension.h);

  var bucket = gridBuckets[j + i * factor];
  bucket[type].push(element);
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
  factor = Math.max(Math.round(factor) || 1, 2);
  collisionHandleCB = collisionHandleCB || noop;

  var squareDim = {w: gridWidth / factor, h: gridHeight / factor};
  var gridBuckets = getGridBuckets(squareDim, factor);

  var groupAMatcher = setToMatchingGridBucket.bind(null, squareDim, factor, gridBuckets, 'groupA');
  var groupBMatcher = setToMatchingGridBucket.bind(null, squareDim, factor, gridBuckets, 'groupB');

  groupA.forEach(groupAMatcher);
  groupB.forEach(groupBMatcher);

  gridBuckets.forEach(function(bucket) {
    console.log('x = ' + bucket.x + ', y = ' + bucket.y);
    console.log('groupA = ' + bucket.groupA.reduce(function(a, v) {return a + ' (' + v.x + ',' + v.y + ')';}, ''));
    console.log('groupB = ' + bucket.groupB.reduce(function(a, v) {return a + ' (' + v.x + ',' + v.y + ')';}, ''));
  });
}
