/**
 * 
 */
var lcStartDate='',lcEndDate='',lcProdFamily='',recProdFamily='',selectedCustName='',relTrendingStart='',relTrendingEnd='',graphData='';
var releaseTrendingScreenParams={};
var rtProdFamilyAvailable=false;

var editProjectModel= new EditProjectModel();
var editProjectView;
var customerSelectionView;
var allowedLcStatusAll = {"S":["D","R"],
		"D":["S","TV","A","R"],
		"TV":["D","A","R"],
		"A":["TV","D","R","DP","P"],
		"DP":["A","DP","R","P"],
		"P":["A","DP","R"],
		"R":["S","D","TV","A","DP","P"]};


var lcTextMap = {"S":"Selected",
		"D":"Delivered",
		"TV":"Testing/Validation",
		"R":"Rejected",
		"A":"Accepted",
		"DP":"Deployed",
		"P":"Production"};

var mergeSelectionView;

function getLcProdFamily(){
	$.ajax({
		url:"/SORAServices/customerWs/getLcPodFamily.json?startDate="+lcStartDate+"&endDate="+lcEndDate+"&custId="+customerId,
		type:"GET",
		success:function(data){
			displayLifeCycleProdFamily(data);
		},
		error : function (XMLHttpRequest, textStatus, errorThrown) {
			console.log("Error getting data"+errorThrown);

		} 
	});
}

function displayLifeCycleProdFamily(data){

	var dropdown=$("#lcProdFamily");
	dropdown.html("");
	var number = new RegExp('[0-9]+');
	var option="<option value=''>All</option>";
	dropdown.append(option);
	for(var i in data){
		if(i.match(number)){
			option="<option value='"+data[i]+"'>"+data[i]+"</option>";
			dropdown.append(option);
		}
	}


}

function setProdFamily(){
	lcProdFamily=$("#lcProdFamily").val();
	lifeCycleWidget();

}

function lifeCycleWidget(startDate,endDate,prodFamily){
	$("#lifeCycleWidget").css("display","none");
	$('#lctLoader').css("display","");
	$.ajax({
		url:"/SORAServices/customerWs/getLifecycleCount.json?startDate="+lcStartDate+"&endDate="+lcEndDate+"&custId="+customerId+"&prodFamily="+lcProdFamily,
		type:"GET",
		success:function(data){
			$("#lifeCycleWidget").css("display","");
			displayLifeCycleStatus(data);
			$('#lctLoader').hide();
		},
		error : function (XMLHttpRequest, textStatus, errorThrown) {
			console.log("Error getting data"+errorThrown);

		} 
	});
}

function displayLifeCycleStatus(data){
	var sum=0;
	for(var lc in data){
		sum+=data[lc];
	}
	$( ".progress" ).each(function( index ) {
		var id= $( this ).attr("id");

		if(data[id]==null){
			$(this).css("width","0px");
			$("#"+id+"_label").html(0);
		}else{
			var width=(data[id]/sum)*400;
			$("#"+id+"_label").html(data[id]);
			$(this).css("width",width+"px");
		}
	});

}


function getOsType(os_type){

	if(os_type=='I')return "IOS";
	if(os_type=='C')return "CATOS";
	if(os_type=='M')return "CALL MANAGER";
	if(os_type=='N')return "NEXUS";
	if(os_type=='UCS')return "UCS";
	if(os_type=='O')return "OTHER";
	if(os_type=='X')return "IOSXR";
	if(os_type=='A')return "ASA";
	if(os_type=='F')return "FWSM";
	if(os_type=='P')return "IPS";
	if(os_type=='E')return "ISE";
	if(os_type=='T')return "TP";
	if(os_type=='W')return "WLC";
	if(os_type=='S')return "NCS";
	if(os_type=='CUCT')return "CUCT";
	if(os_type=='CUIP')return "CUIP";
	if(os_type=='OPT') return "OPTICAL";
	if(os_type=='ASR') return "ASR";
	if(os_type=='IVR') return "IP IVR";
	if(os_type=='CCX') return "CCX";
}

function getUsage(usage){
	if(usage=="I") return "Internal Consumption";
	if(usage=="C") return "Customer Delivered";
}

var colSelectionWindow = (function () {
	//Adding event listeners
	function _addEventListeners() {
	};

	//Creating the window
	function _createWindow() {
		$('#columnSelectionWindow').jqxWindow({showCollapseButton: false, 
			maxHeight: 300, 
			maxWidth: 200, 
			minHeight: 300, 
			minWidth: 200, 
			height: 300, 
			width: 400, 
			theme: 'energyblue',
			isModal: false, 
			autoOpen:false,
			position:{x:1300,y:570}});             
	};
	return {
		config: {

			theme:'energyblue'
		},
		init: function () {

			//Attaching event listeners
			_addEventListeners();
			//Adding jqxWindow
			_createWindow();
		}
	};
}());

var browseProjectStart='';
var browseProjectEnd='';
var asBuStartDate='',asBuEndDate='',asBuProdFamily='';
function setDatePicker(){
	var optionSet2 = {
			startDate: moment().subtract(7, 'days'),
			endDate: moment(),
			opens: 'left',
			ranges: {
				'Today': [moment(), moment()],
				'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
				'Last 7 Days': [moment().subtract(6, 'days'), moment()],
				'Last 30 Days': [moment().subtract(29, 'days'), moment()],
				'This Month': [moment().startOf('month'), moment().endOf('month')],
				'Last 90 Days': [moment().subtract(89, 'days'), moment()],
				'Last 1 Year': [moment().subtract(364, 'days'), moment()]
			}
	};
	var cblc = function(start, end, label) {
		console.log(start.toISOString(), end.toISOString(), label);
		$('#LcStatusRange span').html(start.format('MMM D, YYYY') + ' - ' + end.format('MMM D, YYYY'));
	}

	var cbbp = function(start, end, label) {
		console.log(start.toISOString(), end.toISOString(), label);
		$('#browseProjRange span').html(start.format('MMM D, YYYY') + ' - ' + end.format('MMM D, YYYY'));
	}

	var cbrt = function(start, end, label) {
		console.log(start.toISOString(), end.toISOString(), label);
		$('#relTrendingRange span').html(start.format('MMM D, YYYY') + ' - ' + end.format('MMM D, YYYY'));
	}

	var cbqd = function(start, end, label) {
		console.log(start.toISOString(), end.toISOString(), label);
		$('#qualityDashboardRange span').html(start.format('MMM D, YYYY') + ' - ' + end.format('MMM D, YYYY'));
	}


	$('#LcStatusRange').daterangepicker(optionSet2, cblc);
	$('#browseProjRange').daterangepicker(optionSet2, cbbp);
	$('#relTrendingRange').daterangepicker(optionSet2, cbrt);
	$('#qualityDashboardRange').daterangepicker(optionSet2, cbqd);

	$('.widgetDatePicker span').html(moment().subtract(89, 'days').format('MMM D, YYYY') + ' - ' + moment().format('MMM D, YYYY'));

	$('#qualityDashboardRange span').html(moment().subtract(179, 'days').format('MMM D, YYYY') + ' - ' + moment().format('MMM D, YYYY'));

	$('#relTrendingRange span').html(moment().subtract(364, 'days').format('MMM D, YYYY') + ' - ' + moment().format('MMM D, YYYY'));

	lcStartDate=moment().subtract(89, 'days').format('DD-MM-YYYY');
	lcEndDate=moment().format('DD-MM-YYYY');
	relTrendingStart=moment().subtract(365, 'days').format('YYYY-MM-DD');
	relTrendingEnd=moment().format('YYYY-MM-DD');

	$('#LcStatusRange').on('apply.daterangepicker', function(ev, picker) { 

		lcStartDate=picker.startDate.format('DD-MM-YYYY');
		lcEndDate=picker.endDate.format('DD-MM-YYYY');
		lcProdFamily='';
		lifeCycleWidget();
		getLcProdFamily();
	});

	$('#browseProjRange').on('apply.daterangepicker', function(ev, picker) { 
		browseProjectStart=picker.startDate.format('DD-MM-YYYY');
		browseProjectEnd=picker.endDate.format('DD-MM-YYYY');
		browseProjectsClass.browseProject(picker.startDate.format('DD-MM-YYYY'),picker.endDate.format('DD-MM-YYYY'));
	});

	$('#relTrendingRange').on('apply.daterangepicker', function(ev, picker) { 
		relTrendingStart=picker.startDate.format('YYYY-MM-DD');
		relTrendingEnd=picker.endDate.format('YYYY-MM-DD');
		displayReleaseTrendingGraph();
		//	relTrendingClass.relTrending(picker.startDate.format('YYYY-MM-DD'),picker.endDate.format('YYYY-MM-DD'));
	});

	$('#qualityDashboardRange').on('apply.daterangepicker', function(ev, picker) { 
		asBuStartDate=picker.startDate.format('DD-MM-YYYY');
		asBuEndDate=picker.endDate.format('DD-MM-YYYY');
		asBuProdFamily='';
		qualityDashboardClass.loadBargraph();
		qualityDashboardClass.getAsBuProdFamily(picker.startDate.format('DD-MM-YYYY'),picker.endDate.format('DD-MM-YYYY'));
	});

	$('#LcStatusRange').data('daterangepicker').setOptions(optionSet2, cblc); 
	$('#browseProjRange').data('daterangepicker').setOptions(optionSet2, cbbp); 
	$('#relTrendingRange').data('daterangepicker').setOptions(optionSet2, cbrt);
	$('#qualityDashboardRange').data('daterangepicker').setOptions(optionSet2, cbqd);
}    




