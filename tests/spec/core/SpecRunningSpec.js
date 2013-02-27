describe("jasmine spec running", function () {
  var env;
  var fakeTimer;

  beforeEach(function() {
    env = new jasmine.Env();
    env.updateInterval = 0;

  });

  it('should assign spec ids sequentially', function() {
    var it0, it1, it2, it3, it4;
    env.describe('test suite', function() {
      it0 = env.it('spec 0', function() {
      });
      it1 = env.it('spec 1', function() {
      });
      it2 = env.xit('spec 2', function() {
      });
      it3 = env.it('spec 3', function() {
      });
    });
    env.describe('test suite 2', function() {
      it4 = env.it('spec 4', function() {
      });
    });

    expect(it0.id).toEqual(0);
    expect(it1.id).toEqual(1);
    expect(it2.id).toEqual(2);
    expect(it3.id).toEqual(3);
    expect(it4.id).toEqual(4);
  });

  it("should build up some objects with results we can inspect", function() {

    var specWithNoBody, specWithExpectation, specWithFailingExpectations, specWithMultipleExpectations;

    var suite = env.describe('default current suite', function() {
      specWithNoBody = env.it('new spec');

      specWithExpectation = env.it('spec with an expectation').runs(function () {
        var foo = 'bar';
        this.expect(foo).toEqual('bar');
      });

      specWithFailingExpectations = env.it('spec with failing expectation').runs(function () {
        var foo = 'bar';
        this.expect(foo).toEqual('baz');
      });

      specWithMultipleExpectations = env.it('spec with multiple expectations').runs(function () {
        var foo = 'bar';
        var baz = 'quux';

        this.expect(foo).toEqual('bar');
        this.expect(baz).toEqual('quux');
      });
    });

    suite.execute();

    expect(specWithNoBody.description).toEqual('new spec');

    expect(specWithExpectation.results().getItems().length).toEqual(1); // "Results aren't there after a spec was executed"
    expect(specWithExpectation.results().getItems()[0].passed()).toEqual(true); // "Results has a result, but it's true"
    expect(specWithExpectation.results().description).toEqual('spec with an expectation'); // "Spec's results did not get the spec's description"

    expect(specWithFailingExpectations.results().getItems()[0].passed()).toEqual(false); // "Expectation that failed, passed"

    expect(specWithMultipleExpectations.results().getItems().length).toEqual(2); // "Spec doesn't support multiple expectations"
  });

  it("should work without a runs block", function() {
    var another_spec;
    env.describe('default current suite', function() {
      another_spec = env.it('spec with an expectation', function () {
        var foo = 'bar';
        this.expect(foo).toEqual('bar');
        this.expect(foo).toEqual('baz');
      });
    });

    another_spec.execute();
    another_spec.done = true;

    expect(another_spec.results().getItems().length).toEqual(2);
    expect(another_spec.results().getItems()[0].passed()).toEqual(true); // "In a spec without a run block, expected first expectation result to be true but was false"
    expect(another_spec.results().getItems()[1].passed()).toEqual(false); // "In a spec without a run block, expected second expectation result to be false but was true";
    expect(another_spec.results().description).toEqual('spec with an expectation'); // "In a spec without a run block, results did not include the spec's description";
  });

  it("testSpecAfter", function() {
    var log = "";
    var spec;
    var suite = env.describe("has after", function() {
      spec = env.it('spec with after', function() {
        this.runs(function() {
          log += "spec";
        });
      });
    });
    spec.after(function() {
      log += "after1";
    });
    spec.after(function() {
      log += "after2";
    });

    suite.execute();

    expect(log).toEqual("specafter2after1");
  });

  describe('test suite declaration', function() {
    var suite;
    var dummyFunction = function() {
    };

    it('should give the suite a description', function() {
      suite = env.describe('one suite description', dummyFunction);
      expect(suite.description).toEqual('one suite description');
    });

  });

  it("testBeforeAndAfterCallbacks", function () {
    var suiteWithBefore = env.describe('one suite with a before', function () {

      this.beforeEach(function () {
        this.foo = 1;
      });

      env.it('should be a spec', function () {
        this.runs(function() {
          this.foo++;
          this.expect(this.foo).toEqual(2);
        });
      });

      env.it('should be another spec', function () {
        this.runs(function() {
          this.foo++;
          this.expect(this.foo).toEqual(2);
        });
      });
    });

    suiteWithBefore.execute();

    var suite = suiteWithBefore;

    expect(suite.results().getItems()[0].passed()).toEqual(true); // "testBeforeAndAfterCallbacks: the first spec's foo should have been 2");
    expect(suite.results().getItems()[1].passed()).toEqual(true); // "testBeforeAndAfterCallbacks: the second spec's this.foo should have been 2");


    var foo = 1;
    var suiteWithAfter = env.describe('one suite with an after_each', function () {

      env.it('should be a spec with an after_each', function () {
        this.expect(foo).toEqual(1);
        foo++;
        this.expect(foo).toEqual(2);
      });

      env.it('should be another spec with an after_each', function () {
        this.expect(foo).toEqual(0);
        foo++;
        this.expect(foo).toEqual(1);
      });

      this.afterEach(function () {
        foo = 0;
      });
    });

    suiteWithAfter.execute();

    suite = suiteWithAfter;
    expect(suite.afterEach.length).toEqual(1);
    expect(suite.results().getItems()[0].passed()).toEqual(true);
    expect(suite.results().getItems()[1].passed()).toEqual(true);
    expect(foo).toEqual(0);

  });

  it('nested suites', function () {

    var foo = 0;
    var bar = 0;
    var baz = 0;
    var quux = 0;
    var nested = env.describe('suite', function () {
      env.describe('nested', function () {
        env.it('should run nested suites', function () {
          foo++;
        });
        env.it('should run nested suites', function () {
          bar++;
        });
      });

      env.describe('nested 2', function () {
        env.it('should run suites following nested suites', function () {
          baz++;
        });
      });

      env.it('should run tests following nested suites', function () {
        quux++;
      });
    });

    expect(foo).toEqual(0);
    expect(bar).toEqual(0);
    expect(baz).toEqual(0);
    expect(quux).toEqual(0);
    nested.execute();

    expect(foo).toEqual(1);
    expect(bar).toEqual(1);
    expect(baz).toEqual(1);
    expect(quux).toEqual(1);
  });

  it("testBeforeExecutesSafely", function() {
    var report = "";
    var suite = env.describe('before fails on first test, passes on second', function() {
      var counter = 0;
      this.beforeEach(function() {
        counter++;
        if (counter == 1) {
          throw "before failure";
        }
      });
      env.it("first should not run because before fails", function() {
        this.runs(function() {
          report += "first";
          this.expect(true).toEqual(true);
        });
      });
      env.it("second should run and pass because before passes", function() {
        this.runs(function() {
          report += "second";
          this.expect(true).toEqual(true);
        });
      });
    });

    suite.execute();

    expect(report).toEqual("firstsecond");
    var suiteResults = suite.results();
    expect(suiteResults.getItems()[0].getItems()[0].passed()).toEqual(false);
    expect(suiteResults.getItems()[1].getItems()[0].passed()).toEqual(true);
  });

  it("testAfterExecutesSafely", function() {
    var report = "";
    var suite = env.describe('after fails on first test, then passes', function() {
      var counter = 0;
      this.afterEach(function() {
        counter++;
        if (counter == 1) {
          throw "after failure";
        }
      });
      env.it("first should run, expectation passes, but spec fails because after fails", function() {
        this.runs(function() {
          report += "first";
          this.expect(true).toEqual(true);
        });
      });
      env.it("second should run and pass because after passes", function() {
        this.runs(function() {
          report += "second";
          this.expect(true).toEqual(true);
        });
      });
      env.it("third should run and pass because after passes", function() {
        this.runs(function() {
          report += "third";
          this.expect(true).toEqual(true);
        });
      });
    });

    suite.execute();

    expect(report).toEqual("firstsecondthird"); // "all tests should run");
    //After each errors should not go in spec results because it confuses the count.
    var suiteResults = suite.results();
    expect(suiteResults.getItems().length).toEqual(3, 'testAfterExecutesSafely should have results for three specs');

    expect(suiteResults.getItems()[0].getItems()[0].passed()).toEqual(true, "testAfterExecutesSafely 1st spec should pass");
    expect(suiteResults.getItems()[1].getItems()[0].passed()).toEqual(true, "testAfterExecutesSafely 2nd spec should pass");
    expect(suiteResults.getItems()[2].getItems()[0].passed()).toEqual(true, "testAfterExecutesSafely 3rd spec should pass");

    expect(suiteResults.getItems()[0].getItems()[0].passed()).toEqual(true, "testAfterExecutesSafely 1st result for 1st suite spec should pass");
    expect(suiteResults.getItems()[0].getItems()[1].passed()).toEqual(false, "testAfterExecutesSafely 2nd result for 1st suite spec should fail because afterEach failed");
    expect(suiteResults.getItems()[1].getItems()[0].passed()).toEqual(true, "testAfterExecutesSafely 2nd suite spec should pass");
    expect(suiteResults.getItems()[2].getItems()[0].passed()).toEqual(true, "testAfterExecutesSafely 3rd suite spec should pass");
  });

  it("should permit nested describes", function() {
    var actions = [];

    env.beforeEach(function () {
      actions.push('runner beforeEach');
    });

    env.afterEach(function () {
      actions.push('runner afterEach');
    });

    env.describe('Something', function() {
      env.beforeEach(function() {
        actions.push('outer beforeEach');
      });

      env.afterEach(function() {
        actions.push('outer afterEach');
      });

      env.it('does it 1', function() {
        actions.push('outer it 1');
      });

      env.describe('Inner 1', function() {
        env.beforeEach(function() {
          actions.push('inner 1 beforeEach');
        });

        env.afterEach(function() {
          actions.push('inner 1 afterEach');
        });

        env.it('does it 2', function() {
          actions.push('inner 1 it');
        });
      });

      env.it('does it 3', function() {
        actions.push('outer it 2');
      });

      env.describe('Inner 2', function() {
        env.beforeEach(function() {
          actions.push('inner 2 beforeEach');
        });

        env.afterEach(function() {
          actions.push('inner 2 afterEach');
        });

        env.it('does it 2', function() {
          actions.push('inner 2 it');
        });
      });
    });

    env.execute();


    var expected = [
      "runner beforeEach",
      "outer beforeEach",
      "outer it 1",
      "outer afterEach",
      "runner afterEach",

      "runner beforeEach",
      "outer beforeEach",
      "inner 1 beforeEach",
      "inner 1 it",
      "inner 1 afterEach",
      "outer afterEach",
      "runner afterEach",

      "runner beforeEach",
      "outer beforeEach",
      "outer it 2",
      "outer afterEach",
      "runner afterEach",

      "runner beforeEach",
      "outer beforeEach",
      "inner 2 beforeEach",
      "inner 2 it",
      "inner 2 afterEach",
      "outer afterEach",
      "runner afterEach"
    ];
    expect(actions).toEqual(expected);
  });

  it("should run multiple befores and afters in the order they are declared", function() {
    var actions = [];

    env.beforeEach(function () {
      actions.push('runner beforeEach1');
    });

    env.afterEach(function () {
      actions.push('runner afterEach1');
    });

    env.beforeEach(function () {
      actions.push('runner beforeEach2');
    });

    env.afterEach(function () {
      actions.push('runner afterEach2');
    });

    env.describe('Something', function() {
      env.beforeEach(function() {
        actions.push('beforeEach1');
      });

      env.afterEach(function() {
        actions.push('afterEach1');
      });

      env.beforeEach(function() {
        actions.push('beforeEach2');
      });

      env.afterEach(function() {
        actions.push('afterEach2');
      });

      env.it('does it 1', function() {
        actions.push('outer it 1');
      });
    });

    env.execute();

    var expected = [
      "runner beforeEach1",
      "runner beforeEach2",
      "beforeEach1",
      "beforeEach2",
      "outer it 1",
      "afterEach2",
      "afterEach1",
      "runner afterEach2",
      "runner afterEach1"
    ];
    expect(actions).toEqual(expected);
  });

  it("builds up nested names", function() {
    var nestedSpec;
    env.describe('Test Subject', function() {
      env.describe('when under circumstance A', function() {
        env.describe('and circumstance B', function() {
          nestedSpec = env.it('behaves thusly', function() {
          });
        });
      });
    });

    expect(nestedSpec.getFullName()).toEqual('Test Subject when under circumstance A and circumstance B behaves thusly.'); //, "Spec.fullName was incorrect: " + nestedSpec.getFullName());
  });

  it("should skip empty suites", function () {
    env.describe('NonEmptySuite1', function() {
      env.it('should pass', function() {
        this.expect(true).toEqual(true);
      });
      env.describe('NestedEmptySuite', function() {
      });
      env.it('should pass', function() {
        this.expect(true).toEqual(true);
      });
    });

    env.describe('EmptySuite', function() {
    });

    env.describe('NonEmptySuite2', function() {
      env.it('should pass', function() {
        this.expect(true).toEqual(true);
      });
    });

    env.execute();

    var runnerResults = env.currentRunner_.results();
    expect(runnerResults.totalCount).toEqual(3);
    expect(runnerResults.passedCount).toEqual(3);
    expect(runnerResults.failedCount).toEqual(0);
  });

  it("shouldn't run disabled tests", function() {
    var xitSpecWasRun = false;
    var suite = env.describe('default current suite', function() {
      env.xit('disabled spec').runs(function () {
        xitSpecWasRun = true;
      });

      env.it('enabled spec').runs(function () {
        var foo = 'bar';
        expect(foo).toEqual('bar');
      });
    });

    suite.execute();
    expect(xitSpecWasRun).toEqual(false);
  });

  it('shouldn\'t execute specs in disabled suites', function() {
    var spy = jasmine.createSpy();
    var disabledSuite = env.xdescribe('a disabled suite', function() {
      env.it('enabled spec, but should not be run', function() {
        spy();
      });
    });

    disabledSuite.execute();

    expect(spy).not.toHaveBeenCalled();
  });

  it('#explodes should throw an exception when it is called inside a spec', function() {
    var exceptionMessage = false;
    var anotherSuite = env.describe('Spec', function () {
      env.it('plodes', function() {
        try {
          this.explodes();
        }
        catch (e) {
          exceptionMessage = e;
        }
        expect(exceptionMessage).toNotEqual(false);
      });
    });

    anotherSuite.execute();

    expect(exceptionMessage).toEqual('explodes function should not have been called');
  });

  it("should recover gracefully when there are errors in describe functions", function() {
    var specs = [];
    var superSimpleReporter = new jasmine.Reporter();
    superSimpleReporter.reportSpecResults = function(spec) {
      specs.push("Spec: " + spec.getFullName());
      var results = spec.results().getItems();
      for (var i = 0; i < results.length; i++) {
        var result = results[i];
        specs.push("Result: " + result);
      }
    };

    try {
      env.describe("outer1", function() {
        env.describe("inner1", function() {
          env.it("should thingy", function() {
            this.expect(true).toEqual(true);
          });

          throw new Error("fake error");
        });

        env.describe("inner2", function() {
          env.it("should other thingy", function() {
            this.expect(true).toEqual(true);
          });
        });

        throw new Error("fake error");

      });
    } catch(e) {
    }

    env.describe("outer2", function() {
      env.it("should xxx", function() {
        this.expect(true).toEqual(true);
      });
    });

    env.addReporter(superSimpleReporter);
    env.execute();

    expect(specs.join('')).toMatch(new RegExp(
      'Spec: outer1 inner1 should thingy.' +
        'Result: Passed.' +
        'Spec: outer1 inner1 encountered a declaration exception.' +
        'Result: Error: fake error.*' +
        'Spec: outer1 inner2 should other thingy.' +
        'Result: Passed.' +
        'Spec: outer1 encountered a declaration exception.' +
        'Result: Error: fake error.*' +
        'Spec: outer2 should xxx.' +
        'Result: Passed.'
      ));
  });

});
