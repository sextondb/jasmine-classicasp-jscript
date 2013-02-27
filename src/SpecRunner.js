//noinspection JSUnresolvedVariable
function executeSpecs () {

    var jasmineEnv = jasmine.getEnv();

    var jsApiReporter = new jasmine.JsApiReporter();

    jasmineEnv.addReporter(jsApiReporter);
    var startedAt = new Date();
    jasmineEnv.execute();
    var duration = (new Date().getTime() - startedAt.getTime());
    return {
        suites:jsApiReporter.suites(),
        results:jsApiReporter.results(),
        duration:duration
    };
}