var browseProjectsClass = (function(){
	var projectsData;
	var projId;


	function validateDelEngrIdModified() {
		var idFlag = true;
		$.ajax({
			url : "/SORAServices/project/validateDeliveryEngr.json",
			type : "GET",
			dataType : 'json',
			data : "deliveryEngr="+$('#delEngEdit').val(),
			async : false,
			success : function(data) {
				if (data.status == "false") {
					idFlag = false;

				}
			}
		});
		if (idFlag) {
			return true;
		} else {
			return false;
		}
	}

	function validateNewProjectName(projId,newName,projDescValue,projectName,priEngr) {
		var idFlag = true;
		$.ajax({
			url : "/SORAServices/project/duplicateProject.json",
			type : "GET",
			dataType : 'json',
			data : "proj_id="+projId+"&newName="+encodeURIComponent(newName)+"&newDesc="+encodeURIComponent(projDescValue)+
			"&custId="+customerId+"&priEngr="+priEngr+"&projName="+encodeURIComponent(projectName),
			async : false,
			success : function(data) {
				if (data == true) {
					idFlag = false;
					$("#validateMsg").html("Project name already exists.");
				}
			}
		});
		if (idFlag) {
			return true;
		} else {
			return false;
		}
	}

	function initiateTable(){
		$('#browseProject').dataTable( {
			"scrollY":        "200px",
			"scrollCollapse": true,
			"paging":         false,

		});

	}

	function constructBrowseProject(data){		
		//Initializing the window
		colSelectionWindow.init();

		var source =
		{
				datatype: "json",
				datafields: [
				             { name: 'projName', type: 'String' },
				             { name: 'priEngr', type: 'String' },
				             { name: 'deliveryEngr', type: 'String' },
				             { name: 'startRel', type: 'String' },
				             { name: 'projUsage', type: 'String' },
				             { name: 'osType', type: 'String' },
				             { name: 'duId', type: 'String' },
				             { name: 'projDesc', type: 'String' },
				             { name: 'lastModified', type: 'String' },
				             { name: 'reportType', type: 'String' },
				             { name: 'searchTyp', type: 'String' },
				             { name: 'workflowStatus', type: 'String' },
				             { name: 'rptSts', type: 'String' },
				             { name: 'lifeCycleStatus', type: 'String' },
				             { name: 'otherOsTypeName', type: 'String' },
				             { name: 'nxosPlatform', type: 'String' },
				             { name: 'prodFamily', type: 'String' },
				             { name: 'commitPer', type: 'String' }
				             ],
				             root: "",
				             record: "",
				             localdata: data
		};


		var dataAdapter = new $.jqx.dataAdapter(source, {
			loadComplete: function (data) { },
			loadError: function (xhr, status, error) { }
		});		

		$("#browseProjectDiv").jqxGrid(
				{
					width: 1340,
					height: 180,
					source: dataAdapter,
					theme: 'energyblue',
					sortable: true,
					altrows: true,
					enabletooltips: true,
					showfilterrow: true,
					filterable:true,
					columnsresize: true,
					editable:false,
					pageable: true,
					selectionmode:'checkbox',
					columns: [
					          { text: 'Project Name', datafield: 'projName', width: 100},
					          { text: 'Primary Engineer', datafield: 'priEngr', width: 100},
					          { text: 'Delivery Engineer', datafield: 'deliveryEngr', width: 100},
					          { text: 'DU ID', datafield: 'duId', width: 50},
					          { text: 'Product Family', datafield: 'prodFamily', width: 100},
					          { text: 'Target Release', datafield: 'startRel', width: 100, cellsrenderer : function (row, column, cellvalue){
					        	  var targetRelease = wrapText(cellvalue);
					        	  return alignCellText(targetRelease);}},
					        	  { text: 'Other OS name', datafield: 'otherOsTypeName', width: 100, cellsrenderer : function (row, column, cellvalue){
					        		  var otherOsTypeName = cellvalue;

					        		  if( otherOsTypeName == null || otherOsTypeName == undefined){
					        			  otherOsTypeName = "";  
					        		  }
					        		  return alignCellText(otherOsTypeName);}},
					        		  { text: 'Project Description', datafield: 'projDesc', width: 100},
					        		  { text: 'Last Updated', datafield: 'lastModified', width: 100},
					        		  { text: 'Report Type', datafield: 'reportType', width: 100},
					        		  { text: 'Platform', datafield: 'nxosPlatform', width: 100},
					        		  { text: 'Work Flow Status', datafield: 'workflowStatus', width: 100},
					        		  { text: 'Report Status', datafield: 'rptSts', width: 100},
					        		  //{ text: 'Life Cycle State', datafield: 'rptSts', width: 100, cellsrenderer : displayLifeCycleStr},
					        		  { text: 'Project Usage', datafield: 'projUsage', width: 100, cellsrenderer : function (row, column, cellvalue){
					        			  var projUsage = getUsage(cellvalue);
					        			  return alignCellText(projUsage);}},
					        			  { text: 'Os type', datafield: 'osType', width: 100, cellsrenderer : function (row, column, cellvalue){
					        				  var osType = getOsType(cellvalue);
					        				  return alignCellText(osType);}}

					        			  ]
				});

		initializeColumnSelection();
		$('#projectsLoader').css("display","none");
		$('#browseProjectPanel').css("display","");

	}
	function initializeColumnSelection(){

		var listSource = [{ label: 'Project Name', value: 'projName', checked: true },
		                  { label: 'Primary Engineer', value: 'priEngr', checked: true },
		                  { label: 'Delivery Engineer', value: 'deliveryEngr', checked: true },
		                  { label: 'DU ID', value: 'duId', checked: true },
		                  { label: 'Product Family', value: 'prodFamily', checked: true},
		                  { label: 'Target Release', value: 'startRel', checked: true }, 
		                  { label: 'Other OS Name', value: 'otherOsTypeName', checked: true }, 
		                  { label: 'Project Description', value: 'projDesc', checked: true }, 
		                  { label: 'Last Updated', value: 'lastModified', checked: true }, 
		                  { label: 'Report Type', value: 'reportType', checked: true }, 
		                  { label: 'Platform', value: 'nxosPlatform', checked: true }, 
		                  { label: 'Work Flow Status', value: 'workflowStatus', checked: true }, 
		                  { label: 'Report Status', value: 'rptSts', checked: true }, 
		                  { label: 'Project Usage', value: 'projUsage', checked: true }, 
		                  { label: 'Os type', value: 'osType', checked: true }];

		$("#projColumnChoice").jqxListBox({ 
			source: listSource,
			width: 175,
			height: 200,
			theme: 'energyblue',
			checkboxes: true });

		$("#projColumnChoice").on('checkChange', function (event) {

			if (event.args.checked) {

				$("#browseProjectDiv").jqxGrid('showcolumn', event.args.value);
			}
			else {

				$("#browseProjectDiv").jqxGrid('hidecolumn', event.args.value);
			}
		});
	}

	function displayLifeCycleStr (row, columnfield, cellValue, defaulthtml, columnproperties) {
		var lifeCycleStatusStr = "";
		var dataRecord = $("#browseProjectDiv").jqxGrid('getrowdata', row);
		var lcStatus = cellValue;
		if(lcStatus != null && 
				("MQ".equalsIgnoreCase(dataRecord.searchTyp) || "SE".equalsIgnoreCase(dataRecord.searchTyp)) 
				&& !"1".equalsIgnoreCase(dataRecord.commitPer) && "C".equalsIgnoreCase(dataRecord.projUsage))
		{
			lifeCycleStatusStr=lcMap[lcStatus];

			if(lifeCycleStatusStr != undefined){
				lifeCycleStatusStr= 
					"<a href='../component/ComponentSummary.htm?TrackStatus=true&projectId="+row.projId+"'>"+lifeCycleStatusStr+"</a>";

			}else{
				lifeCycleStatusStr = "-";
			}

		}
		else
		{
			lifeCycleStatusStr = "-";
		}

		console.log("lifeCycleStatusStr ==> "+lifeCycleStatusStr);
		return lifeCycleStatusStr;
	}

	function wrapText(text){
		var targRelStr = text;
		if(targRelStr==null)
			return "";
		var targRelStrArr = targRelStr.split(",");
		targRelStr = "";
		$.each(targRelStrArr,function(i,entry){
			if(i==(targRelStrArr.length-1)) targRelStr += entry;
			else targRelStr += entry + "," + " ";
		});
		return targRelStr;

	}


	function validateClickForProject(){

		var getselectedrowindexes = $('#browseProjectDiv').jqxGrid('getselectedrowindexes');
		if (getselectedrowindexes.length ==1){
			// returns the selected row's data.
			var selectedRowData = $('#browseProjectDiv').jqxGrid('getrowdata', getselectedrowindexes[0]);
			projId= projectsData[getselectedrowindexes[0]]["projId"];
			return projId;
		}else{
			return 0;
		}

	}

	return{

		browseProject:function (startDate,endDate){
			$('#projectsLoader').css("display","");
			$('#browseProjectPanel').css("display","none");
			var success = function(data){
				projectsData=data;

				constructBrowseProject(data);
			};

			var error = function (XMLHttpRequest, textStatus, errorThrown){
				console.log("Error getting data"+errorThrown);
			};

			ajaxCall("/SORAServices/customerWs/getProjects.json","GET","json","startDate="+startDate+"&endDate="+endDate+"&custId="+customerId,
					success,error,true);

		},

		editProject: function (){
			var getselectedrowindexes = $('#browseProjectDiv').jqxGrid('getselectedrowindexes');
			if(getselectedrowindexes.length !=1){
				alert("Please Select a Project from the Grid");
				return;
			}
			var i =getselectedrowindexes[0];

			var priEngr=projectsData[i]["priEngr"];
			console.log("PE"+priEngr);
			if(priEngr != loggedInUser){
				alert("Only Primary Engineer is authorized to edit the project.");
				return;
			}	

			if(projectsData[i]["isLocked"] =='Y'){
				if(projectsData[i]["isMerged"]!='Y'){
					alert("Project is locked for merging  and cannot be edited");
					return;
				}		
			}	

			if(projectsData[i]["projSts"]=="b"){
				alert("Sorry. Cannot perform Clone / Rename / Delete / Edit  operations  when the project is in Offline Task Monitor status.");
				return;
			}	
			editProjectModel.setValues(projectsData[i]);
			editProjectView=new EditProjectView({ el: $("#modal"),model:editProjectModel});
			$('#modal').modal('show');




		},
		cloneProject: function (){
			var getselectedrowindexes = $('#browseProjectDiv').jqxGrid('getselectedrowindexes');
			if(getselectedrowindexes.length !=1){
				alert("Please Select a Project from the Grid");
				return;
			}
			var i =getselectedrowindexes[0];


			if(projectsData[i]["isLocked"] =='Y'){
				alert("Project is locked for merging and cannot be cloned");
				return;
			}

			if(projectsData[i]["isMerged"]=='Y'){
				alert("Merge project cannot be cloned.");
				return;
			}		


			if(projectsData[i]["projSts"]=="b"){
				alert("Sorry. Can not perform Clone / Rename / Delete /Edit  operations  when the project is in Offline Task Monitor status.");
				return;
			}	

			if(projectsData[i]["commitPer"]=="1"){
				alert("Periodic project cannot be cloned.")
				return;
			}	



			window.open('/SORAServices/project/clone.htm?projectId='+projectsData[i]["projId"],'_blank');


		},

		deleteProject: function (){
			var getselectedrowindexes = $('#browseProjectDiv').jqxGrid('getselectedrowindexes');
			if(getselectedrowindexes.length !=1){
				alert("Please Select a Project from the Grid");
				return;
			}
			var i =getselectedrowindexes[0];
			var priEngr=projectsData[i]["priEngr"];
			console.log("PE"+priEngr);
			var projId=projectsData[i]["projId"];
			console.log("projId"+projId);
			if(projectsData[i]["isLocked"] =='Y'){
				alert("Project is locked for merging and cannot be deleted");
				return;
			}
			if(projectsData[i]["projSts"]=="b"){
				alert("Sorry. Can not perform Clone / Rename / Delete /Edit  operations  when the project is in Offline Task Monitor status.");
				return;
			}	
			if(priEngr != loggedInUser){
				alert("Only Primary Engineer is authorized to delete the project.");
				return;
			}
			if(!confirm("Are you sure to delete the selected project....?")) return;
			$.getJSON('/SORAServices/project/deleteProject.json?proj_id='+projId, 
					function(data) {
				if(data.status == true){

				}else{
					alert('Project Deletion Failed!');
				}
				browseProjectsClass.browseProject(browseProjectStart,browseProjectEnd);
			});

		},

		mergeProject:function(){
			var getselectedrowindexes = $('#browseProjectDiv').jqxGrid('getselectedrowindexes');
			if(getselectedrowindexes.length <2){
				alert("Please select atleast 2 projects to merge");
				return;
			}

			if(getselectedrowindexes.length >4){
				alert("Please select less than 4 projects to merge");
				return;
			}

			var ostype= projectsData[getselectedrowindexes[0]]["osType"] ;
			for(k=0;k<getselectedrowindexes.length;k++){

				var i =getselectedrowindexes[k];

				var isMerged= projectsData[i]["isMerged"] ;


				if(isMerged=="Y"){
					alert(projectsData[i]["projName"] +" is a merge project. Cannot use it for merging.");

					return false;
				}
				var isLocked= projectsData[i]["isLocked"] ;
				if(isLocked =='Y'){

					alert("One or more projects selected are locked. Cannot merge.");
					return;

				}

				if(ostype!=projectsData[i]["osType"]){

					alert("Cannot merge projects of different OS Type");
					return;

				}


			}
			mergeSelectionView=new MergeSelectionView({ el: $("#modal")});
			$('#mergeProjectName').val("");
			$('#mergeProjectDescription').val("");
			$('#modal').modal('show');




		},


		mergeProjects:function(){
			var mergeProjectName = $('#mergeProjectName').val();
			if(trim(mergeProjectName)== ""){
				alert("Project Name cannot be empty");
				return;
			}

			var mergeProjDesc =$('#mergeProjectDescription').val();


			var getselectedrowindexes = $('#browseProjectDiv').jqxGrid('getselectedrowindexes');


			var parentProjIds="";
			var release="";
			var osType=""
				for(k=0;k<getselectedrowindexes.length;k++){

					var i =getselectedrowindexes[k];
					parentProjIds+= projectsData[i]["projId"] +",";
					release=projectsData[i]["startRel"];
					osType=projectsData[i]["osType"];

				}





			var parentProjIdsValue =parentProjIds.slice(0,parentProjIds.length-1);

			var urlArgs = "parentProjIds="+parentProjIdsValue+"&mergeProjName="+encodeURIComponent(mergeProjectName)+"&mergeProjdesc="+mergeProjDesc+"&primaryEng="+loggedInUser+"&ostype="+osType+"&release="+release+"&userConformance="+$('#userConformance').val();

			var success= function(data){
				if(data.status=="failure"){

					if(data.message == "Chosen Projects are not eligible for merging"){
						alert(data.message+ "\n\n Possible reasons - \n 1. Software type, release and platform of selected projects are not same \n 2. Selected projects are not exposed \n" +
								" 3. Selected projects are not customer delivered projects. \n 4. Query screen filters are not same \n "+
								"6. Selected projects are not created in last "+data.numberOfDays+" days.");
					}
					else if(data.message=="less than 60% match "){
						hideLoader();
						var userConformance=confirm("Included and flagged to review bug match is less than 60%. Do you still want to merge the selected projects?");
						if(userConformance){
							$('#userConformance').val("true");
							browseProjectsClass.mergeProjects();
						}
					}else{
						alert(data.message);
					}
				}else{
					browseProjectsClass.browseProject("","");

				}

			};
			var error=function(err){
				hideLoader();
				if(err=="TypeError: e is undefined")
					;
				else
					alert("Validation Failed!"+err);

			}
			ajaxCall("/SORAServices/project/mergeProjects.json","POST","json",urlArgs,success,error,false);


			$('#modal').modal('hide');






		},


		loadPid:function(prodFamily,osType,platform){

			if($('#usageEdit').val()=="I"){
				editProjectModel.pidDisplay='style="display:none;"';
				editProjectModel.pid='';
				editProjectModel.projUsageChanged='1';
			}else{
				editProjectModel.pidDisplay='';

				var success = function(data){
					var temp='<select id="pidEdit" multiple="true">';
					for(var x in data["data"]){
						if(data["data"][x]["id"] >0){
							temp+='<option style="background-color:green;" value="'+data["data"][x]["name"]+'">'+data["data"][x]["name"]+'</option>'

						}else{
							temp+='<option  value="'+data["data"][x]["name"]+'">'+data["data"][x]["name"]+'</option>'

						}

					}
					temp+='</select>';
					editProjectModel.pid=temp;
					editProjectModel.projUsageValue='C';
					editProjectModel.projUsageChanged='1';
					editProjectView.render();
					$("#usageEdit option[value='C']").attr('selected','selected');
				};
				var error = function (XMLHttpRequest, textStatus, errorThrown){
					console.log("Error getting data"+errorThrown);
				};
				var param='prodFamily='+prodFamily+'"&osType='+osType+'&platform='+platform;
				ajaxCall("/SORAServices/project/getPidsForSelectedProdFamily.json","GET","json",param,success,error,false);
			}
		},

		saveEditProject:function(){
			console.log("Saving Edit");
			if($('#projNameEdit').val()==null||$('#projNameEdit').val()==""){
				alert("Please Enter a Project Name");
				return;
			}
			console.log($('#autoPerFreq').val());
			if($('#delEngEdit').val()==null||$('#delEngEdit').val()==""){
				alert("Please Enter a Delivery Engineer Id");
				return;
			}

			var regEx = /^([0-9]|[a-z])+([0-9a-z]+)$/i ;
			if(!$('#delEngEdit').val().match(regEx)){
				alert("Please enter only alphanumeric values between A to Z and 0 to 9 for delivered engineer.");
				return;
			}


			if(!validateDelEngrIdModified()){
				alert("Invalid Delivery Engineer Id is entered");
				return;
			}	
			var hasDeEngrChanged="0",hasProjNameChanged="0",hasProjDescChanged="0",hasAutoPerFreqChanged="0",
			hasProjUsageChanged="0",hasLcStatusChanged="0";

			console.log(editProjectModel.deliveryEngineer+":"+editProjectModel.projId+":"+editProjectModel.primaryEngr);
			if(editProjectModel.deliveryEngineer != $('#delEngEdit').val()){
				hasDeEngrChanged="1";
			}
			if(editProjectModel.projName!=$('#projNameEdit').val()){
				if(editProjectModel.reportType=="Periodic"){
					alert("To rename a Periodic Project you must rename the original Exposed Project. The periodic project will be automatically renamed with the same name.");
					return;
				}
				if(!validateNewProjectName(editProjectModel.projId,$('#projNameEdit').val(),$('#projDescEdit').val(),editProjectModel.projName,editProjectModel.primaryEngr)){
					alert("Project Name already exists");
					return;
				}
				hasProjNameChanged="1";
			}
			if(editProjectModel.projDesc!=$('#projDescEdit').val()){
				hasProjDescChanged="1";
			}
			console.log(editProjectModel.autoPeriodicFreqValue+":"+$('#autoPerFreq').val());
			if(editProjectModel.autoPeriodicFreqValue!=$('#autoPerFreq').val()){
				hasAutoPerFreqChanged="1";
			}
			if(editProjectModel.projUsageChanged=='1'){
				hasProjUsageChanged="1";
			}

			var newLcStatus =  $('#editLcStatusDpd').val();
			if(newLcStatus && newLcStatus != "status" && editProjectModel.lifeCycleStatus != newLcStatus){
				hasLcStatusChanged="1";
			}

			if(hasLcStatusChanged == "1"){

				var status = updateLCStatus("editProj", editProjectModel.projId);
				if((newLcStatus=="P"||newLcStatus=="DP") && status == false){
					console.log("Error while updating the LC status!");	
				}
			}
			if(hasDeEngrChanged=="0" && hasProjNameChanged=="0" && hasProjDescChanged=="0" && hasAutoPerFreqChanged=="0" 
				&& hasProjUsageChanged=="0"){

				console.log("Nothing changed");	
				$('#modal').modal('hide');
				return;

			}

			var pid=$('#pidEdit').val();
			if(pid!=null &&pid!=""){
				pid=pid.join(",");
			}


			var param="projectId="+editProjectModel.projId+"&hasProjDescChanged="+hasProjDescChanged+"&hasDeEngrChanged="+hasDeEngrChanged+
			"&hasProjNameChanged="+hasProjNameChanged+"&newProjName="+$('#projNameEdit').val()+"&newDelEngr="+$('#delEngEdit').val()+"&autoPeriodicFreq="+$('#autoPerFreq').val()+
			"&newProjDesc="+$('#projDescEdit').val()+"&hasAutoPeriodicChanged="+hasAutoPerFreqChanged+"&hasProjUsageChanged="+hasProjUsageChanged
			+"&projUsage="+$('#usageEdit').val()+"&pid="+pid;

			var success = function(data){
				if(data["map"]["status"] != 0){					
					browseProjectsClass.browseProject(browseProjectStart,browseProjectEnd);
					$('#modal').modal('hide');
				}
				else{
					alert("Error while updating the project!");				        	
				}
			};

			var error = function (XMLHttpRequest, textStatus, errorThrown){
				console.log("Error getting data"+errorThrown);
			};
			ajaxCall("/SORAServices/project/updateProject.json","GET","json",param,success,error,true);

		},

		downloadExcel:function(){
			var url="/SORAServices/customerWs/getProjectsExcel.json";
			console.log(browseProjectStart+"::"+browseProjectEnd);
			var params={"startDate":browseProjectStart,"endDate":browseProjectEnd,"custId":customerId};
			var form = $('<form method="POST" action="' + url + '">');
			$.each(params, function(k, v) {

				form.append($('<input type="hidden" name="' + k +
						'" value="' + v + '">'));
			});
			$('body').append(form);
			form.submit();
		},
		toggleColumnSelection:function(){
			$('#columnSelectionWindow').jqxWindow('open');

		},
		createProject:function(){

			document.location.href='/SORAServices/project/create.htm?isCws=Y&custId='+selectedCustName;

		},
		hardwareSelector:function(){
			var projId= validateClickForProject();
			if(projId==0){
				alert("Please Select a Project from the Grid");
				return;
			}else{
				document.location.href='/SORAServices/profile/ProfileScreen.htm?projectId='+projId;
			}
		},

		componentSelector:function(){
			var projId= validateClickForProject();
			if(projId==0){
				alert("Please Select a Project from the Grid");
				return;
			}else{
				document.location.href='/SORAServices/filter/ComponentSelector.htm?projectId='+projId;
			}
		},
		queryScreen:function(){
			var projId= validateClickForProject();
			if(projId==0){
				alert("Please Select a Project from the Grid");
				return;
			}else{
				document.location.href='/SORAServices/filter/OptionalFilter.htm?projectId='+projId;
			}
		},
		componentSummary:function(){
			var projId= validateClickForProject();
			if(projId==0){
				alert("Please Select a Project from the Grid");
				return;
			}else{
				document.location.href='/SORAServices/component/ComponentSummary.htm?projectId='+projId;
			}
		},

		bugList:function(){
			var projId= validateClickForProject();
			if(projId==0){
				alert("Please Select a Project from the Grid");
				return;
			}else{
				document.location.href='/SORAServices/buglist/BugList.htm?projectId='+projId;
			}
		},

		brp:function(){
			var projId= validateClickForProject();
			if(projId==0){
				alert("Please Select a Project from the Grid");
				return;
			}else{
				document.location.href='/SORAServices/brp/BRPMain.htm?projectId='+projId;
			}
		},

		reportGeneration:function(){
			var projId= validateClickForProject();
			if(projId==0){
				alert("Please Select a Project from the Grid");
				return;
			}else{
				document.location.href='/SORAServices/report/ReportGen.htm?projectId='+projId;
			}
		},


	};
}());

