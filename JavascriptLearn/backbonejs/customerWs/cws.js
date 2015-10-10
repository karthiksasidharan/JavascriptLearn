var custId;
var allBugs;


$('.selectpicker').selectpicker({});

var analysisMap ={};
analysisMap["G"]="<img src='/../SORA_STATIC/images/completely-analysed.gif'/>";
analysisMap["Y"]="<img src='/../SORA_STATIC/images/partial-analysed.gif' /> ";
analysisMap["R"]=" " ;

function setFilterValues(){


 	if(osType!=""){
 		$("#osSel").val(osType);
 		setRelease();
 	}

	if(sev!=""){
		$("#sevSel").val(sev.split(','));

	}

	if(state!=""){
		$("#stateSel").val(state.split(','));
	}

	if(found!=""){
		$("#foundSel").val(found);
	}

	if(prodFam!=""){
		$("#prodfamText").val(prodFam);
	}

	if(comp!=""){
		$("#compText").val(comp);
	}

}

function getDeltaBugsGrid(){

	var url = "/SORAServices/customerWs/getDeltaBugsGrid.json?custId="+custId+"&osType="+osType+"&severity="+sev+"&state="+state+"&prodFamily="+prodFam+"&component="+comp+"&found="+found+"&startRel="+rel+"&nexusPlatform="+nexusPlatform;
    // prepare the data
    var source =
    {
        datatype: "json",
        url: url
    };

    var dataAdapter = new $.jqx.dataAdapter(source, {
        autoBind: true,
        downloadComplete: function (data) {
        	
        	if(data.columns== undefined || data.columns==null ||data.rows==undefined || data.rows ==null ||data.rows.length==0){
        		 $("#infoMessage").show();
        		 $("#loadButton").hide();
        		 $('#legend').css('display','none');
        		 $("#bugTableDiv").hide();
        		 $("#bugsTableLoader").hide();
        	}else{
        		$('#legend').css('display','none');
        		 $("#bugTableDiv").show();
        		 $("#loadButton").show();
        		$("#infoMessage").hide();
        		$('#tableTitle').html("Non-Analysed Bug Metrics");
        		var columns = data.columns;
                var rows = data.rows;
                deltaBugs=data.deltaBugs;
                var gridAdapter = new $.jqx.dataAdapter({
                    localdata: rows
                });
                $("#bugTableDiv").jqxGrid('hideloadelement');
                $("#bugTableDiv").jqxGrid('beginupdate', true);
                $("#bugTableDiv").jqxGrid(
                  {
                      source: gridAdapter,
                      autoheight: true,
                      columns: columns,
                      pageable: true
                  });
                $("#bugTableDiv").jqxGrid('endupdate');
                $('#bugsTableLoader').hide();
        		
        	}
            
        }
    }
    );
    $("#bugTableDiv").jqxGrid(
           {
               width: 1000,
               columnsresize: true
           });
    $("#bugTableDiv").jqxGrid('showloadelement');
}

$(document).ready(function() {

$( "#prodfamText" ).autocomplete({
			source: "/SORAServices/customerWs/getprodFamilyList.json",
			minLength: 2,
 			select: function( event, ui ) {

              	return true;// Prevent the widget from inserting the value.

            }
		});

	setFilterValues();
	//getDeltaBugs();
	getDeltaBugsGrid();
	$('#osSel').change(function(){

		setRelease();
	});

	$('#platSel').change(function(){
		var platform = $("#platSel").val();
		console.log(platform);
		$('#relSel').prop('disabled',false);
		resetRel();
		loadReleases(osType,platform);
	});

	$('#relSel').prop('disabled',true);
});

function setRelease(){
		osType=$("#osSel").val();
		console.log(osType);
		resetRel();
		if(osType=="NEXUS"){
			$('#relSel').prop('disabled',true);
			$('#platSel').prop('disabled',false);
			$('#platSel').val("");
			$('#platSel').selectpicker('refresh');
		}
		else{
			$('#relSel').prop('disabled',false);
			$('#platSel').prop('disabled',true);
			$('#platSel').val("");
			$('#platSel').selectpicker('refresh');
			loadReleases(osType,"");
		}
}

function resetRel(){

	$("#relSel").val('');
	relArr.splice(0, relArr.length);
}

