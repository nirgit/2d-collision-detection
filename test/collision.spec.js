describe('foo', function() {
  it('should', function() {
    var groupA = [{x: 5, y: 58}, {x: 97, y: 15}, {x: 20, y: 201}, {x: 152, y: 152}];
    var groupB = [{x: 65, y: 58}, {x: 27, y: 25}, {x: 120, y: 241}, {x: 52, y: 192}, {x: 170, y: 40}];
    var gridWidth = 200;
    var gridHeight = 300;
    var factor = 2;
    var cb = function() {};


    expect(handleCollision(groupA, groupB, gridWidth, gridHeight, factor, cb)).toBe(2);
  });
});