//Module for Periodic Bugs Data
var periodicBugs = (function(){
	var consolidatedData;
	var completeData;



	return{

		getDetails:function(row,filter){
			var osType=completeData[row].osType;


			console.log("Filter clicked"+osType,filter);

			var found="";
			if(filter=='internalFoundCount'){
				found="I";
			}else if(filter=='customerFoundCount'){
				found="C";
			}
			var severity=new Array();
			if(filter=='severityOneCount'){
				severity='1';
			}else if(filter=='severityTwoCount'){
				severity='2';
			}else if(filter=='severityThreeCount'){
				severity='3';
			}else if(filter=='severityOneTwoCount'){
				severity='1,2';
			}else if(filter=='severityOneTwoThreeCount'){
				severity='1,2,3';

			}else if(filter=='severityFourFiveSixCount'){
				severity='4,5,6';

			}


			if(osType=="Total "){
				osType="";
			}

			var param = "custId="+customerId+"&osType="+osType+"&found="+found+"&severity="+severity+"&custName="+selectedCustName;

			document.location.href="/SORAServices/customerWs/getPeriodicAnalysis.htm?"+param;

		},
		getPeriodicProjectData:function(){
			$('#periodicBugsLoader').show();
			var success,error;
			var param="custId="+customerId;
			success = function(data){
				$('#periodicBugsLoader').hide();
				completeData=data.countData;

				if(data.countData == null || data.countData.length == 1){
					$('#data').html("No Non-Analysed Periodic Bugs present. ");
				}else{

					var source =
					{
							localdata: data.countData,
							pagesize: 20,
							datafields:
								[
								 { name: 'osType', type: 'string' },
								 { name: 'severityOneCount', type: 'number' },
								 { name: 'severityTwoCount', type: 'number' },
								 { name: 'severityThreeCount', type: 'number' },
								 { name: 'severityFourFiveSixCount', type: 'number' },
								 { name: 'severityOneTwoCount', type: 'number' },
								 { name: 'severityOneTwoThreeCount', type: 'number' },
								 { name: 'customerFoundCount', type: 'number' },
								 { name: 'internalFoundCount', type: 'number' },

								 ],
								 datatype: "array"
					};

					var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
						if(value!=0){
							return "<a  style='margin-left:4px; margin-top: 4px' href='javascript:void(0);' onclick='periodicBugs.getDetails("+row+",\""+columnfield+"\");'>"+value+"</a>";

						}else{
							return alignCellText("0");
						}
					}

					var adapter = new $.jqx.dataAdapter(source);
					$("#data").jqxGrid(
							{
								width: 655,
								autoheight:true,
								source: adapter,
								pageable: true,
								autoheight: true,
								columns: [
								          { text: 'OS Type', datafield: 'osType', width: 100 },
								          { text: 'S-1,2', datafield: 'severityOneTwoCount', width: 50,cellsrenderer: cellsrenderer },
								          { text: 'S-1,2,3', datafield: 'severityOneTwoThreeCount', width: 70 ,cellsrenderer: cellsrenderer},
								          { text: 'S-1', datafield: 'severityOneCount', width: 50, cellsrenderer: cellsrenderer },
								          { text: 'S-2', datafield: 'severityTwoCount', width: 50,cellsrenderer: cellsrenderer},
								          { text: 'S-3', datafield: 'severityThreeCount', width: 50,cellsrenderer: cellsrenderer },
								          { text: 'S-4,5,6', datafield: 'severityFourFiveSixCount', width: 70,cellsrenderer: cellsrenderer },
								          { text: 'Customer Found', datafield: 'customerFoundCount', width: 110 ,cellsrenderer: cellsrenderer},
								          { text: 'Internal Found', datafield: 'internalFoundCount', width: 105 ,cellsrenderer: cellsrenderer}

								          ]
							});

					if(data.countData.length<5){
						$('#data').css("margin-top","80px");
					}else{
						var len = 80-((data.countData.length-5)*10);
						$('#data').css("margin-top",len+"px");
					}

				}




			};
			error=function (XMLHttpRequest, textStatus, errorThrown) {

			}; 


			ajaxCall("/SORAServices/customerWs/getPeriodicData.json","GET","json",param,success,error,true);

		}


	};
}());

