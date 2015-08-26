describe('WatchController', function(){

  it('should have a scope var with the title', function() {
    var scope = {},
        ctrl = new WatchController(scope);

    expect(scope.title).toBe("Stopwatch App");
  });

});