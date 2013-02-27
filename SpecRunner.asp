<%@language="JScript" %>

<script language="JScript" src="vendor/json2/json2.js" runat="server"></script>
<script language="JScript" src="src/jasmine.js" runat="server"></script>
<script language="JScript" src="src/SpecRunner.js" runat="server"></script>

<!-- #include file="specs/AllSpecs.asp" -->

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