function getLcProjects(lcStatus){
	$.ajax({
		url:"/SORAServices/customerWs/getLcProjects.json?startDate="+lcStartDate+"&endDate="+lcEndDate+"&custId="+customerId+"&prodFamily="+$("#lcProdFamily").val()+"&lcStatus="+lcStatus,
		type:"GET",
		success:function(data){
			constructLcTable(data,lcStatus);
		},
		error : function (XMLHttpRequest, textStatus, errorThrown) {
			console.log("Error getting data"+errorThrown);

		} 
	});

}



var qualityDashboardClass = (function(){



	function displayAsBuProdFamily(data){

		var dropdown=$("#asBuProdFamily");
		dropdown.html("");
		var number = new RegExp('[0-9]+');
		var option="<option value=''>All</option>";
		dropdown.append(option);
		for(var i in data){
			if(i.match(number)){
				option="<option value='"+data[i]+"'>"+data[i]+"</option>";
				dropdown.append(option);
			}
		}


	}

	return{
		setAsBuProdFamily:function(){
			asBuProdFamily=$("#asBuProdFamily").val();
			this.loadBargraph();
		},

		getAsBuProdFamily:function(startDate,endDate){
			$.ajax({
				url:"/SORAServices/customerWs/getAsBuPodFamily.json?startDate="+startDate+"&endDate="+endDate+"&custId="+customerId,
				type:"GET",
				success:function(data){
					displayAsBuProdFamily(data);
				},
				error : function (XMLHttpRequest, textStatus, errorThrown) {
					console.log("Error getting data"+errorThrown);

				} 
			});
		},

		loadBargraph:function (){
			console.log("loading bar graph");
			var source =
			{
					datatype: "json",
					datafields: [
					             { name: 'date' },
					             { name: 'recCount' },
					             { name: 'nonRecCount' },
					             { name: 'pidNotSelected' }
					             ],
					             url: '/SORAServices/customerWs/getQualityDashboardData.json?custId='+customerId+'&startDate='+asBuStartDate+'&endDate='+asBuEndDate+"&prodFamily="+asBuProdFamily
			};

			var dataAdapter = new $.jqx.dataAdapter(source, { async: false, autoBind: true, loadError: function (xhr, status, error) { alert('Error loading "' + source.url + '" : ' + error); } });
			// prepare jqxChart settings
			var settings = {
					title: "",
					description: "",
					enableAnimations: true,
					showLegend: true,
					padding: { left: 10, top: 5, right: 10, bottom: 5 },
					titlePadding: { left: 90, top: 0, right: 0, bottom: 10 },
					source: dataAdapter,
					xAxis:
					{
						dataField: 'date',
						showTickMarks: true,
						valuesOnTicks: false,
						tickMarksInterval: 1,
						tickMarksColor: '#888888',
						unitInterval: 1,
						gridLinesInterval: 1,
						gridLinesColor: '#888888',
						textRotationAngle: -50,
						axisSize: 'auto'
					},
					colorScheme: 'scheme05',
					seriesGroups:
						[
						 {
							 type: 'line',
							 showLabels: true,
							 symbolType: 'circle',
							 valueAxis:
							 {
								 minValue: 0,
								 description: 'Project Count',
								 axisSize: 'auto',
								 tickMarksColor: '#888888'
							 },
							 series: [
							          { dataField: 'recCount', displayText: 'Recommended Release' ,  labelOffset: {x: 0, y: -18},
							        	  colorFunction: function (value, itemIndex, serie, group) {
							        		  return '#006600';
							        	  }
							          },
							          { dataField: 'nonRecCount', displayText: 'Non Recommended Release', labelOffset: {x:0 , y: -18},
							        	  colorFunction: function (value, itemIndex, serie, group) {
							        		  return '#FF0000';
							        	  }
							          },
							          { dataField: 'pidNotSelected', displayText: 'PID Not selected', labelOffset: {x:0 , y: -18},
							        	  colorFunction: function (value, itemIndex, serie, group) {
							        		  return '#0066CC';
							        	  }
							          }
							          ]
						 }
						 ]
			};
			// setup the chart

			$('#jqxChart').jqxChart(settings);

		}

	};



}());