function resetSev(){
	$('#sevSel option').prop("selected", false);
}
function resetState(){
	$('#stateSel option').prop("selected", false);
}
function resetComp(){
	$("#compText").val("");
}
function resetProdfam(){
	$("#prodfamText").val("");
}
function resetFound(){
	$('#foundSel option').prop("selected", false);
	//$('#foundSel').selectpicker('refresh');
}

function applyFilter(){
	 osType=$("#osSel").val();

	 nexusPlatform = $("#platSel").val();
	 rel=$("#relSel").val();
	 found=$("#foundSel").val();
	 state=$("#stateSel").val();
	 sev=$("#sevSel").val();
	 prodFam=$.trim($("#prodfamText").val());
	 comp=encodeURIComponent($.trim($("#compText").val()));

	if(sev==null){
		sev="";
	}
	if(state==null){
		state="";
	}

	console.log(osType);

	console.log(rel);
	console.log(found);
	console.log(state);
	console.log(sev);
	console.log(nexusPlatform);
	console.log(comp);
	getDeltaBugsGrid();

}

var relArr=[];
function loadReleases(osType, platform){

	var success = function(data){
		if(data!=null){
			for(var i=0; i<data.length; i++){
				relArr[i]=data[i].name;
			}
		}
	};

	var error = function (XMLHttpRequest, textStatus, errorThrown){
		console.log("Error getting data"+errorThrown);
	};

	ajaxCall("/SORAServices/customerWs/getRelByOs.json","GET","json","osType="+osType+"&platform="+platform,success,error,true);
}


function loadBugDetails(){
	var inputCustName=$("<input>").attr("type", "hidden").attr("name", "custName").val(custName);
	var input = $("<input>").attr("type", "hidden").attr("name", "deltaBugs").val(JSON.stringify(deltaBugs));
	var inputCust = $("<input>").attr("type", "hidden").attr("name", "custId").val(custId);
	var osTypeParam = $("<input>").attr("type", "hidden").attr("name", "osType").val(osType);
	var severityParam = $("<input>").attr("type", "hidden").attr("name", "severity").val(sev);
	var foundParam = $("<input>").attr("type", "hidden").attr("name", "found").val(found);
	var allBugData = $("<input>").attr("type", "hidden").attr("name", "showAllBugs").val(showAll);
	$('#AllBugs').append($(inputCustName));
	$('#AllBugs').append($(input));
	$('#AllBugs').append($(inputCust));
	$('#AllBugs').append($(osTypeParam));
	$('#AllBugs').append($(severityParam));
	$('#AllBugs').append($(foundParam));
	$('#AllBugs').append($(allBugData));
	$('#AllBugs').submit();
}


function getBug(bugId,custId){
	var inputCustName=$("<input>").attr("type", "hidden").attr("name", "custName").val(custName);
	var input = $("<input>").attr("type", "hidden").attr("name", "deltaBugs").val(JSON.stringify(deltaBugs));
	var inputCust = $("<input>").attr("type", "hidden").attr("name", "custId").val(custId);
	var inputBug = $("<input>").attr("type", "hidden").attr("name", "bugId").val(bugId);
	var osTypeParam = $("<input>").attr("type", "hidden").attr("name", "osType").val(osType);
	var severityParam = $("<input>").attr("type", "hidden").attr("name", "severity").val(sev);
	var foundParam = $("<input>").attr("type", "hidden").attr("name", "found").val(found);
	var allBugData = $("<input>").attr("type", "hidden").attr("name", "showAllBugs").val(showAll);
	$('#AllBugs').append($(inputCustName));
	$('#AllBugs').append($(input));
	$('#AllBugs').append($(inputCust));
	$('#AllBugs').append($(inputBug));
	$('#AllBugs').append($(osTypeParam));
	$('#AllBugs').append($(severityParam));
	$('#AllBugs').append($(foundParam));
	$('#AllBugs').append($(allBugData));
	$('#AllBugs').submit();


}


