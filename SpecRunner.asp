<%@language="JScript" %>

<script language="JScript" src="vendor/json2/json2.js" runat="server"></script>
<script language="JScript" src="src/jasmine.js" runat="server"></script>

<script language="JScript" src="tests/src/Song.js" runat="server"></script>
<script language="JScript" src="tests/src/Player.js" runat="server"></script>
<script language="JScript" src="tests/spec/SpecHelper.js" runat="server"></script>
<script language="JScript" src="tests/spec/PlayerSpec.js" runat="server"></script>

<script language="JScript" src="tests/spec/core/BaseSpec.js" runat="server"></script>
<script language="JScript" src="tests/spec/core/CustomMatchersSpec.js" runat="server"></script>
<script language="JScript" src="tests/spec/core/EnvSpec.js" runat="server"></script>
<script language="JScript" src="tests/spec/core/ExceptionsSpec.js" runat="server"></script>
<script language="JScript" src="tests/spec/core/JsApiReporterSpec.js" runat="server"></script>
<script language="JScript" src="tests/spec/core/MatchersSpec.js" runat="server"></script>
<script language="JScript" src="tests/spec/core/MockClockSpec.js" runat="server"></script>
<script language="JScript" src="tests/spec/core/MultiReporterSpec.js" runat="server"></script>
<script language="JScript" src="tests/spec/core/NestedResultsSpec.js" runat="server"></script>
<script language="JScript" src="tests/spec/core/PrettyPrintSpec.js" runat="server"></script>
<script language="JScript" src="tests/spec/core/QueueSpec.js" runat="server"></script>
<script language="JScript" src="tests/spec/core/ReporterSpec.js" runat="server"></script>
<script language="JScript" src="tests/spec/core/RunnerSpec.js" runat="server"></script>
<script language="JScript" src="tests/spec/core/SpecRunningSpec.js" runat="server"></script>
<script language="JScript" src="tests/spec/core/SpecSpec.js" runat="server"></script>
<script language="JScript" src="tests/spec/core/SpySpec.js" runat="server"></script>
<script language="JScript" src="tests/spec/core/SuiteSpec.js" runat="server"></script>
<script language="JScript" src="tests/spec/core/UtilSpec.js" runat="server"></script>
<script language="JScript" src="tests/spec/core/WaitsForBlockSpec.js" runat="server"></script>

<script language="JScript" src="src/SpecRunner.js" runat="server"></script>

<script language="JScript" runat="server">
    main();
</script>
<%
function main(){
    var transferScript = '<script type="text/javascript">' + "\n"
        + 'var runData = ' + JSON.stringify(executeSpecs()) + "\n"
        + 'var jasmineVersion = ' + JSON.stringify(jasmine.getEnv().versionString()) + "\n"
        + '</script>';
%>
<!-- #include file="src/SpecRunner.html" -->
<%}%>