//Module for NCE Activity
var nceActivity = (function(){

	function displayNCEActivityData(actList) {

		var div=$("#nceActivity");
		div.empty();
		if(actList.length>0){		
			for(var i=0; i<actList.length; i++){
				var str=actList[i].usrName;

				if (str.contains("-")){
					var a= str.indexOf("-");
					var b = str.indexOf("(");
					var c = str.indexOf("-", a+1);
					var res1 = str.substring(0,a);
					var res2 = str.substring(b,c-1);
					nceMediaBody="<div class='row' style='display:inline-block'><div class='col-lg-1'><a class='pull-left' href='#'><img style='height:44px;width:33px;'class='media-object' src='http://wwwin.cisco.com/dir/photo/std/" + actList[i].usrId + ".jpg'></a></div><div class='col-lg-8' style='font-size:12px; width:400px; word-wrap:break-word; padding-top:5px;' class='media-body1'><a href='http://wwwin-tools.cisco.com/dir/details/"+actList[i].usrId +"' ondata-toggle='tooltip' style='font-size:12px;'>"+res1+"</a>"+res2+")"+" "+(actList[i].operation).toLowerCase() + " for "+ actList[i].release +"( "+ actList[i].projName+" ) </div> <div class='col-lg-3' style='font-size:12px;color:grey;float:right;margin-right: 5px' class='media-body2'>"+ actList[i].opnSinceTime+"</div></div><hr/>";
					div.append(nceMediaBody);
				}
				else
				{
					var d = str.indexOf("(");
					var e = str.indexOf(")");
					var res3 = str.substring(0,d-1);
					var res4 = str.substring(d,e);
					nceMediaBody="<div class='row' style='display:inline-block' ><div class='col-lg-1'><a class='pull-left' href='#'><img style='height:44px;width:33px;'class='media-object' src='http://wwwin.cisco.com/dir/photo/std/" + actList[i].usrId + ".jpg'></a></div><div class='col-lg-8' style='font-size:12px;width:400px; word-wrap:break-word; padding-top:5px;' class='media-body1'><a href='http://wwwin-tools.cisco.com/dir/details/"+actList[i].usrId +"' ondata-toggle='tooltip' style='font-size:12px;'>"+res3+"</a>"+" "+res4+")"+" "+(actList[i].operation).toLowerCase() + " for "+ actList[i].release + "( "+ actList[i].projName+" )</div> <div class='col-lg-3' style='font-size:12px;color:grey;float:right;margin-right: 5px' class='media-body2'>"+ actList[i].opnSinceTime+"</div></div><hr/>";
					div.append(nceMediaBody);
				}
			}
		}else{
			nceMediaBody='<br> <br> <span>No data to display</span>';
			div.append(nceMediaBody);
		}
	}
	return{
		getNCEActivityData:function(actType){
			$('#dropdownMenu1').html(actType+'<span class="caret"></span>');
			$.ajax({
				url:"/SORAServices/customerWs/getNCEActivity.json",
				type:"GET",
				data:"actType="+actType+"&custId="+customerId,
				success:function(data){
					$('#activitiesLoader').hide();
					displayNCEActivityData(data.actList);
				},
				error : function (XMLHttpRequest, textStatus, errorThrown) {
				} 
			});


		},	

	};
}());

var projMap;
var lcProjCount=0;
function constructLcTable(data,lcStatus){
	var table=$("#LcProjectDiv");
	table.html("");
	if($('#'+lcStatus+"_label").html()=="0"){
		alert("No projects in "+lcMap[lcStatus]+" state.");
		return;
	}

	lcProjCount=0;
	table.addClass("display");
	table.prop("cellspacing","0");
	table.attr("width","100%");

	var row="<thead><tr><th width='20%'>Project Name</th><th width='10%'>Primary Engineer</th><th width='10%'>Delivery Engineer</th><th width='10%'>Life Cycle Status</th><th width='65%'>Justification</th><th width='15%'>Update</th></tr></thead>";
	table.append(row);
	var number = new RegExp('[0-9]+');
	projMap = new Object();

	for(var i in data["projList"]){
		if(i.match(number)){
			var projObj=new Object();
			lcProjCount++;
			projObj["osType"]=data["projList"][i]["osType"];
			projObj["startRel"]=data["projList"][i]["startRel"];
			projMap[data["projList"][i]["projId"]]=projObj;
			row="<tr id='"+data["projList"][i]["projId"]+"_row'><td>"+data["projList"][i]["projName"]+"</td>";
			row+="<td>"+data["projList"][i]["priEngr"]+"</td>";
			row+="<td>"+data["projList"][i]["deliveryEngr"]+"</td>";
			if((data["loggedInUser"]==data["projList"][i]["priEngr"] || data["loggedInUser"]==data["projList"][i]["deliveryEngr"] || data["AccessToAll"]=="1" )){
				row+="<td>"+getComboBox(data["projList"][i]["projId"],lcStatus)+"</td>"+
				"<td id='"+data["projList"][i]["projId"]+"_justificationCol'><textarea class='form-control' id= '"+data["projList"][i]["projId"]+"_justification'cols=90 rows=1></textarea></td><td><button onclick='updateLCStatus("+data["projList"][i]["projId"]+","+data["projList"][i]["projId"]+")' class='btn btn-default'>Update</button></td></tr>";
			}else{
				row+="<td> No Access </td><td></td></tr>";
			}

			table.append(row);

		}
	}
	$('#projCount').html(lcProjCount);
	$('#lcStatus').html(lcMap[lcStatus]);
	$('#lcProjectModal').modal('show');
}	

function closeLcModal(){
	$('#lcProjectModal').modal('hide');
	lifeCycleWidget();
}

function updateLCStatus(idPrefix, projId){
	var state ;
	if(idPrefix != "editProj"){
		state = $('#'+idPrefix+'_lcDropDown').val();
	}else{
		state = $('#editLcStatusDpd').val();
	}
	console.log("lc state ==>"+state);

	if(state=="status" && idPrefix != "editProj"){
		alert("Choose a Status ");
		return false;
	}
	if(state=="R"){

		var isChecked = $('#'+idPrefix+'_ssOib').is(':checked');

		var emptyBugDetails=false;
		if(isChecked==true){
			var bugList = {
					bugs: []
			};

			$('#'+idPrefix+'_rejTableSSoib').each(function() {

				var $table = $(this);

				var rows = $table.find('tr').get();

				if(rows.length<=2){
					alert("Enter SS/OIB bug details");
					emptyBugDetails=true;
				}
				var column_header;

				$.each(rows, function(rowindex, row) {

					if (rowindex<=1) {

					}
					else {
						// data rows
						var cols = row.cells;

						bugList.bugs.push({ 
							"bugId" 	:$(cols[0]).html(),
							"bugType" 	:$(cols[1]).html(),
							"comment" 	:encodeURIComponent($(cols[2]).html()) 
						});

					}
				});
			});

			if(emptyBugDetails==true){
				return false;
			}

			var targetRel;
			var osType;
			if(idPrefix == "editProj"){
				targetRel = editProjectModel.startRel;
				osType = editProjectModel.osType;
			}else{
				targetRel = projMap[projId]["startRel"];
				osType = projMap[projId]["osType"];
			}
			var params = "comments=SS/OIB Bugs&status="+state+"&projectId="+projId+"&targetRel="+targetRel+
			"&custId="+customerId+"&osType="+osType+"&bugData="+JSON.stringify(bugList)+"&ssOib=true";
			$.ajax({
				url: "/SORAServices/component/UpdateProjectStatus.json",
				type : "POST",
				dataType: "json",
				data: params,
				success: function (data) {

					if(idPrefix != "editProj"){
						$("#"+projId+"_row").remove();
						lcProjCount=lcProjCount-1;
						$('#projCount').html(lcProjCount);
					}else{
						browseProjectsClass.browseProject(browseProjectStart,browseProjectEnd);
						lifeCycleWidget();
					}

				},
				error: function (err) {
					console.log(err);
				}
			});

		}else{
			var comments=$("#"+idPrefix+"_non_ss_oib_justification").val();
			if(comments != undefined && $.trim(comments).length == 0){
				alert("Please enter Rejection Comments.");
				return false;
			}
			if(comments != undefined && comments.length>4000){
				alert("Comments too long");
				return false;
			}

			$.ajax({
				url: "/SORAServices/component/UpdateProjectStatus.json",
				type : "POST",
				dataType: "json",
				data:"comments="+encodeURIComponent(comments)+"&status="+state+"&projectId="+projId,
				success: function (data) {
					if(idPrefix != "editProj"){
						$("#"+projId+"_row").remove();
						lcProjCount=lcProjCount-1;
						$('#projCount').html(lcProjCount);
					}else{
						browseProjectsClass.browseProject(browseProjectStart,browseProjectEnd);
						lifeCycleWidget();
					}

				},
				error: function (err) {
					console.log(err);
				}
			});

		}
	}else{
		var comments=$("#"+idPrefix+"_justification").val();

		if(comments != undefined && comments.length>4000){
			alert("Comments too long");
			return false;
		}

		if(state=="P"||state=="DP"){

			if(!validateProductionConfirmation(idPrefix,state)){
				return false;
			}

			if(!saveLifeCycleTrackerData(idPrefix, projId)){
				return false;
			}

		}


		$.ajax({
			url: "/SORAServices/component/UpdateProjectStatus.json",
			type : "POST",
			dataType: "json",
			data:"comments="+encodeURIComponent(comments)+"&status="+state+"&projectId="+projId,
			success: function (data) {
				if(idPrefix != "editProj"){
					$("#"+projId+"_row").remove();
					lcProjCount=lcProjCount-1;
					$('#projCount').html(lcProjCount);
				}else{
					browseProjectsClass.browseProject(browseProjectStart,browseProjectEnd);
					lifeCycleWidget();
				}

			},
			error: function (err) {
				console.log(err);
			}
		});

	}

	return false;

} 

function saveLifeCycleTrackerData(idPrefix, projId){

	console.log("saveLifeCycleTrackerData() started...");
	var trackDataList = {
			trackDataValues: []
	};
	var validFlag=true;
	var rowCount=0;
	var percentageValue=0;
	$('#'+idPrefix+'_deployedData').each(function() {

		var $table = $(this);

		var rows = $table.find('tr').get();

		var column_header;

		$.each(rows, function(rowindex, row) {

			if (rowindex<1) {

			}
			else {
				rowCount++;
				// data rows
				var cols = row.cells;


				if($(cols[1]).find('input').val()==""||$(cols[2]).find('input').val()==""){
					alert("Enter valid values for total and complaint devices");
					validFlag=false;
					return false;

				}

				if(parseInt($(cols[1]).find('input').val())<parseInt($(cols[2]).find('input').val())){

					alert("Number of Compliant devices  "+$(cols[2]).find('input').val()+ "  must be lesser or equal to total devices  "+$(cols[1]).find('input').val());
					validFlag=false;
					return false; 
				}

				if(isNaN(Number($(cols[1]).find('input').val()))||isNaN(Number($(cols[2]).find('input').val()))){
					alert("Enter valid values for total and complaint devices");
					validFlag=false;
					return false; 

				}


				if(!(((Number($(cols[1]).find('input').val())%1)===0) && ((Number($(cols[2]).find('input').val())%1)===0))){

					alert("Enter valid values for total and complaint devices");
					validFlag=false;
					return false; 
				}

				percentageValue= percentageValue+(($(cols[2]).find('input').val()/$(cols[1]).find('input').val())*100);
				if(Number($(cols[1]).find('input').val())>=0 && Number($(cols[2]).find('input').val()>=0)){
					trackDataList.trackDataValues.push({ 
						"trackName" :$(cols[0]).html(),
						"trackId" 	:trackIdList[rowindex-1]+'',
						"total" 	:$(cols[1]).find('input').val().trim(),
						"complaint" :$(cols[2]).find('input').val().trim()
					});
				}else{
					alert("Enter valid vaues for total and complaint devices");
					validFlag=false;
					return false; 
				}

			}
		});

	});

	if(!validFlag){
		return false;
	}
	var totalConformance=0;
	if(rowCount!=0){
		totalConformance = percentageValue/rowCount;
	}
	var osType;
	if(idPrefix == "editProj"){
		osType = editProjectModel.osType;
	}else{
		osType = projMap[projId]["osType"];
	}

	//alert("trackPresent value is now==>"+trackPresent);
	if(trackPresent){
		$.ajax({
			url:"/SORAServices/component/UpdateLifeCycleData.json",
			type:"POST",
			data:"projectId="+projId+"&custId="+customerId+"&osType="+osType+"&trackData="+JSON.stringify(trackDataList)+"&conformance="+totalConformance,
			success:function(data){
				return true;
			},
			error : function (XMLHttpRequest, textStatus, errorThrown) {
				return false;
			} 
		});
	}
	return true;
}

