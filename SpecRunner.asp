<%@language="JScript" %>

<script language="JScript" src="vendor/json2/json2.js" runat="server"></script>
<script language="JScript" src="../jasmine.js" runat="server"></script>

<script language="JScript" src="src/Song.js" runat="server"></script>
<script language="JScript" src="src/Player.js" runat="server"></script>
<script language="JScript" src="spec/SpecHelper.js" runat="server"></script>
<script language="JScript" src="spec/PlayerSpec.js" runat="server"></script>

<script language="JScript" src="spec/core/BaseSpec.js" runat="server"></script>
<script language="JScript" src="spec/core/CustomMatchersSpec.js" runat="server"></script>
<script language="JScript" src="spec/core/EnvSpec.js" runat="server"></script>
<script language="JScript" src="spec/core/ExceptionsSpec.js" runat="server"></script>
<script language="JScript" src="spec/core/JsApiReporterSpec.js" runat="server"></script>
<script language="JScript" src="spec/core/MatchersSpec.js" runat="server"></script>
<script language="JScript" src="spec/core/MockClockSpec.js" runat="server"></script>
<script language="JScript" src="spec/core/MultiReporterSpec.js" runat="server"></script>
<script language="JScript" src="spec/core/NestedResultsSpec.js" runat="server"></script>
<script language="JScript" src="spec/core/PrettyPrintSpec.js" runat="server"></script>
<script language="JScript" src="spec/core/QueueSpec.js" runat="server"></script>
<script language="JScript" src="spec/core/ReporterSpec.js" runat="server"></script>
<script language="JScript" src="spec/core/RunnerSpec.js" runat="server"></script>
<script language="JScript" src="spec/core/SpecRunningSpec.js" runat="server"></script>
<script language="JScript" src="spec/core/SpecSpec.js" runat="server"></script>
<script language="JScript" src="spec/core/SpySpec.js" runat="server"></script>
<script language="JScript" src="spec/core/SuiteSpec.js" runat="server"></script>
<script language="JScript" src="spec/core/UtilSpec.js" runat="server"></script>
<script language="JScript" src="spec/core/WaitsForBlockSpec.js" runat="server"></script>

<script language="JScript" src="SpecRunner.js" runat="server"></script>

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
<!-- #include file="SpecRunner.html" -->
<%}%>