var customerWsFilterCriteria;
var showAll=0;
function getDeltaBugs(){
	showAll=0;
	$('#legend').css('display','none');
	$('#bugsTableLoader').show();
	$('#bugTableDiv').hide();
	$('#infoMessage').hide();
	$('#tableTitle').hide();
	$('#AllBugs').hide();
	$.ajax({
		url:"/SORAServices/customerWs/getDeltaBugs.json?custId="+custId+"&osType="+osType+"&severity="+sev+"&state="+state+"&prodFamily="+prodFam+"&component="+comp+"&found="+found+"&startRel="+rel+"&nexusPlatform="+nexusPlatform,
		type:"GET",
		success:function(data){
			deltaBugs=data["deltaBugs"];

			if(deltaBugs["bugListAnalysedState"]==null){
				$('#infoMessage').show();
				$('#bugsTableLoader').hide();
				return;
			}
			constructTable();
			$('#bugsTableLoader').hide();
			$('#bugTableDiv').show();
			$('#tableTitle').show();
			$('#AllBugs').show();

			$('#tableTitle').html("Non-Analysed Bug Metrics");

		},
		error : function (XMLHttpRequest, textStatus, errorThrown) {
			console.log("Error getting data"+errorThrown);

		}
	});
}

function showAllBugsGrid(){
	showAll=1;
	 var cfm= confirm("This would clear all filters and display analysed and non-analysed bugs. Do you want to continue?");
	 if(cfm){
		$("#osSel").val("");
		$("#osSel").selectpicker('refresh');

		$("#sevSel").selectpicker('val', []);
		$("#sevSel").selectpicker('refresh');

		$("#stateSel").selectpicker('val', []);
		$("#stateSel").selectpicker('refresh');

		$("#foundSel").val("");
		$("#foundSel").selectpicker('refresh');

		$("#prodfamText").val("");
		$("#compText").val("");

	 	$('#platSel').prop('disabled',true);
		$('#platSel').val("");
		$('#platSel').selectpicker('refresh');

		resetRel();

		$('#bugsTableLoader').show();
		$('#bugTableDiv').hide();
		$('#infoMessage').hide();
		$('#tableTitle').hide();
		$('#AllBugs').hide();
		var url="/SORAServices/customerWs/getAllDeltaBugsGrid.json?custId="+custId;
	    // prepare the data
	    var source =
	    {
	        datatype: "json",
	        url: url
	    };

	    var dataAdapter = new $.jqx.dataAdapter(source, {
	        autoBind: true,
	        downloadComplete: function (data) {
	            var columns = data.columns;
	            var rows = data.rows;
	            deltaBugs=data.deltaBugs;
	            var gridAdapter = new $.jqx.dataAdapter({
	                localdata: rows
	            });
	            $("#bugTableDiv").jqxGrid('hideloadelement');
	            $("#bugTableDiv").jqxGrid('beginupdate', true);
	            $("#bugTableDiv").jqxGrid(
	              {
	                  source: gridAdapter,
	                  autoheight: true,
	                  columns: columns,
	                  pageable: true

	              });
	            $('#bugsTableLoader').hide();
				$('#bugTableDiv').show();
				$('#tableTitle').show();
				$('#AllBugs').show();
				$('#tableTitle').html("Bug Metrics");
				$('#legend').css('display','');
	            $("#bugTableDiv").jqxGrid('endupdate');
	            //$('#tableTitle').show();
				//$('#AllBugs').show();

	        }
	    }
	    );
	    $("#bugTableDiv").jqxGrid(
	           {
	               width: 1000,
	               columnsresize: true
	           });
	    $("#bugTableDiv").jqxGrid('showloadelement');
	 }
}

function showAllBugs(){
	showAll=1;
 var cfm= confirm("This would clear all filters and display analysed and non-analysed bugs. Do you want to continue?");
 if(cfm){
	$("#osSel").val("");
	$("#osSel").selectpicker('refresh');

	$("#sevSel").selectpicker('val', []);
	$("#sevSel").selectpicker('refresh');

	$("#stateSel").selectpicker('val', []);
	$("#stateSel").selectpicker('refresh');

	$("#foundSel").val("");
	$("#foundSel").selectpicker('refresh');

	$("#prodfamText").val("");
	$("#compText").val("");

 	$('#platSel').prop('disabled',true);
	$('#platSel').val("");
	$('#platSel').selectpicker('refresh');

	resetRel();

	$('#bugsTableLoader').show();
	$('#bugTableDiv').hide();
	$('#infoMessage').hide();
	$('#tableTitle').hide();
	$('#AllBugs').hide();

	$.ajax({
		url:"/SORAServices/customerWs/getAllDeltaBugs.json?custId="+custId,
		type:"GET",
		success:function(data){
			deltaBugs=data;
			if(deltaBugs["bugListAnalysedState"]==null){
				$('#infoMessage').show();
				$('#bugsTableLoader').hide();
				return;
			}
			$('#legend').css('display','');
			constructTable();
			$('#bugsTableLoader').hide();
			$('#bugTableDiv').show();
			$('#tableTitle').show();
			$('#AllBugs').show();
			$('#tableTitle').html("Bug Metrics");

		},
		error : function (XMLHttpRequest, textStatus, errorThrown) {
			console.log("Error getting data"+errorThrown);

		}
	});
	}

}