function roundVal(val){
	var dec = 2;
	var result = Math.round(val*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}

function validateProductionConfirmation(idPrefix,state){

	var validFlag=true;
	$('#'+idPrefix+'_deployedData').each(function() {

		var $table = $(this);

		var rows = $table.find('tr').get();

		var column_header;

		$.each(rows, function(rowindex, row) {

			if (rowindex<1) {

			}
			else {
				// data rows
				var cols = row.cells;
				if(state=="P"){
					if(parseInt($(cols[1]).find('input').val())!=parseInt($(cols[2]).find('input').val())){

						alert("Number of Compliant devices  "+$(cols[2]).find('input').val()+ "  must equal to total devices  "+$(cols[1]).find('input').val()+" for Production state");
						validFlag=false;
						return false; 
					}
				}
				if(parseInt($(cols[1]).find('input').val())==0 && parseInt($(cols[2]).find('input').val())==0){

					alert("Both the values can't be zero. Please enter valid values.");
					validFlag=false;
					return false; 

				}



			}
		});

	});

	if(!validFlag){
		return false;
	}


	return true;


}


function initiateLcTable(){
	$('#LcProject').dataTable( {
		"scrollY":        "300px",
		"scrollCollapse": true,
		"paging":         false,

	});
}


function getComboBox(projId,lcStatus){


	var id=projId+"_lcDropDown";
	var selectOptions='<select id="'+id+'" onchange="setJustificationColumn(\''+id+'\','+projId+','+projId+',true)">';
	selectOptions+="<option value='status' selected=true>Select State</option> " ;
	selectOptions += getLcStatusUIStr(lcStatus);
	/*if(lcStatus=="S"){

				selectOptions+="<option value='status' selected=true>Select State</option> <option value='D'>Delivered</option><option value='R'>Rejected</option>";

			}else if(lcStatus=="D"){
				selectOptions+="<option value='status' selected=true>Select State</option><option value='S'>Selected</option> <option value='TV'>Testing/Validation</option><option value='A'>Accepted</option><option value='R'>Rejected</option>";

			}else if(lcStatus=="TV"){
				selectOptions+="<option value='status' selected=true>Select State</option> <option value='D'>Delivered</option><option value='A'>Accepted</option><option value='R'>Rejected</option>";

			}		
			else if(lcStatus=="A"){
				selectOptions+="<option value='status' selected=true>Select State</option> <option value='TV'>Testing/Validation</option><option value='D'>Delivered</option><option value='R'>Rejected</option><option value='DP'>Deployed</option><option value='P'>Production</option>";

			}else if(lcStatus=="R"){

				selectOptions+="<option value='status' selected=true>Select State</option><option value='S'>Selected</option><option value='D'>Delivered</option><option value='TV'>Testing/Validation</option><option value='A'>Accepted</option><option value='DP'>Deployed</option><option value='P'>Production</option>";


			}else if(lcStatus=="P"){



					selectOptions+="<option value='status' selected=true>Select State</option><option value='A'>Accepted</option><option value='DP'>Deployed</option><option value='R'>Rejected</option>";


			}else if(lcStatus=="DP"){


					selectOptions+="<option value='status' selected=true>Select State</option><option value='A'>Accepted</option><option value='DP'>Deployed</option><option value='R'>Rejected</option><option value='P'>Production</option>";


				}*/
	selectOptions+="</select>";


	return selectOptions;


}

//function getLcStatusUIStr(lcStatus){
//var selectOptions = "";

//if(lcStatus=="S"){

//selectOptions+="<option value='D'>Delivered</option>" +
//"<option value='R'>Rejected</option>";

//}else if(lcStatus=="D"){
//selectOptions+="<option value='S'>Selected</option>" +
//" <option value='TV'>Testing/Validation</option>" +
//"<option value='A'>Accepted</option>" +
//"<option value='R'>Rejected</option>";

//}else if(lcStatus=="TV"){
//selectOptions+="<option value='D'>Delivered</option>" +
//"<option value='A'>Accepted</option>" +
//"<option value='R'>Rejected</option>";

//} else if(lcStatus=="A"){
//selectOptions+=" <option value='TV'>Testing/Validation</option>" +
//"<option value='D'>Delivered</option>" +
//"<option value='R'>Rejected</option>" +
//"<option value='DP'>Deployed</option>" +
//"<option value='P'>Production</option>";

//}else if(lcStatus=="R"){

//selectOptions+="<option value='S'>Selected</option>" +
//"<option value='D'>Delivered</option>" +
//"<option value='TV'>Testing/Validation</option>" +
//"<option value='A'>Accepted</option>" +
//"<option value='DP'>Deployed</option>" +
//"<option value='P'>Production</option>";


//}else if(lcStatus=="P"){

//selectOptions+="<option value='A'>Accepted</option>" +
//"<option value='DP'>Deployed</option>" +
//"<option value='R'>Rejected</option>";


//}else if(lcStatus=="DP"){

//selectOptions+="<option value='A'>Accepted</option>" +
//"<option value='DP'>Deployed</option>" +
//"<option value='R'>Rejected</option>" +
//"<option value='P'>Production</option>";


//}

//return selectOptions;
//}


//function to create LC status DPD based on allowed lc status
function getLcStatusUIStr(lcStatus){

	var selectOptions = "";
	var allowedStatusArr = allowedLcStatusAll[lcStatus];
	console.log(allowedStatusArr);

	for(var i in allowedStatusArr){
		console.log(lcTextMap[allowedStatusArr[i]]);
		lcStatusOption = lcTextMap[allowedStatusArr[i]];
		if(allowedStatusArr.hasOwnProperty(i)){
			selectOptions += "<option value='"+allowedStatusArr[i]+"'>"+lcStatusOption+"</option>";
		}

	}
	console.log(selectOptions);
	return selectOptions;
}

function getEditLcStatusDpd(lcStatus){
	var selectOptions='<select id="editLcStatusDpd" onchange="setJustificationColumn(\'editLcStatusDpd\',\'editProj\','+editProjectModel.projId+',true)">';
	selectOptions+="<option value='status' selected=true>Select State</option> " ;
	selectOptions += getLcStatusUIStr(lcStatus);
	selectOptions+="</select>";
	return selectOptions;
}


function toggleLcDiv(){
	var projUsage = $('#usageEdit').val();
	console.log("projUsage ==>"+projUsage);
	if(projUsage == "I"){
		$('#editProjLcDiv').hide();
		$('#editProjLcJustDiv').hide();
	}
}

function setJustificationColumn(lcStatusDpdId, idPrefix, projId){
	var td="";

	if($("#"+lcStatusDpdId).val() != undefined){
		lcStatus=$("#"+lcStatusDpdId).val();
	}

	if(idPrefix == 'editProj'){
		$('#editProjLcJustDiv').show();
	}

	console.log('lcStatus ==>'+lcStatus);
	if(lcStatus=='R'){
		td = 'Reason for Rejection: <input style="margin-left:10px;" id="'+idPrefix+'_ssOib" type="radio" name="rejectionReason" checked onClick="updateRejectionJustification(true,\''+idPrefix+'\')"> SS/OIB</input>'+
		'<input name="rejectionReason" onClick="updateRejectionJustification(false,\''+idPrefix+'\')" style="margin-left:10px;" type="radio"> Others</input><br>'+
		"<div id='"+idPrefix+"_rejDiv'>"+
		"<table id='"+idPrefix+"_rejTableSSoib' class='table table-bordered'>"+
		"<tbody>"+
		"<tr><th>Bug Id</th><th>Bug Type</th><th>Comments</th><th></th></tr>"+
		"<tr>"+
		"<td><input class='form-control' type='text' id='"+idPrefix+"_bugId'></td>"+
		"<td><select id='"+idPrefix+"_bugType'><option value='SS' >SS</option><option value='OIB'>OIB</option></select></td>"+
		"<td><textarea class='form-control' rows='1' cols='90' id='"+idPrefix+"_ss_oib_justification'></textarea></td>"+
		'<td><a onclick="addBug(\''+idPrefix+'\')" href="#" ><span class="glyphicon glyphicon-plus-sign"></span></a></td>'+
		"</tr>"+
		"</tbody>"+
		"</table>"+
		"<table id='"+idPrefix+"_rejTableNonSSoib' style='display:none'>"+
		"<tr>"+
		"<td> <b>Comments: </b></td>"+
		"<td><textarea rows='1' cols='90' id='"+idPrefix+"_non_ss_oib_justification' class='form-control'></textarea></td>"+
		"</tr>"+
		"</table>"+
		"</div>";
	}else if(lcStatus=='DP' || lcStatus=='P'){
		td="<table class='table table-bordered' id='"+idPrefix+"_deployedData'></table>";
		showLifeCycleTrackerData(idPrefix, projId);
		td+="Comments : <textarea rows='1' cols='90' id='"+idPrefix+"_justification' class='form-control'></textarea>";

	}else{
		td="<textarea rows='1' cols='90' id='"+idPrefix+"_justification' class='form-control'></textarea>";
	}
	$("#"+idPrefix+"_justificationCol").html("");
	$("#"+idPrefix+"_justificationCol").html(td);

	return td;
}

var trackIdList = new Array();
var trackPresent=true;
function showLifeCycleTrackerData(idPrefix, projId){

	$.ajax({
		url:"/SORAServices/component/getTrackDetailsData.json",
		type:"POST",
		data:"projectId="+projId,
		success:function(data){
			if(data.status=="failure"){

				console.log("Inside getTrackDetailsData.json failure block");
				trackPresent=false;

			}else{

				var tableData="<tr><th>Track</th><th>Total number of devices</th><th>Number of compliant devices</th><th>Percentage</th></tr>";
				for(var i=0;i<data.dataList.length;i++){
					trackIdList[i] = data.dataList[i].trackId;
					var percentage;
					if(data.dataList[i].totalNumberofDevices==-1||data.dataList[i].numberofComplaintDevices==-1){
						data.dataList[i].totalNumberofDevices="";
						data.dataList[i].numberofComplaintDevices="";
						percentage="";
					}else{
						percentage=(data.dataList[i].numberofComplaintDevices/data.dataList[i].totalNumberofDevices)*100;
						if(isNaN(percentage)){
							percentage="NA";
						}else{
							percentage= roundVal(percentage)+'%';
						}
					}

					tableData+="<tr><td>"+data.dataList[i].trackName+"</td>" +
					"<td><input maxlength='6' type='text' class='form-control' value='"+data.dataList[i].totalNumberofDevices+"'></td>" +
					"<td><input maxlength='6' class='form-control' type='text' value='"+data.dataList[i].numberofComplaintDevices+"'></td>" +
					"<td>"+percentage+"</td></tr>";


				}
				$('#'+idPrefix+'_deployedData').html(tableData);

			}


		},
		error : function (XMLHttpRequest, textStatus, errorThrown) {

		} 
	});

	return true;

}


function addBug(projId){

	var bugId=$("#"+projId+"_bugId").val();
	var bugType=$("#"+projId+"_bugType").val();
	var bugComments=$("#"+projId+"_ss_oib_justification").val();

	if(!validateBugs(bugId)){

		return false;
	}

	if(bugComments==""||$.trim(bugComments).length == 0){

		alert("Please enter comments");
		return false;
	}

	if(bugComments.length>3996){
		alert("Comments too long");
		return false;
	}

	var rows = $("#"+projId+"_rejTableSSoib").find('tr').get();
	for(var i=2;i<rows.length;i++){
		var cols= rows[i].cells;
		if($(cols[0]).html()==bugId){
			alert($(cols[0]).html()+" is already added");
			return false;
		}
	}
	var row='<tr id='+projId+'_'+bugId+'><td>'+bugId+'</td><td>'+bugType+'</td><td>'+bugComments+
	'</td><td><a href="#" class="delIcon"  onclick="onDeleteClick(\''+projId+'_'+bugId+'\');"><span class="glyphicon glyphicon-minus-sign"></span></a></td></tr>';
	$("#"+projId+"_rejTableSSoib tr:last").after(row);
	$("#"+projId+"_bugId").val("");
	$("#"+projId+"_ss_oib_justification").val("");
	$("#"+projId+"_bugType").val("SS");


}

function onDeleteClick(trId){
	var ok = confirm("Are you sure you want to delete?"); 
	if(ok){
		$("#"+trId).remove();
	}else{

	}

}

function validateBugs(bugIds){



	var bugsArray = bugIds.split(",");
	var bug = "";
	var bugRegEx = new RegExp("CSC[a-z]{2}[0-9]{5}");
	if(bugsArray.length>100){

		alert("Please enter less than 100 bugs");
		return false;
	}

	for ( var i = 0; i < bugsArray.length; i++ )
	{
		if(trim(bugsArray[i]).length==0){
			alert("Bug value is empty");
			return false;
		}

		if(trim(bugsArray[i]).length != 10){
			//bugid length is not 10.
			alert(bugsArray[i] + " is not matched with bug pattern, please change it.");
			return false;
		}
		if(trim(bugsArray[i]).match(bugRegEx)){
			//alert("bug id "+ i + "==>"+ bugIdArr[i] + " is match"); 
		}else{
			alert(bugsArray[i] + " is not matched with bug pattern, please change it.");
			return false;
		}
	}

	return true;

}

function updateRejectionJustification(isSSoib,idPrefix){
	if(isSSoib){
		$("#"+idPrefix+"_rejTableSSoib").css("display","");
		$("#"+idPrefix+"_rejTableNonSSoib").css("display","none");
	}else{
		$("#"+idPrefix+"_rejTableSSoib").css("display","none");
		$("#"+idPrefix+"_rejTableNonSSoib").css("display","");
	}

}

function loadAllWidgets(){

	browseProjectsClass.browseProject('','');
	lifeCycleWidget();
	setDatePicker();
	periodicBugs.getPeriodicProjectData();
	getLcProdFamily();
	nceActivity.getNCEActivityData("All");
	qualityDashboardClass.loadBargraph();
	qualityDashboardClass.getAsBuProdFamily('','');
	getRecProdFamily();
	//getInitialPosition();
}

function saveCustomerForUser(customerId,custName){
	selectedCustName=custName;

	var param={
			"label":encodeURIComponent(custName),
			"value":encodeURIComponent(customerId)
	};
	console.log("Customer Saved"+JSON.stringify(param));
	$.ajax({
		url:"/SORAServices/customerWs/saveCustomerForUser.json",
		type:"POST",
		dataType:'json',
		data:JSON.stringify(param), 
		contentType: 'application/json',
		success:function(data){
			console.log(data);
		},
		error : function (XMLHttpRequest, textStatus, errorThrown) {
		} 
	});


}

$(document).ready(function() {

	var success = function(data){
		if(data.value!=null&&data.value!=""){
			customerId=data.value;
			selectedCustName=data.label;
			$("#customer-search").val(decodeURIComponent(data.label));
			loadAllWidgets();
		}else{
			customerSelectionView=new CustomerSelectionView({ el: $("#modal")});
			$('#modal').modal('show');


		}

	};

	var error = function(data){

	};
	var param='';

	if(customerIdModal!=null&&customerIdModal!=""){
		customerId=customerIdModal;
		loadAllWidgets();
		$('#customer-search').val(customerNameModal);
	}else{
		ajaxCall("/SORAServices/customerWs/getCustomerForUser.json","GET","json",param,success,error,false);

	}

	var startParent="";
	/*$(".portletConnect").swappable({
		  items: '.portlet',
		  cursorAt: {top:-5},
		  start: function(event, ui) {
		      var divId = ui.item[0].id;
		      console.log(divId);
		      startParent = ui.item[0].parentNode.id;
		      console.log("startParent:"+startParent);
		    },
		  update: function( event, ui ) {
			  var divId = ui.item[0].id;
			  console.log(divId);
			  var endParent = ui.item[0].parentNode.id;
			  console.log("endParent:"+endParent);
			  var swapDivId=widgetPosMap[endParent];
			  widgetPosMap[endParent]=divId;
			  widgetPosMap[startParent]=swapDivId;

			  $.ajax({
					url:"/SORAServices/customerWs/addWidgetPos.json?action=update",
					type:"POST",
					dataType:'json',
					data:JSON.stringify(widgetPosMap), 
					contentType: 'application/json',
					success:function(data){
						if(data){
							console.log("widget position updated successfully..");
						}else{
							console.log("error in updating widget position..");
						}
					},
					error : function (XMLHttpRequest, textStatus, errorThrown) {
						console.log("Error getting data"+errorThrown);
					} 
				});
		  }
		}).disableSelection();*/


	$(document).on('click','.dropdown-menu li a', function(){

		console.log('test'+$(this).text());
		//$('#dropdownMenu1').html($(this).text()+'<span class="caret"></span>');

		var a =$.trim($(this).text());
		nceActivity.getNCEActivityData(a);
	});

	showAutoPeriodicModal();
	//getInitialPosition();		
});

function showAutoPeriodicModal(){

	var success = function(data){
		if(data.projs.length > 0){
			populateAutorunModal(data.projs);
		}else{
			console.log("no data to display..");
		}
	};

	var error = function (XMLHttpRequest, textStatus, errorThrown){
		console.log("Error getting data"+errorThrown);
	};

	ajaxCall("/SORAServices/customerWs/getAutoPeriodicDisableProj.json","GET","json","userId="+loggedInUser,success,error,true);
}

function populateAutorunModal(projs){
	/*var headingStr = "<div class='row'><div class='col-lg-3'>Project Name</div><div class='col-lg-3'>Target Release</div><div class='col-lg-3'>Product Family</div><div class='col-lg-3'>AutoPeriodic Run Needed</div></div><br/>";
	var rowStr = "";
	for(var i=0; i<projs.length; i++){
		rowStr += "<div class='row'><div class='col-lg-3' style='word-wrap:break-word;'>"+projs[i].projLink+"</div><div class='col-lg-3' style='word-wrap:break-word;'>"+projs[i].startRel+"</div><div class='col-lg-3' style='word-wrap:break-word;'>"+
		projs[i].prodFamily+"</div><div class='col-lg-3' style='word-wrap:break-word;'><select id="+projs[i].projId+" style='width: auto;'>" +
		"<option value='N'>No</option><option selected='selected' value='Y'>Yes</option></select></div></div><br/>";
	}*/
	var rowStr = "";
	for(var i=0; i<projs.length; i++){
		rowStr += "<tr><td>"+projs[i].projLink+"</td><td>"+projs[i].startRel+"</td><td>"+projs[i].prodFamily+"</td><td>"+"<select id="+projs[i].projId+" style='width: auto;'>" +
		"<option value='N'>No</option><option selected='selected' value='Y'>Yes</option></select>"+"</td></tr>";
	}
	$("#autorunTabBody").html(rowStr);
	$('#autorun').modal('show');
}

function updatePeriodicRunNeeded(){
	var updatedProj=[];
	$("#autorun select option:selected").each(function () {
		var projId=$(this).parent().attr("id");
		var isAutoRunNeeded=$(this).val();
		console.log(projId);
		console.log(isAutoRunNeeded);
		var proj=new Object();
		proj.projId=projId;
		proj.isAutoRunNeeded=isAutoRunNeeded;
		updatedProj.push(proj);
	});
	console.log("size of updatedProj:"+updatedProj.length);
	$.ajax({
		url:"/SORAServices/customerWs/updateAutoRunNeeded.json",
		type:"POST",
		dataType:'json',
		data:"proj="+JSON.stringify(updatedProj),
		success:function(data){
			if(data){
				alert("Periodic Autorun updated successfully!!");
				$('#autorun').modal('hide');
				console.log("Autorun needed updated successfully..");
			}else{
				alert("Error in updating Periodic Autorun!!");
				console.log("error in updating autorun needed..");
			}
		},
		error : function (XMLHttpRequest, textStatus, errorThrown) {
			console.log("Error getting data"+errorThrown);
		} 
	});
}

function getInitialPosition(){

	var success = function(data){
		displayWidget(data);
	};

	var error = function (XMLHttpRequest, textStatus, errorThrown){
		console.log("Error getting data"+errorThrown);
	};

	ajaxCall("/SORAServices/customerWs/getWidgetPos.json","GET","json","userId="+loggedInUser+"&custId="+customerId,success,error,true);

}

var widgetPosMap={};

function populateDefaultPositionMap(){

	widgetPosMap["outer1"]="periodicBugDiv";
	widgetPosMap["outer2"]="lcDashDiv";
	widgetPosMap["outer3"]="nceActDiv";
	widgetPosMap["outer4"]="asBUDiv";
	widgetPosMap["outer5"]="relTrendDiv";
	widgetPosMap["userId"]=loggedInUser;
	widgetPosMap["custId"]=customerId;
}

function displayWidget(data){

	if(!jQuery.isEmptyObject(data)){
		widgetPosMap=data;
		widgetPosMap["userId"]=loggedInUser;
		widgetPosMap["custId"]=customerId;

		displayWidgetAsPerPosition();
	}else{
		populateDefaultPositionMap();

		$.ajax({
			url:"/SORAServices/customerWs/addWidgetPos.json?action=insert",
			type:"POST",
			dataType:'json',
			data:JSON.stringify(widgetPosMap), 
			contentType: 'application/json',
			success:function(data){
				if(data){
					console.log("widget position updated successfully..");
				}else{
					console.log("error in updating widget position..");
				}
			},
			error : function (XMLHttpRequest, textStatus, errorThrown) {
				console.log("Error getting data"+errorThrown);
			} 
		});
		displayWidgetAsPerPosition();
	}
}

function displayWidgetAsPerPosition(){
	var outerDivContent={};
	for(var pos in widgetPosMap){
		var innerDivId=widgetPosMap[pos];
		var innerHtml = "<div id='"+innerDivId+"' class='panel panel-success portlet'>" + $('#'+innerDivId).html()+"</div>";
		outerDivContent[pos]=innerHtml;
	}
	for(var pos in outerDivContent){
		$('#'+pos).html(outerDivContent[pos]);
	}

}

$(function() {
	$( "#customerSearchModal").autocomplete({
		source: "/SORAServices/customerWs/getCustomerList.json",
		minLength: 2,
		zIndex: 7000,
		appendTo:'#custAutoCompleteResult',
		select: function( event, ui ) {
			$("#customer-search").val(ui.item.label);
			customerId=ui.item.value;
			saveCustomerForUser(customerId,ui.item.label);
			loadAllWidgets();
			$('#modal').modal('hide');
			return false;// Prevent the widget from inserting the value.
		}
	});


});




function getRecProdFamily(){
	console.log('in recProdFamily()');
	console.log('customerId = ' + customerId);

	$.ajax({
		url:"/SORAServices/tools/getProdFamily.json?custName="+selectedCustName+"&custId="+customerId,
		type:"GET",
		success:function(data){
			displayRecProdFamily(data);
		},
		error : function (XMLHttpRequest, textStatus, errorThrown) {
			console.log("Error getting data"+errorThrown);

		} 
	});
}

function displayRecProdFamily(data){
	rtProdFamilyAvailable=false;
	var dropdown=$("#recProdFamily");
	dropdown.html("");
	var number = new RegExp('[0-9]+');
	var option=null;
	dropdown.append(option);
	for(var i in data){
		if(i.match(number)){
			option="<option value='"+data[i]+"'>"+data[i]+"</option>";
			dropdown.append(option);
			rtProdFamilyAvailable=true;
		}
	}
	if(!rtProdFamilyAvailable){
		option="<option value='none'>No Product Family Available For Customer</option>";
		dropdown.append(option);
		document.getElementById("noDataMessage").style.display='block'; 
		document.getElementById("rtScreen").style.display='none'; 
		document.getElementById("togleRadio").style.display='none'; 
	}
	displayReleaseTrendingGraph();

}

function setRecProdFamilySelect(){
	displayReleaseTrendingGraph();
}


var myseriesGroups=[];
var sourceNew=[];
var month=[];
var chartData='';
var displayLable=false;

function displayReleaseTrendingGraph(){
	myseriesGroups=[];
	sourceNew=[];
	month=[];

	if(rtProdFamilyAvailable){
		recProdFamily=$("#recProdFamily").val();
		console.log('selectedCustName ='+selectedCustName);
		console.log('recProdFamily ='+recProdFamily);

		releaseTrendingScreenParams["cust_name"] = selectedCustName;
		releaseTrendingScreenParams["custName"] = customerId;
		releaseTrendingScreenParams["s_prodFam"] = recProdFamily;
		releaseTrendingScreenParams["endDatePicker"] = relTrendingEnd;
		releaseTrendingScreenParams["startDatePicker"] = relTrendingStart;

		document.getElementById("noDataMessage").style.display='none'; 
		document.getElementById("loadingId").style.display='block'; 
		document.getElementById("rtScreen").style.display='block'; 
		document.getElementById("togleRadio").style.display='block'; 

//		console.log(myseriesGroups);
//		console.log(myseriesGroups[0]);
		var source =
		{
				datatype: "json",
				datafields: [
				             { name: 'monthLabel',type: 'string' },
				             { name: 'totalCount',type: 'number' }
				             ],
				             url: '/SORAServices/tools/releaseTrendingCW.json?cust_name='+selectedCustName+'&custName='+customerId+'&s_prodFam='+recProdFamily+'&endDatePicker='+relTrendingEnd+'&startDatePicker='+relTrendingStart
		};

		var dataAdapter = new $.jqx.dataAdapter(source, { async: false, autoBind: true, 
			loadComplete: function (data) {
				chartData=data;
				createChart(data);

			},
			loadError: function (xhr, status, error) { alert('Error loading "' + source.url + '" : ' + error); } });


	}

}

function lableChange(changedFlag){
	displayLable=changedFlag;
	createChart(chartData);

}

function createChart(data){

	myseriesGroups=[];
	sourceNew=[];
	month=[];

	var j=0;
	var noDataMsgFlag=true;
	var maxYaxisCount=0;

	var toolTipCustomFormatFn = function (value, itemIndex, serie, group, categoryValue, categoryAxis) {
		var releaseLabel = data[serie.displayText][itemIndex]["releaseLabel"];
		return data[serie.displayText][itemIndex]["releaseLabel"]+','+ data[serie.displayText][itemIndex]["totalCount"];
	};

	for(key in data){
		var data_model = data[key].length;
		//	console.log('data_model ='+data_model);
		for (var i = 0; i < data_model; i++) {
			//	console.log('data[key][0]["totalCount "] ='+data[key][i]["totalCount"]);
			month.push({'Month':data[key][i]["monthLabel"]});
			if(maxYaxisCount<Number(data[key][i]["totalCount"])){
				maxYaxisCount=Number(data[key][i]["totalCount"]);
				console.log('maxYaxisCount ='+maxYaxisCount);
			}
		}
		break;//break required as x asix need only 1 time. i.e month and year.

	}

	for(key in data){
		var data_model = data[key].length;
		//	console.log('data_model ='+data_model);
		for (var i = 0; i < data_model; i++) {
			//	console.log('data[key][0]["totalCount "] ='+data[key][i]["totalCount"]);

			if(maxYaxisCount<Number(data[key][i]["totalCount"])){
				maxYaxisCount=Number(data[key][i]["totalCount"]);
				console.log('maxYaxisCount ='+maxYaxisCount);
			}
		}


	}


	for(key in data){
		noDataMsgFlag=false;
		sourceNew[j]=[];
		var data_model = data[key].length;
		var visibleYaxis=true;
		//	console.log('data_model ='+data_model);
		if(j>0){
			visibleYaxis=false;
		}


		for (var i = 0; i < data_model; i++) {
			//console.log('data[key][0]["totalCount "] ='+data[key][i]["totalCount"]);
			sourceNew[j].push({totalCount:Number(data[key][i]["totalCount"])});
			//	console.log('sourceNew[j][i] ='+sourceNew[j][i]["totalCount"]);
			//	console.log('sourceNew[j][i].totalCount ='+sourceNew[j][i].totalCount);
		}



		myseriesGroups.push(  {
			type: 'line',
			toolTipFormatFunction: toolTipCustomFormatFn,
			showLabels: true,
			valueAxis:
			{
				displayValueAxis: true,
				description: 'Included count',
				//minValue: -1,
				//axisSize: 'auto',
				minValue: 0,
				maxValue: maxYaxisCount,
				visible: visibleYaxis,

				tickMarksColor: '#888888'
			},
			source: sourceNew[j],
			series:  [
			          {  dataField: 'totalCount', displayText: key ,formatFunction: function (value, itemIndex) {
			        	  var releaseLabel = data[key][itemIndex]["releaseLabel"];
			        	  if(displayLable){
			        		  return data[key][itemIndex]["releaseLabel"]+','+ data[key][itemIndex]["totalCount"];
			        	  }else{
			        		  return "";
			        	  }

			          } 
			          }
			          ]
		} 
		);
		//console.log('sourceNew[j] ='+sourceNew[j]);
		//console.log('sourceNew[j] key ='+j);
		j++;
	}

	if(noDataMsgFlag){
		document.getElementById("noDataMessage").style.display='block'; 
		document.getElementById("rtScreen").style.display='none';
		document.getElementById("togleRadio").style.display='none'; 
	}
	document.getElementById("loadingId").style.display='none'; 
	console.log('myseriesGroups =' + myseriesGroups);	  


	var settings = {
			title: "Release Trending Graph Data",
			description: "",
			enableAnimations: true,
			showLegend: true,
			padding: { left: 5, top: 5, right: 40, bottom: 5 },
			titlePadding: { left: 90, top: 0, right: 0, bottom: 10 },
			source: month,
			source: month,
			xAxis:
			{
				dataField: 'Month',
				showGridLines: true,
				textRotationAngle: 315,
				unitInterval: 1


			},
			colorScheme: 'scheme02',
			seriesGroups: myseriesGroups
	};
	// setup the chart

	$('#chartContainer').jqxChart(settings);



}
function releaseTrendingScreen(){
	var url="/SORAServices/tools/releaseTrending.htm";
	//	console.log(browseProjectStart+"::"+browseProjectEnd);
	var params=releaseTrendingScreenParams;
	var form = $('<form method="POST" action="' + url + '" target="_blank">');
	$.each(params, function(k, v) {

		form.append($('<input type="hidden" name="' + k +
				'" value="' + v + '">'));
	});
	$('body').append(form);
	form.submit();

}

function alignCellText(text){

	if(text == null || text == undefined){
		return "";
	}	
	return "<div style='margin-left: 4px; margin-top: 4px' >"+text+"</div>";
}

function resetProjColumns(){

}

var lcMap= new Object();
lcMap['S']="selected";
lcMap['D']="delivered";
lcMap['R']="rejected";
lcMap['DP']="deployed";
lcMap['P']="production";
lcMap['TV']="testing/validation";
lcMap['A']="accepted";