/*function constructTable(){
	console.log("constructing table");

	var div=$("#bugTableDiv");
		div.html("");

		var bugTable=$("<table>");
		bugTable.attr("id","bugTable");
		bugTable.addClass("display");
		bugTable.addClass("table table-bordered");
		bugTable.prop("cellspacing","0");
		var tableWidth=0;



	var row="<thead><tr><th style='width:100px;'>Bug ID</th>";
	tableWidth+=100;
	var number = new RegExp('[0-9]+');
	for(var i in deltaBugs["projectList"]){
		if(i.match(number)){
			row+="<th style='width:100px'><a title="+deltaBugs["projectList"][i]["name"]+" href="+deltaBugs["projectList"][i]["link"]+">"+deltaBugs["projectList"][i]["releasePlatform"]+"</a></th>";
			tableWidth+=100;
		}
	}
	row+="</tr></thead>";
	bugTable.append(row);


	for(var k in deltaBugs["bugdetails"]){
		row='<tr><td><a href="javascript:getBug(\''+k+'\',\''+custId+'\');">'+k+'</a></td>';
		for(var i in deltaBugs["projectList"]){
			if(i.match(number)){
				projId=deltaBugs["projectList"][i]["id"];
					if(deltaBugs["bugdetails"][k][projId]!=null){

						if((deltaBugs["bugdetails"][k][projId]["selectionStatus"]).lastIndexOf("I", 0)==0)
							row+="<td class='tbCellInc' style=''>"+source[deltaBugs["bugdetails"][k][projId]["addMethod"]]+" <br/><span style='font-size:8px;'>"+(deltaBugs["bugdetails"][k][projId]["updatedDate"]==null?'Oct 20,2014':deltaBugs["bugdetails"][k][projId]["updatedDate"])+"</span></td>";
						else if((deltaBugs["bugdetails"][k][projId]["selectionStatus"]).lastIndexOf("E", 0)==0)
							row+="<td class='tbCellExc' style=''>"+source[deltaBugs["bugdetails"][k][projId]["addMethod"]]+" <br/><span style='font-size:8px;'>"+(deltaBugs["bugdetails"][k][projId]["updatedDate"]==null?'Oct 20,2014':deltaBugs["bugdetails"][k][projId]["updatedDate"])+"</span></td>";
						else
							row+="<td style=''>"+source[deltaBugs["bugdetails"][k][projId]["addMethod"]]+" <br/><span style='font-size:8px;'>"+(deltaBugs["bugdetails"][k][projId]["updatedDate"]==null?'Oct 20,2014':deltaBugs["bugdetails"][k][projId]["updatedDate"])+"</span></td>";
					}else{
						row+="<td>  </td>";
					}
				}
			}
		row+="</tr>";
		bugTable.append(row);
	}


	div.append(bugTable);
	bugTable.css("width",tableWidth+"px");
	bugTable.css("table-layout","fixed");

	bugTable.css("margin", "0 auto");

	//initiateTable();

}*/
function constructTable(){

var bugIdTable=$("#bugIds");
bugIdTable.html("");
var bugIdTableData="";

var projectTable=$("#projects");
projectTable.html("");
var projectTableData="<tr>";


var gridTable=$("#gridData");
gridTable.html("");
var gridTableData="";
var tablewidth=0;
var tableHeight=0;

var number = new RegExp('[0-9]+');
	for(var i in deltaBugs["projectList"]){
		if(i.match(number)){
			projectTableData+="<th><a title='"+deltaBugs["projectList"][i]["name"]+"'  target='_new' href="+deltaBugs["projectList"][i]["link"]+">"+deltaBugs["projectList"][i]["releasePlatform"]+" "+analysisMap[deltaBugs["projectList"][i]["analysedState"]]+"</a></th>";
			tablewidth+=80;

		}
	}
	projectTableData+="</tr>";

	projectTable.html(projectTableData);

	projectTable.css("width",tablewidth+"px");
	if(tablewidth>1200){
		projectTable.css("table-layout","fixed");
	}



		for(var k in deltaBugs["bugdetails"]){
		bugIdTableData+='<tr><td><a href="javascript:getBug(\''+k+'\',\''+custId+'\');">'+k+' '+analysisMap[deltaBugs["bugListAnalysedState"][k]]+'</a></td></tr>';
		gridTableData+="<tr>";
		tableHeight+=50;
		for(var i in deltaBugs["projectList"]){
			if(i.match(number)){
				projId=deltaBugs["projectList"][i]["id"];
					if(deltaBugs["bugdetails"][k][projId]!=null){

						if((deltaBugs["bugdetails"][k][projId]["selectionStatus"]).lastIndexOf("I", 0)==0)
							gridTableData+="<td class='tbCellInc' style=''>"+source[deltaBugs["bugdetails"][k][projId]["addMethod"]]+" <br/><span style='font-size:8px;'>"+(deltaBugs["bugdetails"][k][projId]["updatedDate"]==null?'Oct 20,2014':deltaBugs["bugdetails"][k][projId]["updatedDate"])+"</span></td>";
						else if((deltaBugs["bugdetails"][k][projId]["selectionStatus"]).lastIndexOf("E", 0)==0)
							gridTableData+="<td class='tbCellExc' style=''>"+source[deltaBugs["bugdetails"][k][projId]["addMethod"]]+" <br/><span style='font-size:8px;'>"+(deltaBugs["bugdetails"][k][projId]["updatedDate"]==null?'Oct 20,2014':deltaBugs["bugdetails"][k][projId]["updatedDate"])+"</span></td>";
						else
							gridTableData+="<td style=''>"+source[deltaBugs["bugdetails"][k][projId]["addMethod"]]+" <br/><span style='font-size:8px;'>"+(deltaBugs["bugdetails"][k][projId]["updatedDate"]==null?'Oct 20,2014':deltaBugs["bugdetails"][k][projId]["updatedDate"])+"</span></td>";
					}else{
						gridTableData+="<td>  </td>";
					}
				}
			}
		gridTableData+="</tr>";

	}

	bugIdTable.html(bugIdTableData);
	gridTable.html(gridTableData);
	gridTable.css("width",tablewidth+"px");
	gridTable.css("table-layout","fixed");



	$("#leftSideTable").css("width",tablewidth+"px");
	$("#sideTable").css("width",tablewidth+"px");

	var divWidth=tablewidth+120;
	//$("#bugTableDiv").css("width",divWidth+"px");
	$('#tableTitleDiv').css("width",divWidth+"px");



	$("#leftSideTable").css("height","80px");
	//$("#sideTable").css("height",tableHeight+"px");
}

function initiateTable(){

$('#bugTable').dataTable( {
	"scrollY":        "200px",
    "scrollCollapse": true,
    "paging":         false,
	} );
}

function setFilterCriteria(filterCriteria){
	$("#filterValue").attr("placeholder",placeHolder[filterCriteria]);
	$("#filterValue").val("");
	filterCriteriValue=filterCriteria;
}

function doFilter(){
console.log(filterCriteriValue+"="+filterValue.val());
	getDeltaBugsGrid();
}

function enterKey(e) {
    if (e.keyCode == 13) {
        doFilter();
        return false;
    }
}

var filterCriteriValue="BUG_ID";
var filterValue=$("#filterValue");

var placeHolder = new Object(); // or var map = {};
placeHolder['BUG_ID'] = "Bug ID (Example:CSCdr15444)";
placeHolder['PROJECT_ID'] = "Project ID (Example :52435)";
placeHolder['START_REL'] ="Start Release | OS Type (Example : 4.0.0 | IOSXR)";
placeHolder['OS_TYPE'] ="OS Type (Example : IOS)";
placeHolder['STATE'] ="State(s)(Example : R or R,V,M)";
placeHolder['SEVERITY'] ="Severity(s) (Example : 2 or 1,2,3)";
placeHolder['COMP'] ="Component(Example : fib)";
placeHolder['DELTA'] ="Delta Status (N or C)";

var source = new Object();
source['P']="Pasted";
source['X']="Excel ";
source['AN']="Auto Periodic";
source['AC']="Auto Periodic";
source['S']="SR";

