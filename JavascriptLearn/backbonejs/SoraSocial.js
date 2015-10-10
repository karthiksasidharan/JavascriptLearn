var alertVal=0;
dojo.addOnLoad(function(){
	
console.log("Insora social Primary"+selTabPri+"In sora Social Secondary"+selTabSec);	
	
	try {
		if(selTabPri != "")setPrimaryItemSelected(selTabPri);
		
		if(selTabPri == "criticalbugTracker"){
			
			dojo.style(dojo.byId("dashBoradId"),"display","none");
			dojo.style(dojo.byId("projectTabsId"),"display","none");
			dojo.style(dojo.byId("criticalBugTabsId"),"display","block");
			if(selTabSec != "")setSecondaryItemSelected(selTabSec);
		}
		else if(selTabPri =="dashborad_page"){
			dojo.style(dojo.byId("dashBoradId"),"display","block");
			dojo.style(dojo.byId("projectTabsId"),"display","none");
			if(selTabSec != "")setSecondaryItemSelected(selTabSec);	
		}
		else{
			
				dojo.style(dojo.byId("dashBoradId"),"display","none");
				dojo.style(dojo.byId("criticalBugTabsId"),"display","none");
				if(selTabSec != "")setSecondaryItemSelected(selTabSec);	
		}
		
		if(selTabPri != "project_page"){
			dojo.style(dojo.byId("projectTabsId"),"display","none");
		}
		else{
			
			if(selTabSec != "")setSecondaryItemSelected(selTabSec);	
		}
		//initalizing Dialog for social comments like.
		$("#showPeopleDialog").dialog({title:'SORA Social',autoOpen:false,width:'auto',height:'auto', modal: true,resizable:false,draggable:false});
		$("#showPeopleDialog").dialog('option', 'position', [500,450]);
		
	}catch(e){
	   console.log("ERROR : Exception in soraheader for tabs "+e);
	}
		
});

function setPrimaryItemSelected(priItemId){
	dojo.query("#navigation li").forEach(function(item){
		if(dojo.attr(item,"id") !== null){
			//console.log(dojo.attr(item,"id"));
			if(priItemId == dojo.attr(item,"id")){
				dojo.addClass(item,"active");
			}
			else{
				dojo.removeClass(item,"active");
			}
		}
	});
}

function setSecondaryItemSelected(secItemId){
		
	
	console.log("setSecondaryItemSelected");
	
	if(selTabPri=="project_page")
	{
	if(projStsWeightage < 10);
	
	else if(projStsWeightage == 10){
		if(osType=="O")hideLessThanEqualTenOther();
		else hideLessThanEqualTen();
	}
				
	else if(projStsWeightage > 10 && projStsWeightage <= 30){
		if(osType=="O")hideLessThanEqualThirtyOther();
		else hideLessThanEqualThirty();
	}
	else if(projStsWeightage > 30 && projStsWeightage <= 36){
		hideLessThanEqualThirtySix();
	}			
	
	dojo.query("#projectTabs li").forEach(function(item){
		if(dojo.attr(item,"id") !== null){
			//console.log(dojo.attr(item,"id"));
			if(secItemId == dojo.attr(item,"id")){
				dojo.addClass(item,"current");
			}
			else{
				dojo.removeClass(item,"current");
			}
		}
	});
	}
		else if(selTabPri=="dashborad_page"){
		
		dojo.query("#dashBoardTabs li").forEach(function(item){
			if(dojo.attr(item,"id") !== null){
				//console.log(secItemId +"<==>"+dojo.attr(item,"id"));
				if(secItemId == dojo.attr(item,"id")){
					dojo.addClass(item,"current");
				}
				else{
					dojo.removeClass(item,"current");
				}
			}
		});
	
		
	}
		else if (selTabPri=="critical_bug"){
			dojo.style(dojo.byId("criticalBugTabsId"),"display","block");
			dojo.query("#criticalBugTrackerTabs li").forEach(function(item){
				if(dojo.attr(item,"id") !== null){
					//console.log(secItemId +"<==>"+dojo.attr(item,"id"));
					if(secItemId == dojo.attr(item,"id")){
						dojo.addClass(item,"current");
					}
					else{
						dojo.removeClass(item,"current");
					}
				}
			});
			
		}
}

function navItemHandler(item){
				
	var navigation_item = item;						
	if((selTabSec == navigation_item))return;            
	{			
					
		if(navigation_item == "create_search" || navigation_item == "project_page")goToCreateSearch();				
		else if(navigation_item == "bug_filter"){				
			var component = "ALL";					
			if(dojo.byId("component") != null) component = dojo.byId("component").value;					
			goToBugFilter("/filter/BugFilter.htm",component);					
		}		
		else if (navigation_item=="dashborad_page"){
			dojo.style(dojo.byId("dashBoradId"),"display","block");
			dojo.style(dojo.byId("projectTabsId"),"display","none");
			dojo.style(dojo.byId("criticalBugTabsId"),"display","none");
		} 
		
		else if(navigation_item == "query_progress")goToQueryProgress();				
		else if(navigation_item == "profile_screen")goToScreen("/profile/ProfileScreen.htm");				
		else if(navigation_item == "bug_list")goToScreen("/buglist/BugList.htm");				
		else if(navigation_item == "component_summary")goToScreen("/component/ComponentSummary.htm");				
		else if(navigation_item == "report_generation")goToScreen("/report/ReportGen.htm");				
		else if(navigation_item == "component_selector")goToScreen("/filter/ComponentSelector.htm");				
		else if(navigation_item == "view_filter")goToScreen("/filter/ViewFilter.htm");				
		else if(navigation_item == "optional_filter")goToScreen("/filter/OptionalFilter.htm");	
		else if(navigation_item == "pr_dashboard")goToDasboardScreen("/tools/showBugsPerRelease.htm");	
		else if(navigation_item == "prd_dashboard")goToDasboardScreen("/dashBoard/prodFamilyDashboard.htm");	
		else if(navigation_item == "cfd_ifd")goToDasboardScreen("/tools/showMetricsCFD.htm");
		else if(navigation_item == "lc_dashboard")goToDasboardScreen("/dashBoard/lifeCycleDashboard.htm");
		else if(navigation_item == "relTrending")goToDasboardScreen("/tools/releaseTrending.htm");
		else if(navigation_item == "criticalbugTracker"){
			dojo.style(dojo.byId("dashBoradId"),"display","none");
			dojo.style(dojo.byId("projectTabsId"),"display","none");
			dojo.style(dojo.byId("dashBoradId"),"display","none");
			dojo.style(dojo.byId("criticalBugTabsId"),"display","block");
			goToDasboardScreen("/bugTracker/manageBin.htm");
			
		}
		else if(navigation_item == "tab2"){goToDasboardScreen("/bugTracker/manageBin.htm");}
		else if(navigation_item == "tab1"){goToDasboardScreen("/bugTracker/manageBugs.htm");}
		else if(navigation_item == "manageSubs"){goToDasboardScreen("/bugTracker/manageSubs.htm");}
		else if(navigation_item == "brp_filter")goToScreen("/brp/BRPMain.htm");
		else if(navigation_item == "qryOpt_dashboard"){goToDasboardScreen("/dashBoard/queryOptDashBoard.htm");}
		else if(navigation_item == "ss_dashboard"){goToDasboardScreen("/dashBoard/showSocialComments.htm");}
		else if(navigation_item == "sr_dashboard"){goToDasboardScreen("/tools/showServiceRequestData1.htm");}
		//else if(navigation_item == "ac_dashboard"){goToDasboardScreen("/dashBoard/accountCommentDashboard.htm");}
	}            
}
		
function goToDasboardScreen(screenLink){
	document.location.href = contextPath + screenLink;
}
       
       
function goToScreen (screenName){		
	if(!validateProjectId());			
	else document.location.href = contextPath + screenName + "?projectId=" + projId;			
}
         		
function goToQueryProgress(){
	if(!validateProjectId());				
	else document.location.href = contextPath+"/filter/QueryProgress.htm?command=status&&projectId=" + projId;				
}

function goToBugFilter(screenName,component){                

	if(!validateProjectId());                    			
	else{ 
		document.location.href = contextPath+screenName + "?projectId=" + projId + "&component="+component;
	}
	return;                    			
}

function goToCreateSearch(){		
	document.location.href = contextPath+"/project/create.htm";			
}

function validateProjectId(){                		
	if(projId =="" || projId==null){                    			
		alert("Please select a project from search project results.");                        				
		return false;                        				
	}                    			
	else return true;                    			
}    

function hideLessThanEqualTen(){
	dojo.style(dojo.byId("optional_filter"),"display","none");
	dojo.style(dojo.byId("query_progress"),"display","none");
	dojo.style(dojo.byId("component_summary"),"display","none");
	dojo.style(dojo.byId("bug_list"),"display","none");
	dojo.style(dojo.byId("view_filter"),"display","none");
	dojo.style(dojo.byId("bug_filter"),"display","none");
	dojo.style(dojo.byId("report_generation"),"display","none");
	dojo.style(dojo.byId("brp_filter"),"display","none");
}

function hideLessThanEqualTenOther(){			
	dojo.style(dojo.byId("query_progress"),"display","none");
	dojo.style(dojo.byId("component_summary"),"display","none");
	dojo.style(dojo.byId("bug_list"),"display","none");
	dojo.style(dojo.byId("view_filter"),"display","none");
	dojo.style(dojo.byId("bug_filter"),"display","none");
	dojo.style(dojo.byId("report_generation"),"display","none");
	dojo.style(dojo.byId("brp_filter"),"display","none");
}

function hideLessThanEqualThirty(){
	dojo.style(dojo.byId("query_progress"),"display","none");
	dojo.style(dojo.byId("component_summary"),"display","none");
	dojo.style(dojo.byId("bug_list"),"display","none");
	dojo.style(dojo.byId("view_filter"),"display","none");
	dojo.style(dojo.byId("bug_filter"),"display","none");
	dojo.style(dojo.byId("report_generation"),"display","none");
	dojo.style(dojo.byId("brp_filter"),"display","none");
}

function hideLessThanEqualThirtyOther(){
	dojo.style(dojo.byId("brp_filter"),"display","none");
	dojo.style(dojo.byId("component_summary"),"display","none");
	dojo.style(dojo.byId("bug_list"),"display","none");
	dojo.style(dojo.byId("view_filter"),"display","none");
	dojo.style(dojo.byId("bug_filter"),"display","none");
	dojo.style(dojo.byId("report_generation"),"display","none");
}

function hideLessThanEqualThirtySix(){			
	dojo.style(dojo.byId("brp_filter"),"display","none");
	dojo.style(dojo.byId("component_summary"),"display","none");
	dojo.style(dojo.byId("bug_list"),"display","none");
	dojo.style(dojo.byId("view_filter"),"display","none");
	dojo.style(dojo.byId("bug_filter"),"display","none");
	dojo.style(dojo.byId("report_generation"),"display","none");
}



dojo.require("dojox.data.QueryReadStore");

function createRemedyCase(){
	
	var heading = $('#heading').val();
	if(heading==null ||heading==""){
		alert("Heading is mandatory");
		return false;
	}
	var summary = $('#summary').val();
	console.log("data entered"+heading+summary);
	
	$.ajax({
		url:"/SORAServices/remedy/createCase.json",
		type:"POST",
		data:"heading="+heading+"&summary="+summary,
		success:function(data){
			if(data.status=="failure"){
				alert("Issue in Creating Case Kindly Create cases from srm.cisco.com");
				$('#window').jqxWindow('close');
			}else{
				alert(data.caseNumber)
				$('#window').jqxWindow('close');
				
			}
			
			
		},
		error : function (XMLHttpRequest, textStatus, errorThrown) {
			console.log("Error with case creation");
			$('#window').jqxWindow('close');
		} 
	});
}

function getCurrentCases(){
	
	
     
}
var basicDemo = (function () {
    //Adding event listeners
    function _addEventListeners() {
    	 $('#window').jqxWindow('resizable', true);
    	 $('#window').jqxWindow('draggable', true);
        
        $('#createCase').click(function () {
        	$('#window').css("display","block");
            $('#window').jqxWindow('open');
        });
        $('#cancel').click(function () {
            $('#window').jqxWindow('close');
        });
        $('#create').click(function () {
           createRemedyCase();
        });
        
        $('#tab').on('selected', function (event) {
            var pageIndex = event.args.item + 1;
            console.log(pageIndex);
            if(pageIndex==2){
            	getCurrentCases();
            }
        });
        
    };
    
    //Creating the demo window
    function _createWindow() {
        $('#window').jqxWindow({showCollapseButton: true, maxHeight: 600, maxWidth: 700, minHeight: 200, minWidth: 200, height: 600, width: 700, theme: 'energyblue',isModal: true, autoOpen:false});
        $('#tab').jqxTabs({ height: '100%', width:  '100%', theme: 'energyblue' });
        
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
} ());

dojo.addOnUnload(function(){
	
	scroll(0,0);
});

function showLoader(){
	scroll(0,0);
	var hght = document.documentElement.scrollHeight;
	dojo.style(dojo.byId("overlay"),"height",hght+"px");
	dojo.style(dojo.byId("overlay"),"display","block");
}

function showCustomLoader(customText){
	scroll(0,0);
	var hght = document.documentElement.scrollHeight;
	dojo.style(dojo.byId("overlay"),"height",hght+"px");
	dojo.style(dojo.byId("overlay"),"display","block");
	dojo.attr(dojo.byId("loaderText"),"innerHTML",customText);
}

function hideLoader(){
	dojo.byId("overlay").style.display="none";
}

function aboutHandler(){
	var version;
	try{
		dojo.xhrGet({
			url:"/SORAServices/admin/getVersion.json",
			handleAs:"json",
			load: function(data){				
				version=data[1];
				showAboutPopup(data[1],data[2]);								
			}
		});								
	}
	catch(e){alert("exception"+e);}
}

function showAboutPopup(version,engr_rel){
	  alert("Version : "+version + "\n"  +"Build      : " + engr_rel);
}

function healthHandler(item){
   window.open("/SORAServices/admin/showServerHealth.htm","",'width=200,height=100');
}


function checkUser(groupId,url){
     	
 showLoader();
	 dojo.xhrGet({
		    url:"/SORAServices/admin/checkAdminAcess.json?groupId="+groupId,
		    handleAs:"json",
		    load: function(data){
		    	if(data.success=="true"){
		    		document.location.href =url;
		        	return ;
		        }
		        else{
		        	hideLoader();
			        alert("You dont have permissions to access this page .Please contact SORA-SUPPORT team !");
		        }
		    },
		    error:function(err){
		    	hideLoader();
			    alert(err);
		    }
		});
 }


function view_edit_comments(bug_id, val){
	 
	 if(projectInfoModel.isLocked=='Y'){
		  alert("The Project is used in a Merge Project and is Currently in Read Only Mode");
		  return;
	  }	
	
      var wd      = screen.width  - 4 ;
      var hd      = screen.height - 100 ;
      var ddtswin = window.open(contextPath+
          '/admin/getCommentInfo.htm?bugIds='+bug_id+'&p_chld_window=' + val,
          'ViewEditComment',
          'toolbar=0,location=0,directories=0,' +
          'status=0,menubar=0,resizable=1,' +
          'top=0,left=0,' +
          'scrollbars=1,width=' + wd + ',height=' + hd) ;
}

function view_AS_Comments(bug_id, val){
	var wd      = screen.width  - 4 ;
    var hd      = screen.height - 100 ;
    var ddtswin = window.open(contextPath+
        '/admin/viewCommentInfo.htm?bugIds='+bug_id+'&p_chld_window=' + val,
        'viewComments',
        'toolbar=0,location=0,directories=0,' +
        'status=0,menubar=0,resizable=1,' +
        'top=0,left=0,' +
        'scrollbars=1,width=' + wd + ',height=' + hd) ;	
}

function show_email_de(bug_id) {
	//To be checked while implementing save
	//dojo.byId('bugIdHover').value=bug_id;
	email_de = window.open(contextPath+
	    '/buglist/EmailDE.htm?projectId='+projId+'&bugId='+bug_id,
	    'email_de',
	    'toolbar=0,location=0,left=0,top=0,directories=0, status=0,menubar=0,resizable=yes,scrollbars=0,width=880,height=750');
}

function show_feedback(bug_id,bug_headline,project){
	var bug_id= bugModel.bugId,bug_headline=bugModel.headLine,project=projectInfoModel.projectId;
	var bug_headline_details=bug_headline+':'+project;
	feedback =  window.open(contextPath+
    '/buglist/Feedback.htm?&bugId='+bug_id+'&bug_headline='+bug_headline_details,
    'Feedback',
    'toolbar=0,location=0,left=0,top=0,directories=0,status=0,menubar=0,resizable=yes,scrollbars=1,width=700,height=480');
    }

function show_explain_bug(bug_id){
   expln_win = window.open(contextPath+
   	   '/admin/ExplainBug.htm?&bugId='+bug_id +
       '&projectId='+projId,
      'expln_win',
      'toolbar=0,location=0,directories=0,' +
      'status=0,menubar=0,resizable=1,' +
      'resizeable=yes,scrollbars=1,' +
      'scrollbars=yes,width=700,height=480');
}

function show_news_group(bug_ID) {

  // Changed the URL as per RAT-632
  //ng_url = "http://topic.cisco.com/vivisimo/cgi-bin/query-meta?q=ca-defect-feedback+" + bug_ID + "&sa=Search&v%3Asources=Newsgroup";
	ng_url = "https://wwwin-tools.cisco.com/srchui/Search.do?method=getSearchResults&queryText=ca-defect-feedback+" + bug_ID + "&repos=news";
  news_group_window = window.open(ng_url, 'newsgroupwin', '');
}

function getAsHighlightedVal(node){
	if(dojo.trim(node.innerHTML) == "Highlight Bug"){
		console.log("--Inside if--");
		return 1;
	}else{
		return 0;
	}	
}

function swapHighlightButton(node){
	if(dojo.trim(node.innerHTML)=="Remove Highlight"){
		node.innerHTML = "Highlight Bug";
	}else{
		node.innerHTML="Remove Highlight";
	}
}
function highlight_bug(bugId,node){
	var asHighlightedBug = getAsHighlightedVal(node);
	var url =  "/SORAServices/buglist/SetASHighlightedBug.json";
	dojo.xhrGet({
	    url:url,
	    handleAs:"json",
	    content: {
	    	projId:projId,
			bugId: bugId,
			asHighlightedBug:asHighlightedBug
		},
	    load: function(data){
	    	if(data.IS_AS_HIGHLIGHTED_BUG==true){
	    		swapHighlightButton(node);
	    	}
	    }, 
		error:function(err){
			 //   	hideLoader();
		    alert("Sorry could not process the request."+err);
		    
	    }
	});
}


function checkUserForComp(){
 	
    showLoader();
  	 dojo.xhrGet({
  		    url:"/SORAServices/admin/checkIosxrAdmin.json",
  		    handleAs:"json",
  		    load: function(data){
  		    	if(data.success=="true"){
  		    		document.location.href ="/SORAServices/admin/XRDiffComp.htm";
  		        	return ;
  		        }
  		        else{
  		        	hideLoader();
  			        alert("You dont have permissions to access this page .Please contact SORA-SUPPORT team !");
  		        }
  		    },
  		    error:function(err){
  		    	hideLoader();
  			    alert(err);
  		    }
  		});
}

function getSelectedRadio(buttonGroup) {
	   if (buttonGroup[0]) { 
	      for (var i=0; i<buttonGroup.length; i++) {
	         if (buttonGroup[i].checked) {
	            return i;
	         }
	      }
	   } else {
	      if (buttonGroup.checked) { return 0; } // if the one button is checked, return zero
	   }
	   return -1;
} 
	
function getSelectedRadioValue(buttonGroup) {
	   var i = getSelectedRadio(buttonGroup);
	   if (i == -1) {
	      return "";
	   } else {
	      if (buttonGroup[i]) { // Make sure the button group is an array (not just one button)
	         return buttonGroup[i].value;
	      } else { // The button group is just the one button, and it is checked
	         return buttonGroup.value;
	      }
	   }
}
var configSearchView;
var projInfoView;
var bugView;
var lockedView;
var noBugView;
var configModel = new ConfigModel();
var projectInfoModel  = new ProjectInfoModel();
var accessListModel = new AccessListModel();
var bugModel=new BugModel();
var mergeBugModel= new MergeBugModel();
var hiraPopupmodel = new HiraPopupModel();
var addToBinPopupModel  = new AddToBinPopupModel();
var likedByUser;
var disLikedByUser;

//Timer for Locked bugs
var bugLoadTime;
var idForShowClock;
var isNotificationShown=0;
var timeOutView;

var idForShowComponentSummary;
var isUpdatedBug=false;
var reviewView;
function checkForComponentSummary(){
    if(isUpdatedBug){					
			clearInterval(idForShowComponentSummary);
			window.location =contextPath+'/component/ComponentSummary.htm?projectId='+projId;
	}
}
var bugId;

function showClock(){
	var now = new Date();
	var min = Math.floor((now-bugLoadTime)/ 1000 / 60);
	$('#timeLocked').html("Bug Locked for :  "+(min)+" Minutes");
	if(min>=notificationTime&&isNotificationShown==0){
		isNotificationShown=1;
		timeOutView = new ResetTimeView({el:$("#modal")});
		$('#modal').modal('show');
	}
	
	if(min>=lockTime){
		if(projectInfoModel.isMerged!='Y'){
			timeOutView = new TimeOutView({el:$("#modal"),model:bugModel});
		}else{
			timeOutView = new TimeOutView({el:$("#modal"),model:mergeBugModel});
		}
		$('#modal').modal('show');
	}
	
}
function clearClock(){ 
	isNotificationShown=0;
	clearInterval(idForShowClock);
	$('#timeLocked').html("");
}

function resetClock(){
	var bug;
	if(projectInfoModel.isMerged!='Y'){
		bug=bugModel.bugId;
	}else{
		bug=mergeBugModel.bugId;
	}
	
	$.ajax({
		url:"/SORAServices/social/resetSocialLock.json",
		type:"GET",
		data:"bugId="+bug,
		success:function(data){
			
		},
		error : function (XMLHttpRequest, textStatus, errorThrown) {
			
		} 
	});
	$('#modal').modal('hide');
	bugLoadTime=new Date();
	isNotificationShown=0;
	
}

var projectInfo = (function(){
	console.log("Project Id"+projId);
	function createProjectInfo(){
		$.ajax({
			url:"/SORAServices/project/getProjectDetails.json",
			type:"GET",
			data:"projectId="+projId,
			success:function(data){
				console.log("Project details"+data);
				showLoader();
				projectInfoModel.setValues(data);
				if(data.isMerged == 'Y'){
					projInfoView = new MergeProjectInfoView({ el: $("#projectInformation"),model:projectInfoModel });
				}else{
					projInfoView = new ProjectInfoView({ el: $("#projectInformation"),model:projectInfoModel });
				}
				configModel.setValues("");
				if(projectInfoModel.projReviewState!="1"){
					if(projectInfoModel.isMerged=="Y"){
						$.ajax({
							url:"/SORAServices/project/getMergeProjectDetails.json",
							type:"GET",
							data:"projectID="+projId,
							success:function(data){
								configModel.setValues(data.parentProjects);
								
								
								
							},
							error : function (XMLHttpRequest, textStatus, errorThrown) {
								
							} 
						});
					}
					 
					
						$("#searchString").autocomplete({
								source: " ",
						        minLength: 2,
						        width:300,
						        zIndex: 7000,
						        appendTo:'#autoCompleteResult'
						        
						});
				
				}
				
				createAccessInfo();
			},
			error : function (XMLHttpRequest, textStatus, errorThrown) {
				
			} 
		});
		
	} 



	function createAccessInfo(){
		$.ajax({
			url:"/SORAServices/social/getAccessList.json",
			type:"GET",
			data:"projectId="+projId+"&osType="+projectInfoModel.osType+"&startRel="+projectInfoModel.startRel,
			success:function(data){
				console.log("Access data2"+data);
				accessListModel.setValues(data);
				hiraPopupmodel.setValues('');
			},
			error : function (XMLHttpRequest, textStatus, errorThrown) {
				
			} 
		});
		
	}
	
	function addEventListners(){
		$('#projectInfoLink').hover(
				function(){
					$('#projectInformation').show();
				},
				function(){
					
					$('#projectInformation').hide();
				}
		);
	}

	return {
		
		init:function(){
			createProjectInfo();
			addEventListners();
			
		}
	};

}());


function constructDataAndView(data){
	hideLoader();
	if(data.errorMsg==null||data.errorMsg==""){
		clearClock();
		if(data.lockedBy==null||data.lockedBy==""||data.lockedBy==userId){
			isUpdatedBug=false;
			if(projectInfoModel.isMerged=='Y'){
				mergeBugModel.setValues(data);
				bugView=new MergeBugView({ el: $("#bugInformation"),model:mergeBugModel});
				bugId=mergeBugModel.bugId;
			}else{
				bugModel.setValues(data);
				bugView=new BugView({ el: $("#bugInformation"),model:bugModel});
				bugId=bugModel.bugId;
			}
			
			if(data.lockedBy==userId){
				//User has the lock
				if(projectInfoModel.isLocked!='Y'){
					//Not in review mode
					if(!(projectInfoModel.projReviewState!=null&&projectInfoModel.projReviewState!=0 &&projectInfoModel.projReviewState!=2&& projectInfoModel.isMerged!='Y')){
						bugLoadTime = new Date();
						idForShowClock = setInterval(function(){showClock();},1000);
					}
				}
			}
		}else{
			if(projectInfoModel.isLocked!='Y'){
				if(projectInfoModel.isMerged=='Y'){
					mergeBugModel.setValues(data);
					bugView=new MergeBugView({ el: $("#bugInformation"),model:mergeBugModel});
					lockedView = new LockedView({el:$("#modal"),model:mergeBugModel});
					
				}else{
					bugModel.setValues(data);
					bugView=new BugView({ el: $("#bugInformation"),model:bugModel});
					lockedView = new LockedView({el:$("#modal"),model:bugModel});
					
				}
				$('#modal').modal('show');
			}
		}
		
	}else{
		//when project does not have the bug
		alert(data.errorMsg);
		return false;
	}
	actb(dojo.byId('tags'),tagList);
	return true;
}

var bugInfo=(function(){
	console.log("Parameters passed to get bug"+projId+component+tempFilter+tagName);
	
	
	function createBugInfo(){
		$.ajax({
			url:"/SORAServices/social/getBug.json",
			type:"GET",
			data:"projectId="+projId+"&component="+component+"&tempFilter="+tempFilter+"&tagName="+tagName+"&activeComponent="+activeComponent,
			success:function(data){
				getTags();
				constructDataAndView(data);
				
			},
			error : function (XMLHttpRequest, textStatus, errorThrown) {
			} 
		});
	}
	
	function addEventListners(){
	}
	
	
	function getTags(){
		$.ajax({
			url:"/SORAServices/social/getTags.json",
			type:"GET",
			success:function(data){
				tagList=data.items;
				actb(dojo.byId('tags'),data.items);
				
			},
			error : function (XMLHttpRequest, textStatus, errorThrown) {
			} 
	});
		
	}
	
	
	function validateBugs(bugIds){
		var bugsArray = bugIds.split(",");
		var bug = "";
		var bugRegEx = new RegExp("CSC[a-z]{2}[0-9]{5}");
		if(bugsArray.length>1){
			alert("Please enter 1 bug");
			return false;
		}
		for ( var i = 0; i < bugsArray.length; i++ ){
			if(trim(bugsArray[i]).length==0){
				alert("Bug value is empty");
				return false;
			}
			if(trim(bugsArray[i]).length != 10){
				//bugid length is not 10.
				alert(bugsArray[i] + " does not matched with bug pattern, please change it.");
				return false;
			}
			if(trim(bugsArray[i]).match(bugRegEx)){
				//alert("bug id "+ i + "==>"+ bugIdArr[i] + " is match"); 
			}else{
				alert(bugsArray[i] + " does not matched with bug pattern, please change it.");
				return false;
			}
		}
		return true;
	}
	
	return {
		init:function(){
			createBugInfo();
			addEventListners();
			//getSocialCountDetails();
			
		},
		unlockBug:function(bug){
			$.ajax({
				url:"/SORAServices/social/unlockBug.json",
				type:"GET",
				data:"bugId="+bug,
				success:function(data){
						
				},
				error : function (XMLHttpRequest, textStatus, errorThrown) {
				} 
			});
			
		},
		searchBug:function(){
			var existingBug ;
			if(projectInfoModel.isMerged=='Y'){
				existingBug=mergeBugModel.bugId;
			}else{
				existingBug=bugModel.bugId;
			}	
			var bugidSearch=$('#searchedBug').val();
			if(!validateBugs(bugidSearch)){
				return false;
			}
			
			showLoader();
			$.ajax({
				url:"/SORAServices/social/searchBug.json",
				type:"GET",
				data:"projectId="+projId+"&bugId="+bugidSearch,
				success:function(data){
						
						if(data.lockedBy==null||data.lockedBy==""||data.lockedBy==userId){
							var status = constructDataAndView(data);
							if(status!=false){
								$('#buttons').hide();
								bugInfo.unlockBug(existingBug);
							}
							
						}else{
							hideLoader();
							alert("The Bug has been locked by "+data.lockedBy+" for Social Scrubbing");
							
						}
						
				},
				error : function (XMLHttpRequest, textStatus, errorThrown) {
				} 
			});
			
		},
		
		reset:function(){
			bugView.render();
		},	
		
		nextBug:function(param){
			
			clearClock();
			$('#modal').modal('hide');
			showLoader();
			$.ajax({
				url:"/SORAServices/social/nextBug.json",
				type:"POST",
				data:param,
				success:function(data){
					constructDataAndView(data);
				},
				error : function (XMLHttpRequest, textStatus, errorThrown) {
				} 
			});
			
			
			
		},
		
		previousBug:function(param){
			
			clearClock();
			$('#modal').modal('hide');
			showLoader();
			
			$.ajax({
				url:"/SORAServices/social/previousBug.json",
				type:"POST",
				data:param,
				success:function(data){
					constructDataAndView(data);
				},
				error : function (XMLHttpRequest, textStatus, errorThrown) {
				} 
			});
			
		},
		
		
		updateBug:function(param){

			

			clearClock();
			$('#modal').modal('hide');
			showLoader();
			$.ajax({
				url:"/SORAServices/social/updateBug.json",
				type:"POST",
				data:param,
				success:function(data){
					constructDataAndView(data);
				},
				error : function (XMLHttpRequest, textStatus, errorThrown) {
				} 
			});
		},
		
		skipBug:function(){
			var action;

			var comp,bug;
			if(projectInfoModel.isMerged=='Y'){
				bug=mergeBugModel.bugId;
				comp=mergeBugModel.internalComp;
			}else{
				bug=bugModel.bugId;
				comp=bugModel.internalComp;
			}
		

			var param='bugId='+bug+"&projectId="+projId+"&component="+comp+"&tempFilter="+tempFilter+"&tagName="+tagName+"&activeComponent="+activeComponent;
			
			if(projectInfoModel.isMerged=='Y'){
				action=mergeBugModel.skipAction;
			}else{
				action=bugModel.skipAction;
			}
			if(action=="next"){
				clearClock();
				$('#modal').modal('hide');
				showLoader();
				$.ajax({
					url:"/SORAServices/social/skipBug.json",
					type:"POST",
					data:param,
					success:function(data){
						constructDataAndView(data);
					},
					error : function (XMLHttpRequest, textStatus, errorThrown) {
					} 
				});
			}else if(action=="nextComponent"){
				
				clearClock();
				$('#modal').modal('hide');
				showLoader();
				$.ajax({
					url:"/SORAServices/social/skipComponent.json",
					type:"POST",
					data:param,
					success:function(data){
						hideLoader();
						isUpdatedBug=false;
						if(data.errorMsg==null||data.errorMsg==""){
							if(data.lockedBy==null||data.lockedBy==""||data.lockedBy==userId){
								if(projectInfoModel.isMerged=='Y'){
									mergeBugModel.setValues(data);
									bugView=new MergeBugView({ el: $("#bugInformation"),model:mergeBugModel});
									bugId=mergeBugModel.bugId;
								}else{
									bugModel.setValues(data);
									bugView=new BugView({ el: $("#bugInformation"),model:bugModel});
									bugId=bugModel.bugId;
								}
								
								
								if(data.lockedBy==userId){
									//User has the lock
									if(projectInfoModel.isLocked!='Y'){
										bugLoadTime = new Date();
										idForShowClock = setInterval(function(){showClock();},1000);
									}
								}
							}else{
								if(projectInfoModel.isLocked!='Y'){
									if(projectInfoModel.isMerged=='Y'){
										mergeBugModel.setValues(data);
										bugView=new MergeBugView({ el: $("#bugInformation"),model:mergeBugModel});
										lockedView = new LockedView({el:$("#modal"),model:mergeBugModel});
										bugId=mergeBugModel.bugId;
									}else{
										bugModel.setValues(data);
										bugView=new BugView({ el: $("#bugInformation"),model:bugModel});
										lockedView = new LockedView({el:$("#modal"),model:bugModel});
										bugId=bugModel.bugId;
									}
									$('#modal').modal('show');
								}
							}
							
						}else{
							//1.next component does not have any bug .
							//2. last component
							
							if(data.showNextComp=='true'||data.showNextComp==true){
								activeComponent=data.activeComponent;
								var comp,bug;
								if(projectInfoModel.isMerged=='Y'){
									bug=mergeBugModel.bugId;
									comp=data.internalComp;
								}else{
									bug=bugModel.bugId;
									comp=data.internalComp;
								}

								var paramValues='bugId='+bug+"&projectId="+projId+"&component="+comp+"&tempFilter="+tempFilter+"&tagName="+tagName+"&activeComponent="+activeComponent;
								
								var variables = { 
													noBugHeading:'No Bug found in Component matching Filter Criteria',
													noBugText:data.errorMsg,
													noBugFunction:'javascript:bugInfo.nextComponent(\''+data.activeComponent+'\',\''+paramValues+'\');',
													noBugAction:'Next Component',
													noBugComponent:data.activeComponent
												 };
								
								
								noBugView = new NoBugView({el:$("#modal"),model:variables});
								$('#modal').modal('show');
							}else{
								var variables = { 
										noBugHeading:'No More Bugs Found Matching Criteria',
										noBugText:'There are no more bugs matching the filter criteria.',
										noBugFunction:'javascript:bugInfo.componentSummary(\'\');',
										noBugAction:'Go to Component Summary'
									 };
								noBugView = new NoBugView({el:$("#modal"),model:variables});
								$('#modal').modal('show');
							}
						}
						actb(dojo.byId('tags'),tagList);
					},
					error : function (XMLHttpRequest, textStatus, errorThrown) {
					} 
				});
				
				
			}
			
		},
		
		
		nextComponent:function(component,param){
			
			clearClock();
			$('#modal').modal('hide');
			showLoader();
			$.ajax({
				url:"/SORAServices/social/nextComponent.json",
				type:"POST",
				data:param,
				success:function(data){
					hideLoader();
					isUpdatedBug=false;
					if(data.errorMsg==null||data.errorMsg==""){
						if(data.lockedBy==null||data.lockedBy==""||data.lockedBy==userId){
							
							if(projectInfoModel.isMerged=='Y'){
								mergeBugModel.setValues(data);
								bugView=new MergeBugView({ el: $("#bugInformation"),model:mergeBugModel});
								bugId=mergeBugModel.bugId;
							}else{
								bugModel.setValues(data);
								bugView=new BugView({ el: $("#bugInformation"),model:bugModel});
								bugId=bugModel.bugId;
							}
							$('#modal').modal('hide');
							
							if(data.lockedBy==userId){
								//User has the lock
								if(projectInfoModel.isLocked!='Y'){
									bugLoadTime = new Date();
									idForShowClock = setInterval(function(){showClock();},1000);
								}
							}
						}else{
							//Locked by some other user
							if(projectInfoModel.isLocked!='Y'){
								if(projectInfoModel.isMerged=='Y'){
									mergeBugModel.setValues(data);
									bugView=new MergeBugView({ el: $("#bugInformation"),model:mergeBugModel});
									lockedView = new LockedView({el:$("#modal"),model:mergeBugModel});
									bugId=mergeBugModel.bugId;
									
								}else{
									bugModel.setValues(data);
									bugView=new BugView({ el: $("#bugInformation"),model:bugModel});
									lockedView = new LockedView({el:$("#modal"),model:bugModel});
									bugId=bugModel.bugId;
								}
								$('#modal').modal('show');
							}
						}
						
					}else{
						//1.next component does not have any bug .
						//2. last component
						console.log("Next component no bug");
						if(data.showNextComp=='true'||data.showNextComp==true){
							activeComponent=data.activeComponent;
							var comp,bug;
							if(projectInfoModel.isMerged=='Y'){
								bug=mergeBugModel.bugId;
								comp=data.internalComp;
							}else{
								bug=bugModel.bugId;
								comp=data.internalComp;
							}

							var paramValues='bugId='+bug+"&projectId="+projId+"&component="+comp+"&tempFilter="+tempFilter+"&tagName="+tagName+"&activeComponent="+activeComponent;
							
							var variables = { 
												noBugHeading:'No Bug found in Component matching Filter Criteria',
												noBugText:data.errorMsg,
												noBugFunction:'javascript:bugInfo.nextComponent(\''+data.activeComponent+'\',\''+paramValues+'\');',
												noBugAction:'Next Component',
												noBugComponent:data.activeComponent
											 };
							
							
							noBugView = new NoBugView({el:$("#modal"),model:variables});
							$('#modal').modal('show'); 
						}else{
							var variables = { 
									noBugHeading:'No More Bugs Found ',
									noBugText:'There are no more bugs matching the filter criteria.',
									noBugFunction:'javascript:bugInfo.componentSummary(\'\');',
									noBugAction:'Go to Component Summary'
								 };
							noBugView = new NoBugView({el:$("#modal"),model:variables});
							$('#modal').modal('show');
						}
						
						
					}
				},
				error : function (XMLHttpRequest, textStatus, errorThrown) {
				} 
			});
			
			
		},
		
		
		componentSummary:function(param){
			if(param==''){
				window.location =contextPath+'/component/ComponentSummary.htm?projectId='+projId;
				return;
			}
			//If update and show component summary not working check if "isUpdatedBug" is getting reset properly.
			idForShowComponentSummary = setInterval(function(){checkForComponentSummary();},1000);
			
			clearClock();
			$('#modal').modal('hide');
			showLoader();
			$.ajax({
				url:"/SORAServices/social/updateAndShowCompSmry.json",
				type:"POST",
				data:param,
				success:function(data){
					hideLoader();
					isUpdatedBug=true;
				},
				error : function (XMLHttpRequest, textStatus, errorThrown) {
				} 
			});
			
		}
		
		
		
	
	};
}());


var ssModel=new SSOibModel();
var ssView;
var ssOibModelInfo=(function(){
	
	
	
	return{
		show_ssoib_popup:function(bugId){
			$.ajax({
				url:"/SORAServices/buglist/showSSOib.json",
				type:"GET",
				data:"projId="+projId+"&bugId="+bugId,
				success:function(data){
					
						ssModel.setValues(data);
						console.log("seet ss values done");
						ssView=new SSOibView({el:$("#modal"),model:ssModel});
						console.log("svew create");
						$('#modal').modal('show');
					
				},
				error : function (XMLHttpRequest, textStatus, errorThrown) {
				} 
			});
		},
		
		populate_acctComment:function(){
			
			
			var acct_cmnt=$('#accountComments').val();
			if(dojo.byId('cpyAcctCmnt').checked==true && trim(document.getElementById('divReviewComment').value)!="" ){
				if(confirm("Existing comment in the comment field will be erased. Do you want to continue?")){
					document.getElementById('divReviewComment').value=acct_cmnt;
				}else{
					dojo.byId('cpyAcctCmnt').checked=false;
				}
			}
			else if(dojo.byId('cpyAcctCmnt').checked==true){
				document.getElementById('divReviewComment').value=acct_cmnt;
			}
		
		},
		
		
		
		
		 sendValue:function(){
			
			var reviewType,reviewComment;
			reviewComment= trim(document.getElementById('divReviewComment').value);
			reviewType=getSelectedRadioValue(document.getElementsByName('reviewType'));
			var osType=projectInfoModel.osType;
			var bugId=bugModel.bugId;
			
		
			if(osType=='X'){
				if(reviewType==null || reviewType==''){
			        alert("Please select SS/OIB/GH/M option.");  
			        return false;
				}
				if(reviewType=='DEL'){
					
					document.getElementById('oibButton').innerHTML="Set SS/OIB/GH/M Flag";
				}else{	
					document.getElementById('oibButton').innerHTML="Already set to SS/OIB/GH/M Flag, please review it";
				}	
		
			}else{
				if(reviewType==null || reviewType==''){
			        alert("Please select SS/OIB option.");  
			        return false;
				}
				if(reviewType=='DEL'){
					document.getElementById('oibButton').innerHTML="Set SS/OIB Flag";
				}else{
					document.getElementById('oibButton').innerHTML="Already set to SS/OIB Flag, please review it";
				}
			}		
					
			var url="/SORAServices/admin/saveSsOib.json";
			try{
				dojo.xhrGet({
					url:url,
					handleAs:"json",
					content: {
						bugId: bugId,
						reviewType: reviewType,
						reviewComment:reviewComment,
						projId:projId
					},	
					load: function(data){
						hideLoader();
						$('#modal').modal('hide');						
					}
				});		
			}
			catch(e){
				hideLoader();
				console.log(" Errored Out with "+e);
				$('#modal').modal('hide');	
			}
				
			showCustomLoader("Please wait while your <b>request is getting processed</b>, this might take some time.") ;
		}
		
	};
	
}());

var conflictScreenModel = new ConflictScreenModel();

function update(){
	projInfoView.render();
}

function showHiddenButtons(){
	$('#buttons').show();
	$('#buttonsClosed').hide();
}

function hideButtons(){
	$('#buttons').hide();
	$('#buttonsClosed').show();
}

function showHiddenButtonsReview(){
	$('#buttonsReview').show();
	$('#buttonsClosedReview').hide();
	
}

function hideButtonsReview(){
	$('#buttonsReview').hide();
	$('#buttonsClosedReview').show();
	
}


function showppl(type,bugId){
	var useIdURL = "/SORAServices/social/getPeopleList.json?bugId="+bugId+"&type="+type;
	var tableHtml = [];
	tableHtml.push("<table id='pplListTable' class='cust-grid1'>");
    $.getJSON(useIdURL, function(data) {
		 if(data.length > 0){
			 count = data.length;
			 $.each(data, function(i, user) {
				 tableHtml.push("<tr><td>" + user +"</td></tr>");
			 });
			 tableHtml.push("</table>");
			 $("#showPeopleDiv").html(tableHtml.join(""));
			 
			 dojo.query('#pplListTable tr:nth-child(odd)').forEach(function(item){
	    		dojo.addClass(item, "row-odd");
	    	 });
			 var typStr = "";
			 if(type == "C"){
				 typeStr = "Copied By";
			 }else if( type == "L"){
				 typeStr = "Liked By";
			 }else{
				 typeStr = "Disliked By";
			 }
			 var titleStr;
			 if(projectInfoModel.isMerged=='Y'){
				 titleStr = mergeBugModel.bugId + " - "  + typeStr;
			 }else{
				 titleStr = bugModel.bugId + " - "  + typeStr;
			 }
		  	 $("#showPeopleDialog").dialog({title:titleStr});
	 		 $("#showPeopleDialog").dialog("open");
		 }
	 });
}

$.curCSS = function (element, attrib, val) {
    $(element).css(attrib, val);
};

function copyComment(bugId){
	var socialText = trim($('textarea#socialComments').val());
	if (socialText == ""){
		alert("Social comment is empty.");
		return;
	}
	
	
	if(projectInfoModel.isMerged=='Y'){
		$.each(mergeBugModel.mergeBugData,function(i,mergeData){
			var clength= ($("#"+mergeData.parentProjectId+"_accountComments").val()+socialText).length;
			if(clength>3900){
				alert("Cannot copy comment to project "+mergeData.parentProjectId+".Length of the comment is exceeding 3900 characters!");
			}else{
				$("#"+mergeData.parentProjectId+"_accountComments").val(socialText);
				copySocialComment(bugId);
			}
		 });
	}else{
		$('textarea#accountComments').val(socialText);
		copySocialComment(bugId);
	}
	
	
}

function appendComment(bugId){
	var socialText = trim($('textarea#socialComments').val());
	if (socialText == ""){
		alert("Social comment is empty.");
		return;
	}
	
	
	
	if(projectInfoModel.isMerged=='Y'){
		$.each(mergeBugModel.mergeBugData,function(i,mergeData){
			var clength= ($("#"+mergeData.parentProjectId+"_accountComments").val()+socialText).length;
			if(clength>3900){
				alert("Cannot copy comment to project "+mergeData.parentProjectId+".Length of the comment is exceeding 3900 characters!");
			}else{
				$("#"+mergeData.parentProjectId+"_accountComments").val($("#"+mergeData.parentProjectId+"_accountComments").val()+"\n"+socialText);
				copySocialComment(bugId);
			}
		 });
	}else{
		var acText = $('textarea#accountComments').val();
		$('textarea#accountComments').val(acText + "\n" + socialText);
		copySocialComment(bugId);
	}
	
	
}

function copySocialComment(bugId){
	
	var copyURL = "/SORAServices/social/copySocialComment.json?bugId="+bugId;
    $.getJSON(copyURL, function(data) {
    	
    	
	 });
}

function likeSocialComment(bugId,type){
	if(projectInfoModel.isMerged=='Y'){
		if(mergeBugModel.socialComments==null ||mergeBugModel.socialComments==''){
			alert("Social comments needs to be saved first before liking/disliking it");
			return false;
		}
	}else{
		if(bugModel.extSocialComments==null ||bugModel.extSocialComments==''){
			alert("Social comments needs to be saved first before liking/disliking it");
			return false;
		}
		
	}
	
	var socialText = $('textarea#socialComments').val();
	if (socialText == ""){
		alert("Social comment is empty.");
		return;
	}
	if(type == "L"){
		status = likedByUser;
	}else{
		status = disLikedByUser;
	}
	var likeURL = "/SORAServices/social/likeSocialComment.json?bugId="+bugId+"&type="+type+"&status="+status;
	
	 $.ajax({
		 	url: "/SORAServices/social/likeSocialComment.json?bugId="+bugId+"&type="+type+"&status="+status,
		 	type:"GET",
		 	cache:false,
		 	handleAs: "json",
	        success: function (data, ioargs) {
	        	getSocialCountDetails();
	        },
	        error: function (err) {
	            alert("like/dislike/copy action failed.");
	            
	        }
	  	});
	 
  
}

function showButtons(){
	$('#bugAction').show();
}


function hirapopup(bugId,dummyvalue){
	var selectionStatus=$("#bugSelStatus").val();
	//check if selection status is E**
	if(selectionStatus=='E*C' || selectionStatus=='EPC' || selectionStatus=='EVV'){
		
		// if user has hira aceess
		if(accessListModel.hirapopupAccess || accessListModel.editBugListTagAccess){
			var state=bugModel.state;
			//check if bug in state RVMC
			if(state=='R' ||state=='M' ||state=='V' ||state=='C'){
				//check if EXCL tag is not set
				if(hiraPopupmodel.is_cmt_set=="0"){
				var version=accessListModel.rel;
				var throttle=accessListModel.throttle;
				var train=accessListModel.train;
				var regression=bugModel.regression;
				var osType=projectInfoModel.osType;
				
				if(regression=='Y' || regression=='y'){
						hiraPopupmodel.version_label="prior <b>Releases</b> (not including this ) <b>[EXCL_BEFORE_"+version+"]</b>(Regression)";
						hiraPopupmodel.versionEXCLTag="[EXCL_BEFORE_"+version+"]";
				}else{
						hiraPopupmodel.version_label="this and later <b>Release</b> on same throttle <b>[EXCL_"+version+"]</b>";
						hiraPopupmodel.versionEXCLTag="[EXCL_"+version+"]";
				}
				if(train=='NF'){
					hiraPopupmodel.hideThrottle="style=\"display:none\"";
					hiraPopupmodel.hideTrain="style=\"display:none\"";
					
				}else{
					if(osType=='X' || osType=='C'){
						hiraPopupmodel.hideThrottle="style=\"display:none\"";
					}else{
						hiraPopupmodel.throttle_label=" the whole <b>Throttle [EXCL_"+throttle+"]</b>";
						hiraPopupmodel.throttleEXCLTag="[EXCL_"+throttle+"]";
					}
					hiraPopupmodel.train_label="the whole <b>Train [EXCL_"+train+"]</b>";
					hiraPopupmodel.trainEXCLTag="[EXCL_"+train+"]";
				}
				
				hiraPopupmodel.tags=$("#tags").val();
				hiraPopupmodel.tagcomments=$("#tagDescription").val();
				
				setCommanTag();
				hiraPopupmodel.bugId=bugModel.bugId;
				hiraPopupView=new HiraPopupView({el:$("#modal"),model:hiraPopupmodel});

				actb(dojo.byId('tagsHP'),tagList);
				$('#modal').modal('show');
				}
			}
			
		}
	}
	else{
		if(hiraPopupmodel.is_cmt_set=="1"){
			//replace hiraComment in general comment with empty string
			var generalComment = $("#generalComments").val();
			generalComment=generalComment.replace(hiraPopupmodel.hiraComment,"");
			 $("#generalComments").val(generalComment);
			 hiraPopupmodel.is_cmt_set="0";
			
		}
		
	}
	
	
	
}

function setHiraValues(){
	var generalComment = $("#generalComments");
	var exclTag='';
	if($("#SpecicVersionHP").attr("checked")){
		exclTag=hiraPopupmodel.versionEXCLTag;
	}else if($("#throttleHP").attr("checked")){
		exclTag=hiraPopupmodel.throttleEXCLTag;
	}else if($("#trainHP").attr("checked")){
		exclTag=hiraPopupmodel.trainEXCLTag;
	}
	
	//check EXCL tag is not  part of general comment
	if((generalComment.val()).indexOf(exclTag)==-1){
		$("#generalComments").val(generalComment.val()+" "+exclTag);
		hiraPopupmodel.is_cmt_set="1";
		hiraPopupmodel.hiraComment=exclTag;
	}
	// append hira comment to general comment
	var hiraComment=$("#commentHP").val();
	bugModel.exclComment=$("#commentHP").val();;
	$("#generalComments").val(generalComment.val()+" "+hiraComment);
	hiraPopupmodel.hiraComment = hiraPopupmodel.hiraComment+" "+hiraComment;
	
	//set tags and tag comments
	var hiraTag=$("#tagsHP").val();
	var hiraTagExpression=$("#comment2HP").val();
	if(hiraTag!=$("#tags").val()){
		$("#tags").val(hiraTag);
		$("#tagDescription").val(hiraTagExpression);
	}
	
	//set common tag
	var commonTag=$("#commanTagHP option:selected").text();
	if(commonTag=="Select"){
		commonTag="";
	}
	$("#commonTag").val(commonTag);
	bugModel.commonTag=$("#commanTagHP").val();
	
	
	
	
	$('#modal').modal('hide');
}


function enableText(){
	if($("#criteriaHP").attr("checked")){
		 $("#commentHP").prop('disabled', false);
		 $("#SpecicVersionHP").prop('disabled', false);
		 $("#throttleHP").prop('disabled', false);
		 $("#trainHP").prop('disabled', false);
		 $("#SpecicVersionHP").prop('checked', true);
         
	}
	else{
		 $("#commentHP").prop('disabled', true);
		 $("#SpecicVersionHP").prop('disabled', true);
		 $("#throttleHP").prop('disabled', true);
		 $("#trainHP").prop('disabled', true);
	}
}

function setCommanTag(){
	hiraPopupmodel.commonTagOptions=hiraPopupmodel.createCommonTag(accessListModel.commonTag,bugModel.commonTag);
}


function closeHiraPopup(){
	$('#modal').modal('hide');
}





function checkConflictResolution(){
	//check if gc comments are not same
	var params='';
	bugModel.generalComments=$("#generalComments").val();
	if(bugModel.generalComments != bugModel.exGeneralComments){
		params+='checkGCConflict=true&gCCommentUpdatedOn='+trim(bugModel.genCommentUpdatedOn).replace('PST','')+'&bugInfoLastModifiedDate='+projectInfoModel.bugListLastModifiedDateTime+'&';
	}
	//check social Comment
	bugModel.socialComments=$("#socialComments").val();
	if(bugModel.extSocialComments != bugModel.socialComments){
		params+='checkSocialConflict=true&socialCommentUpdatedOn='+trim(bugModel.socialCmtLastUpdatedOn).replace('PST','')+'&';
	}
	
	bugModel.tagExpression=$("#tags").val();
	bugModel.tagDescription=$("#tagDescription").val();
	var keyword=bugModel.keyword;
	if(keyword=='none'){
		keyword='NONE';
	}else{
		keyword="KEYWORD:"+keyword;
	}
	
	if( keyword!=bugModel.tagExpression && (bugModel.tagExpression!=bugModel.exTagExpression || bugModel.tagDescription==bugModel.exTagDescription)){
		params+='checkTagConflict=true&tagExpression='+bugModel.exTagExpression;
	}
	
	if(params!=''){
		var useIdURL = "/SORAServices/social/conflictDetials.json?bugId="+bugModel.bugId+"&"+params;
		$.getJSON(useIdURL, function(data) {
	    	 if(data!=null && (data.socialConflictBug!=null || data.conflictTags!=null || data.conflictGCBug!=null)){
				 conflictScreenModel.setValues(data,bugModel.generalComments,bugModel.socialComments,bugModel.tagExpression,bugModel.tagDescription);
				 showConflictResolutionScreen();
			 }else{
				 forwardPage();
			 }
		 });
		return true;
	}else{
		return false;
	}
}


function checkConflictResolutionMerge(){
	//check if gc comments are not same
	var params='';
	mergeBugModel.generalComments=$("#generalComments").val();
	console.log("Merge Comments"+mergeBugModel.generalComments+"$$$$$$$$$"+mergeBugModel.exGeneralComments);
	if(mergeBugModel.generalComments != mergeBugModel.exGeneralComments){
		params+='checkGCConflict=true&gCCommentUpdatedOn='+trim(mergeBugModel.genCommentUpdatedOn).replace('PST','')+'&bugInfoLastModifiedDate='+projectInfoModel.bugListLastModifiedDateTime+'&';
	}
	//check social Comment
	mergeBugModel.socialComments=$("#socialComments").val();
	if(mergeBugModel.extSocialComments != mergeBugModel.socialComments){
		params+='checkSocialConflict=true&socialCommentUpdatedOn='+trim(mergeBugModel.socialCmtLastUpdatedOn).replace('PST','')+'&';
	}
	
	mergeBugModel.tagExpression=$("#tags").val();
	mergeBugModel.tagDescription=$("#tagDescription").val();
	var keyword=mergeBugModel.keyword;
	if(keyword=='none'){
		keyword='NONE';
	}else{
		keyword="KEYWORD:"+keyword;
	}
	
	if( keyword!=mergeBugModel.tagExpression && (mergeBugModel.tagExpression!=mergeBugModel.exTagExpression || mergeBugModel.tagDescription==mergeBugModel.exTagDescription)){
		params+='checkTagConflict=true&tagExpression='+mergeBugModel.exTagExpression;
	}
	showLoader();
	if(params!=''){
		var useIdURL = "/SORAServices/social/conflictDetials.json?bugId="+mergeBugModel.bugId+"&"+params;
		$.getJSON(useIdURL, function(data) {
			hideLoader();
	    	 if(data!=null && (data.socialConflictBug!=null || data.conflictTags!=null || data.conflictGCBug!=null)){
				 conflictScreenModel.setValues(data,mergeBugModel.generalComments,mergeBugModel.socialComments,mergeBugModel.tagExpression,mergeBugModel.tagDescription);
				 showConflictResolutionScreen();
			 }else{
				 forwardPage();
			 }
		 });
		return true;
	}else{
		return false;
	}
}
function showConflictResolutionScreen(){
	
	conflictScreenView=new ConflictScreenView({el:$("#modal"),model:conflictScreenModel});
	$('#modal').modal('show');

}

function copyComments(projId){
	var eleId=projId+"_accountComments";
	var copyFrom = dojo.byId(eleId).value;
	var copytoClass="copyTo";
	$("."+copytoClass).each(function() {
		if($(this).val()!==""){
			$(this).val($(this).val()+" ");
		}
		var cmtLength=($(this).val() +copyFrom).length;
		if(cmtLength>3900){
			var projectId=(($(this).attr('id')).split('_'))[0];
			alert("Cannot copy comment to project "+projectId+".Length of the comment is exceeding 3900 characters!");
		}else{
	    	$(this).val( $(this).val()+copyFrom);
		}
	});
	

}

function replaceComments(projId){
	var eleId=projId+"_accountComments";
	var copyFrom = dojo.byId(eleId).value;
	var copytoClass="copyTo";
	$("."+copytoClass).each(function() {
		if($(this).val()!==""){
			$(this).val($(this).val()+" ");
		}
		var cmtLength=($(this).val() +copyFrom).length;
		if(cmtLength>3900){
			var projectId=(($(this).attr('id')).split('_'))[0];
			alert("Cannot copy comment to project "+projectId+".Length of the comment is exceeding 3900 characters!");
		}else{
	    	$(this).val(copyFrom);
		}
	});
	

}



function toggleRadio(id){
	if(id=='check1'){
		dojo.byId('check2').checked=false;
	}
	else{
		dojo.byId('check1').checked=false;
	}
}


function validateMailandSend(){
	  var toMail=$('#divTO').val();
	  var ccMail=$('#divCC').val();
	  var subject=$('#divSubject').val();
	  var body=$('#editor').val();
	  if(dojo.trim(toMail).length==0){
		  alert("Please add an user in the To field");
		  return false;
	  }
	  if(!(dojo.byId('check1').checked||dojo.byId('check2').checked)){
		  alert("Select one of the checkboxes and send mail again");
		  return false;
	  }
	    var trimToMail = toMail.replace(/(^\s*,)|(,\s*$)/g, '');
		  var trimCcMail = ccMail.replace(/(^\s*,)|(,\s*$)/g, '');
		var url="/SORAServices/tools/validateUserIds.json?user_list="+trimToMail+","+trimCcMail;
		  dojo.xhrGet({
			    url:url,
			    handleAs:"json",
			    load: function(data){
			    	if(data[1]=="false")
			    	{
			    		
			        	alert(data[2]);return false;
			        }
			    	else{
			    		console.log("no issues");
			    		sendMail();
			    	}
			    	
			    },
			    error:function(err){
			    	
				    alert("Validation Failed!");
				    
			    }
			});
}

function sendMail(){
	var toMail=$('#divTO').val();
	  var ccMail=$('#divCC').val();
	  var subject=$('#divSubject').val();
	  var body=$('#editor').val();
	  var trimToMail = toMail.replace(/(^\s*,)|(,\s*$)/g, '');
	  var trimCcMail = ccMail.replace(/(^\s*,)|(,\s*$)/g, '');
	  var newBody=JSON.stringify(body);
	  var isReviewed="1";
	  newBody=newBody.replace(/\\n/g,'<br>');
	  newBody=newBody.replace(/"/g,'');
	  if((dojo.byId('check1').checked)&&(dojo.byId('check2').checked)){
		  alert("Please select only one checkbox.");
		  return false;
	  }
	  if((dojo.byId('check2').checked)){
		  isReviewed="2";
		  subject="[SORA-Post Delivery Review Process] Review Approved for project :" +projId;
	  }
	  else
	  	if((dojo.byId('check1').checked)){
	  		isReviewed="1";
	  }
	  var user_list=trimToMail+trimCcMail;
		 var userarray =user_list.split(",");
	  for(i=0;i<userarray.length;i++){
			for(j=i+1;j<userarray.length;j++){
				if(userarray[i]==userarray[j]){
					alert("Please remove duplicate user ids in the User List");
					return false;
				}
			}
		}
	  $.ajax({
		 	url: "/SORAServices/report/submitForReview.json?projectId="+projId+"&toMail="+trimToMail+"&ccMail="+trimCcMail+"&subject="+subject+"&body="+newBody+"&submitForReviewFromReportPage=true&isReviewed="+isReviewed,
		 	type:"POST",
		 	handleAs: "json",
	        success: function (data, ioargs) {
	        	hideLoader();
	        	alert(data.statusMsg);
	        	$('#modal').modal('hide');
	        	if(isReviewed=="2"){
	        		document.location.href = contextPath+"/component/ComponentSummary.htm?projectId="+projId;
	        	}
	        dojo.byId('check1').checked=true;
			dojo.byId('check2').checked=false;
	        },
	        error: function (err) {
	            alert("Mail could not be sent");
	            $('#modal').modal('hide');
	        }
	  	});
}

function clearMails(){
	$('#modal').modal('hide');
	dojo.byId('check1').checked=true;
	dojo.byId('check2').checked=false;
}


function sendReviewCommentMail(){

	var customerName=projectInfoModel.custName;
	var projectName=projectInfoModel.projName;
	var version=projectInfoModel.release;
	if(projectInfoModel.osType=='X'){
		version=version.substr(version.indexOf("BASE")+4,version.indexOf("BASE")+5);
	}
	var priEngr=projectInfoModel.primaryEngineer;
	var delEngr=projectInfoModel.deliveryEngineer;
	console.log("Called Send Review Email"+customerName+projectName+version);
	$.ajax({
				url:contextPath+"/buglist/getReviewedVerifiedBugsPerUser.json?projectId="+projId+"&priEngr="+priEngr+"&delEngr="+delEngr+"&custName="+customerName+"&projName="+projectName+"&version="+version+"&submitForReviewFromReportPage=false",
				handleAs:"json",
				type:"GET",
				success:function(data){
					if(data.bugIdListLength=="0"){
						alert("There are no review comments to send review mail");
					}
					else{
						console.log(data.bugIdListLength);
						reviewView = new ReviewView({el:$("#modal")});
						//$('#editor').attr('value',data.mailBody);
						$("textarea#editor").val(data.mailBody);
						var userIds=data.userIds;
						if(userIds!=null&&userIds.length>0){
							  var trimToMail = userIds.replace(/(^\s*,)|(,\s*$)/g, '');
							  var aliasArr = trimToMail.split(",");
								 var uniqueArray = aliasArr.filter(function(elem, pos) {
								      return aliasArr.indexOf(elem) == pos;
								  });
								  trimToMail = uniqueArray.join();
							  $('#divTO').attr('value',trimToMail);
							  $('#divCC').attr('value',"");
						}
						$('#modal').modal('show');
					}
				},
	        error: function (err) {
	            alert("Mail could not be sent");
	            $('#modal').modal('hide');
	        }
	});
}

//send can take values 's:send email' 'd:display alert' and 'sd:save and go next in social' 
function updateReviewCommentsAndSendMail(send){
	var bugCommentList = {
		    commentObject: []
	};
	var anyCommentUpdated=false;
	
	var commentVal=JSON.stringify($('#reviewComments').val().replace(/"/g,'\''));
	commentVal=commentVal.replace(/\\n/g,"&#13");
	commentVal=commentVal.replace(/"/g,'');
	
	
	var commentDefault;
	if(bugModel.reviewComment!=null){
		commentDefault=JSON.stringify(bugModel.reviewComment.replace(/"/g,'\''));
		commentDefault=commentDefault.replace(/\\r/g,"&#13");
	    commentDefault=commentDefault.replace(/\\n/g,"&#13");
	    commentDefault=commentDefault.replace(/"/g,'');
	}else{
		commentDefault='';
	}
   	
 
	if(commentVal!=commentDefault){
			bugCommentList.commentObject.push({ 
                "bugId" 	:bugModel.bugId,
                "comment" 	:encodeURIComponent(commentVal)
            });
		
			anyCommentUpdated=true;
	}
	
	
	
	if(anyCommentUpdated){
		dojo.xhrPost({
			url:contextPath+"/buglist/saveReviewComments.json?projectId="+projId+"&bugCommentList="+JSON.stringify(bugCommentList),
			handleAs:"json",
			load: function(data){
			//	hideLoader();
				console.log("Called6");
					
					if(send!=null && send=='s'){
						sendReviewCommentMail();
					}else if(send!=null && send=='d'){
						alert("Review Comments saved properly.");
					}
				
			},
			error: function(error){
				//hideLoader();
		       alert("Review comments could not be saved. Please try again. In case the issue persists, kindly send a mail to sora-support.");
		       if(send!=null && send=='s'){
						sendReviewCommentMail();
					}
		      }
		});
	}else{

		alert("There are no review comments to be saved for bug in this page.");
		if(send!=null && send=='s'){
			sendReviewCommentMail();
		}
	}
	
}
var alertVal=0;
function alertfunc() {
	var isReadOnly=$('[name=accountComments]').attr("readonly");
		console.log("isReadonly= "+isReadOnly);
    if (!(isReadOnly == "readonly")) {
		if(alertVal==0){
			alert("Please be aware that this is AS Internal Comment field, which is global for all NCEs.\n\n" +
			"Please be very careful when performing any editing operation associated with this field.");
			alertVal++;
		}
	}
}

$(document).ready(function () {
	
	
	
	$("body").css("overflow","scroll");
	var theme = 'energyblue';
	//Setting demo's theme
	basicDemo.config.theme = theme;
	//Initializing the demo
	basicDemo.init();
	
	projectInfo.init();
	
	
	$("#expandOverlayConfig").hide();
	$("#searchLoader").hide();
	
	
});



var attributeModel = new AttributeModel();

function show_att_dialog(bug_ID, att_Name,param){
	 var url;
     if(param=='nill')
             url="/SORAServices/admin/attrDialog.json?bugId="+bug_ID+"&att_name="+att_Name;
     else
             url="/SORAServices/admin/attrDialog.json?url="+param;
     dojo.xhrGet({
         url:url,
         handleAs:"json",
         load: function(data){
             attributeModel.setValues(data["1"]);
           	hideLoader();
             attributeView=new AttributeView({el:$("#modal"),model:attributeModel});
           	$('#modal').modal('show');
         	}
         });
   }


function att_dialog(e)
{
	var  url= "'" +e.target+"'";
	if(url.indexOf('http://')!=-1)
	{
		$( "#attributeDialog" ).dialog("close");
	    var param='nill';
        e.preventDefault();
        var ind=url.indexOf('id=');
        if(ind ==-1)
                 param=e.target;
        var bugId=url.substring(ind+3, ind+13);
        var ind=url.indexOf('show=');
        if(ind == -1)
                param=e.target;
        var att=url.substring(ind+5);
        att=att.replace("'","");
        showLoader();
        show_att_dialog(bugId,att,param);
	}
}


function limitTextAreaCharacters( field, maxlimit )
{
    if( field.value.length > maxlimit )
    {
    	alert("Maximum letter limit exceeds for this text area.Permissible letter count is "+maxlimit);
        field.value = field.value.substring(0, maxlimit);
    }
}

function validateTag(){
	var keyword;
	if(projectInfoModel.isMerged=='Y'){
		keyword=mergeBugModel.keyword;
	}else{
		keyword=bugModel.keyword;
	}
	if(keyword.toUpperCase()=='NONE' || keyword.length==0){
		keyword='NONE';
	}else{
		keyword="KEYWORD:"+keyword;
	}
	var tags=new Array();
	tags[0]=$('#tags').val();
	if(tags!=keyword){
		return validateTagExp(tags,tagList);
	}
	return true;
}

function show_ss(bug_id, cust_id, proj_id) {
    histwin = window.open(
    		contextPath+'/buglist/getSSHistory.htm?&bugId='+bug_id +
       '&projectId='+proj_id,
       'histwin',
       'toolbar=0,location=0,directories=0,status=0,menubar=0,resizable=1,resizeable=yes,scrollbars=1,scrollbars=yes,width=700,height=480');
 }


function getPreviousIncludedCommentsSocial(){
	 var data = $('#prevIncludedCommentsSocial').html();
	 if($.trim(data)==""){
		showLoader();
		$.ajax({
			url:"/SORAServices/comets/getPreviousIncludedComments.json",
			type:"GET",
			data:"projId="+projId+"&bugId="+bugModel.bugId,
			success:function(data){
				hideLoader();
				$('#prevIncludedCommentsSocial').html(data.status);
				
				
			},
			error : function (XMLHttpRequest, textStatus, errorThrown) {
				console.log("Error in saving");
			} 
		});
	 }else{
		 
		 if($('#prevIncludedCommentsSocial').css("display") == "none"){
			 $('#prevIncludedCommentsSocial').show();
		 }else{
			 $('#prevIncludedCommentsSocial').hide();
		 }
	 }

}












function configSearchResult(fileName,content,exactMatch){
	this.fileName=fileName;
	this.content=content;
	this.exactMatch=exactMatch;
}

var searchResult;
var currentIndex;
var mergeResult =new Object();




var invalidateView,additionalAnalysisView;


var configSearch = (function(){
	var searchType;
	function searchConfigNormal(){
		var searchProject=projectInfoModel.projectId;
		var searchString = $('#searchString').val();
		if(trim(searchString)!=""){
			$('#searchLoader').show();
			$.ajax({
				url:"/SORAServices/config/searchInConfig.json",
				type:"GET",
				data:"projectID="+searchProject+"&searchString="+encodeURIComponent(searchString),
				success:function(data){
					$('#searchLoader').hide();
					if(data.matches=="FAILURE"){
			
						$('#configSearchResultFailure').html("<div class=\"searchResultClass\" ><b>"+searchString+"</b> is <span style=\"color:red\"><b>not present</b></span> in uploaded Config file</div><br/>	<button type=\"button\" id=\"applyAnalysis\" class=\"btn btn-primary\" onclick=\"configSearch.applyAnalysis();\">Apply Analysis</button>");
						$('#configSearchResultFailure').show();
						$('#configSearchResult').hide();
						
					}else{
						searchResult=[];
						currentIndex=0;
						for(i=0;i<data.matches.length;i++){
							
							var match  =data.matches[i];
							var result = new configSearchResult(match.fileName,match.matchedContents,match.exactMatch);
							searchResult.push(result);
						}
						
						showFullSearchResult();
						
					}
					
				},
				error : function (XMLHttpRequest, textStatus, errorThrown) {
					
				} 
			});
		}
		
		
	}
	
	
	//Same Div used for config/feature and hardware named -- configSearchResult
	function searchFeatureNormal(){
		var searchProject=projectInfoModel.projectId;
		var searchString = $('#searchString').val();
		if(trim(searchString)!=""){
			$('#searchLoader').show();
			$.ajax({
				url:"/SORAServices/config/searchInFeaturesUploaded.json",
				type:"GET",
				data:"projectID="+searchProject+"&searchString="+encodeURIComponent(searchString),
				success:function(data){
					$('#searchLoader').hide();
					if(data.matches=="FAILURE"){
						$('#configSearchResultFailure').html("<div class=\"searchResultClass\" ><b>"+searchString+"</b> is <span style=\"color:red\"><b>not present</b></span> in uploaded Features</div><br/>	<button type=\"button\" id=\"applyAnalysis\" class=\"btn btn-primary\" onclick=\"configSearch.applyAnalysis();\">Apply Analysis</button>");
						$('#configSearchResultFailure').show();
						$('#configSearchResult').hide();
						
					}else{
						var table = '<table border="1"><tr><td>Technology</td><td>Feature</td></tr>';
						for(i=0;i<data.matches.length;i++){
							table+='<tr><td><b>'+data.matches[i].techTitle+'</b></td><td><b>'+data.matches[i].featTitle+'</b></td></tr>';
						}
						table+='</table>';
						
						$('#configSearchResult').html("<div class=\"searchResultClass\" ><b>"+searchString+"</b> is <span style=\"color:green\"><b>present</b></span> in uploaded Features   <br/> <br/> "+table+" </div><br/>	<button type=\"button\" id=\"applyAnalysis\" class=\"btn btn-primary\" onclick=\"configSearch.applyAnalysis();\">Apply Analysis</button>");
						$('#configSearchResult').show();
						$('#configSearchResultFailure').hide();
						
						
					}
					
				},
				error : function (XMLHttpRequest, textStatus, errorThrown) {
					
				} 
			});
		}
		
		
	}
	
	
	function searchHardwareNormal(){
		var searchProject=projectInfoModel.projectId;
		console.log("inside searchHardwareNormal()..");
		var searchString = $('#searchString').val();
		if(trim(searchString)!=""){
			$('#searchLoader').show();
			$.ajax({
				url:"/SORAServices/config/searchUploadedHardware.json",
				type:"GET",
				data:"projectID="+searchProject+"&searchString="+encodeURIComponent(searchString),
				success:function(data){
					$('#searchLoader').hide();
					if(data.matches=="FAILURE"){
						$('#configSearchResultFailure').html("<div class=\"searchResultClass\" ><b>"+searchString+"</b> is <span style=\"color:red\"><b>not present</b></span> in uploaded Hardware  </div><br/>	<button type=\"button\" id=\"applyAnalysis\" class=\"btn btn-primary\" onclick=\"configSearch.applyAnalysis();\">Apply Analysis</button>");
						$('#configSearchResultFailure').show();
						$('#configSearchResult').hide();
						
					}else{
						
						var table = '<table border="1" width="500"><tr><td>Matched String</td><td>Type</td><td>Product Family</td></tr>';
						for(var i=0;i<data.matches.length;i++){
							table+='<tr><td><b>'+data.matches[i].matchedString+'</b></td><td><b>'+data.matches[i].type+'</b></td><td><b>'+data.matches[i].productFamily+'</b></td></tr>';
						}
						table+='</table>';
						
						
						$('#configSearchResult').html("<div class=\"searchResultClass\" ><b>"+searchString+"</b> is <span style=\"color:green\"><b>present</b></span> in uploaded Hardware<br/> <br/> "+table+"</div><br/>	<button type=\"button\" id=\"applyAnalysis\" class=\"btn btn-primary\" onclick=\"configSearch.applyAnalysis();\">Apply Analysis</button>");
						$('#configSearchResult').show();
						$('#configSearchResultFailure').hide();
						
						
					}
					
				},
				error : function (XMLHttpRequest, textStatus, errorThrown) {
					
				} 
			});
		}
		
		
	}
	
	function searchConfigMerge(){
		
		var searchProject="";
		var mergeParentDetails =configModel.mergeProjectData;
		
		for(i=0;i<mergeParentDetails.length;i++){
			if(mergeParentDetails[i].configFileUploaded=="Y"){
				searchProject=searchProject+mergeParentDetails[i].parentProjectId+",";
			}
		}
		
		
		var searchString = $('#searchString').val();
		if(searchString!=""){
			$('#searchLoader').show();
			$.ajax({
				url:"/SORAServices/config/searchInConfigMerge.json",
				type:"GET",
				data:"parentProjects="+searchProject+"&searchString="+encodeURIComponent(searchString),
				success:function(data){
					$('#searchLoader').hide();
					console.log(data);
					$('#fullResult').hide();
					$('#searchSnippet').hide();
					$('#prevConfResult').hide();
					$('#nextConfResult').hide();
					$('#configSearchResult').show();
					 
					for(i=0;i<mergeParentDetails.length;i++){
						var parentProject =mergeParentDetails[i].parentProjectId;
						var searchData;
						if(mergeParentDetails[i].configFileUploaded=="Y"){
							searchData= data.matches[parentProject];
						}else{
							searchData="NOT_PRESENT";
						}
					
						if(searchData=="FAILURE"){
							$('#parent_'+parentProject).html(" "+searchString+" is <span style=color:red><b>not present</b></span> for Customer"+ mergeParentDetails[i].customerName + " in Project "+parentProject );
						}else if(searchData=="NOT_PRESENT"){
							$('#parent_'+parentProject).html("Config File <span style=color:red><b>not uploaded</b></span> for Customer"+ mergeParentDetails[i].customerName + " in Project "+parentProject); 
						}else{
							var mergeSearchResult=[];
							for(j=0;j<searchData.length;j++){
								
								var match  =searchData[j];
								var result = new configSearchResult(match.fileName,match.matchedContents,match.exactMatch);
								mergeSearchResult.push(result);
							}
							mergeResult[parentProject]= mergeSearchResult;
							$('#parent_'+parentProject).html(" <b>Found <a href=\"#\" onclick=configSearch.getMergeConfigDetails("+parentProject+",'"+trim(mergeParentDetails[i].customerName)+"') >" +searchData.length +"</a>  snippets of  </b> "+searchString+" for Customer "+ mergeParentDetails[i].customerName + " in Project "+parentProject);
							
						}
						$('#parent_'+parentProject).show();
					}
					
				},
				error : function (XMLHttpRequest, textStatus, errorThrown) {
					
				} 
			});
		}
		
		
		
		
	}
	
	function searchHardwareMerge(){
		var searchProject="";
		var mergeParentDetails =configModel.mergeProjectData;
		
		for(i=0;i<mergeParentDetails.length;i++){
			if(mergeParentDetails[i].hardwareUploaded=="Y"){
				searchProject=searchProject+mergeParentDetails[i].parentProjectId+",";
			}
		}
		
		
		var searchString = $('#searchString').val();
		if(searchString!=""){
			$('#searchLoader').show();
			$.ajax({
				url:"/SORAServices/config/searchHardwareMerge.json",
				type:"GET",
				data:"parentProjects="+searchProject+"&searchString="+encodeURIComponent(searchString),
				success:function(data){
					$('#searchLoader').hide();
					console.log(data);
					
					$('#fullResult').hide();
					$('#searchSnippet').hide();
					$('#prevConfResult').hide();
					$('#nextConfResult').hide();
					$('#configSearchResult').show();
					 
					for(i=0;i<mergeParentDetails.length;i++){
						var parentProject =mergeParentDetails[i].parentProjectId;
						var searchData;
						if(mergeParentDetails[i].hardwareUploaded=="Y"){
							searchData= data.matches[parentProject];
						}else{
							searchData="NOT_PRESENT";
						}
					
						if(searchData=="FAILURE"){
							$('#parent_'+parentProject).html(" "+searchString+" is <span style=color:red><b>not present</b></span> for Customer"+ mergeParentDetails[i].customerName + " in Project "+parentProject );
						}else if(searchData=="NOT_PRESENT"){
							$('#parent_'+parentProject).html("Features <span style=color:red><b>not uploaded</b></span> for Customer"+ mergeParentDetails[i].customerName + " in Project "+parentProject); 
						}else{
							var table = '<table border="1"><tr><td>Technology</td><td>Feature</td></tr>';
							for(j=0;j<searchData.length;j++){
								table+='<tr><td><b>'+searchData[j].techTitle+'</b></td><td><b>'+searchData[j].featTitle+'</b></td></tr>';
							}
							table+='</table>';
							
							var table = '<table border="1" width="500"><tr><td>Matched String</td><td>Type</td><td>Product Family</td></tr>';
							for(j=0;j<searchData.length;j++){
								table+='<tr><td><b>'+searchData[j].matchedString+'</b></td><td><b>'+searchData[j].type+'</b></td><td><b>'+searchData[j].productFamily+'</b></td></tr>';
							}
							table+='</table>';
							
							$('#parent_'+parentProject).html(" "+searchString+" is <span style=color:green><b>present</b></span> for Customer "+ mergeParentDetails[i].customerName + " in Project "+parentProject+"<br/><br/>"+table);
						}
						$('#parent_'+parentProject).show();
					}
					
				},
				error : function (XMLHttpRequest, textStatus, errorThrown) {
					
				} 
			});
		}
		
	}
	
	function searchFeatureMerge(){
		
		var searchProject="";
		var mergeParentDetails =configModel.mergeProjectData;
		
		for(i=0;i<mergeParentDetails.length;i++){
			if(mergeParentDetails[i].featureUploaded=="Y"){
				searchProject=searchProject+mergeParentDetails[i].parentProjectId+",";
			}
		}
		
		
		var searchString = $('#searchString').val();
		if(searchString!=""){
			$('#searchLoader').show();
			$.ajax({
				url:"/SORAServices/config/searchFeatureMerge.json",
				type:"GET",
				data:"parentProjects="+searchProject+"&searchString="+encodeURIComponent(searchString),
				success:function(data){
					$('#searchLoader').hide();
					console.log(data);
					$('#fullResult').hide();
					$('#searchSnippet').hide();
					$('#prevConfResult').hide();
					$('#nextConfResult').hide();
					$('#configSearchResult').show();
					 
				
					for(i=0;i<mergeParentDetails.length;i++){
						var parentProject =mergeParentDetails[i].parentProjectId;
						var searchData;
						if(mergeParentDetails[i].featureUploaded=="Y"){
							searchData= data.matches[parentProject];
						}else{
							searchData="NOT_PRESENT";
						}
					
						if(searchData=="FAILURE"){
							$('#parent_'+parentProject).html(" "+searchString+" is <span style=color:red><b>not present</b></span> for Customer"+ mergeParentDetails[i].customerName + " in Project "+parentProject );
						}else if(searchData=="NOT_PRESENT"){
							$('#parent_'+parentProject).html("Features <span style=color:red><b>not uploaded</b></span> for Customer"+ mergeParentDetails[i].customerName + " in Project "+parentProject); 
						}else{
							var table = '<table border="1"><tr><td>Technology</td><td>Feature</td></tr>';
							for(j=0;j<searchData.length;j++){
								table+='<tr><td><b>'+searchData[j].techTitle+'</b></td><td><b>'+searchData[j].featTitle+'</b></td></tr>';
							}
							table+='</table>';
							
							$('#parent_'+parentProject).html(" "+searchString+" is <span style=color:green><b>present</b></span> for Customer "+ mergeParentDetails[i].customerName + " in Project "+parentProject+"<br/><br/>"+table);
						}
						$('#parent_'+parentProject).show();
					}
					
				},
				error : function (XMLHttpRequest, textStatus, errorThrown) {
					
				} 
			});
		}
	}
	
	
	function showSearchResult(){
		
		var fileName = searchResult[currentIndex].fileName;
		var content = searchResult[currentIndex].content;
		
		$('#configFileName').html(fileName);
		$('#configFileContent').html(content);
		if(currentIndex==0){
			$('#prevConfResult').hide();
			$('#nextConfResult').show();
		}else if(currentIndex==searchResult.length-1){
			$('#nextConfResult').hide();
			$('#prevConfResult').show();
		}else{
			$('#prevConfResult').show();
			$('#nextConfResult').show();
		}
		$('#indexConf').html("Showing "+(currentIndex+1));
		$('#numberOfMatches').html(" of "+searchResult.length+" Matches");
		$('#indexConf').show();
		$('#numberOfMatches').show();
	}

	function showFullSearchResult(){
		var fullResult='<table  class="cust-grid1">';
		var fileName='';
		for(index=0;index<searchResult.length;index++){
			if(index%2==0){
				fullResult=fullResult+'<tr class="row-even"><td>';
			}else{
				fullResult=fullResult+'<tr class="row-odd"><td>';
			}
			if(fileName!=searchResult[index].fileName){
				fileName=searchResult[index].fileName;
				
				fullResult='<b>'+fullResult+searchResult[index].fileName+'</b>:</td></tr>';
				if(index%2==0){
					fullResult=fullResult+'<tr class="row-even"><td>';
				}else{
					fullResult=fullResult+'<tr class="row-odd"><td>';
				}
				fullResult=fullResult+'&nbsp;&nbsp;&nbsp;<a style=\"text-decoration:underline;color:#0000EE;cursor:pointer;font-weight:normal;\" onclick="configSearch.getSnippet('+index+')">'+searchResult[index].exactMatch+'</a></td></tr>'
				
				
			}else{
				fullResult=fullResult+'&nbsp;&nbsp;&nbsp;<a style=\"text-decoration:underline;color:#0000EE;cursor:pointer;font-weight:normal;\" onclick="configSearch.getSnippet('+index+')">'+searchResult[index].exactMatch+'</a></td></tr>';
				
			}
			
		}
		fullResult=fullResult+'</table>';
		
		$('#fullResult').html(fullResult);
		$('#configSearchResultFailure').hide();
		$('#configSearchResult').show();
		$('#fullResult').show();
		$('#searchSnippet').hide();
		$('#prevConfResult').hide();
		$('#nextConfResult').hide();
		$('#indexConf').hide();
		$('#numberOfMatches').hide();
		
	}
	
	function validateAnalysis(type){
		
		showLoader();
		$.ajax({
			url:"/SORAServices/social/validateAnalysis.json",
			type:"POST",
			data:"bugId="+bugId+"&user="+userId+"&type="+type,
			success:function(data){
				if(type=='C'){
					$('#configValidatedBy').html(data);
					$('#validConf').hide();
					$('#undoValidConf').show();
					if(projectInfoModel.isMerged=='Y'){
						mergeBugModel.displayConfigUndo='';
						mergeBugModel.numberOfConfigValidations=data;
						mergeBugModel.displayConfigValidate='style=display:none';
					}else{
						bugModel.displayConfigUndo='';
						bugModel.numberOfConfigValidations=data;
						bugModel.displayConfigValidate='style=display:none';
					}
					
					
				}
				if(type=='F'){
					$('#featureValidatedBy').html(data);
					$('#validFeat').hide();
					$('#undoValidFeat').show();
					if(projectInfoModel.isMerged=='Y'){
						mergeBugModel.displayFeatureUndo='';
						mergeBugModel.numberOfFeatureValidations=data;
						mergeBugModel.displayFeatureValidate='style=display:none';
						
					}else{
						bugModel.displayFeatureUndo='';
						bugModel.numberOfFeatureValidations=data;
						bugModel.displayFeatureValidate='style=display:none';
						
					}
					
				}
				if(type == 'H'){
					$('#hardwareValidatedBy').html(data);
					$('#validHardware').hide();
					$('#undoValidHardware').show();
					if(projectInfoModel.isMerged=='Y'){
						mergeBugModel.displayHardwareUndo = '';
						mergeBugModel.numberOfHardwareValidations = data;
						mergeBugModel.displayHardwareValidate = 'style=display:none';
						
					}else{
						bugModel.displayHardwareUndo = '';
						bugModel.numberOfHardwareValidations = data;
						bugModel.displayHardwareValidate = 'style=display:none';
						
					}
					
				}
				if(type=='R'){
					$('#releaseValidatedBy').html(data);
					$('#validRel').hide();
					$('#undoValidRel').show();
					if(projectInfoModel.isMerged=='Y'){
						mergeBugModel.displayReleaseUndo='';
						mergeBugModel.numberOfReleaseValidations=data;
						mergeBugModel.displayReleaseValidate='style=display:none';
						
					}else{
						bugModel.displayReleaseUndo='';
						bugModel.numberOfReleaseValidations=data;
						bugModel.displayReleaseValidate='style=display:none';
						
					}
					
				}
				hideLoader();
				
			},
			error : function (XMLHttpRequest, textStatus, errorThrown) {
				
			} 
		});
	}
	
	function undoAnalysis(type){
		showLoader();
		$.ajax({
			url:"/SORAServices/social/undoValidateAnalysis.json",
			type:"POST",
			data:"bugId="+bugId+"&user="+userId+"&type="+type,
			success:function(data){
				if(type=='C'){
					$('#configValidatedBy').html(data);
					$('#validConf').show();
					$('#undoValidConf').hide();
					if(projectInfoModel.isMerged=='Y'){
						mergeBugModel.displayConfigUndo='style=display:none';
						mergeBugModel.numberOfConfigValidations=data;
						mergeBugModel.displayConfigValidate='';
					}else{
						bugModel.displayConfigUndo='style=display:none';
						bugModel.numberOfConfigValidations=data;
						bugModel.displayConfigValidate='';
					}
				}
				if(type=='F'){
					$('#featureValidatedBy').html(data);
					$('#validFeat').show();
					$('#undoValidFeat').hide();
					if(projectInfoModel.isMerged=='Y'){
						mergeBugModel.displayFeatureUndo='style=display:none';
						mergeBugModel.numberOfFeatureValidations=data;
						mergeBugModel.displayFeatureValidate='';
						
					}else{
						bugModel.displayFeatureUndo='style=display:none';
						bugModel.numberOfFeatureValidations=data;
						bugModel.displayFeatureValidate='';
						
					}
				}
				if(type=='H'){
					$('#hardwareValidatedBy').html(data);
					$('#validHardware').show();
					$('#undoValidHardware').hide();
					
					if(projectInfoModel.isMerged=='Y'){
						mergeBugModel.displayHardwareUndo = 'style=display:none';
						mergeBugModel.numberOfHardwareValidations = data;
						mergeBugModel.displayHardwareValidate = '';
						
					}else{
						bugModel.displayHardwareUndo = 'style=display:none';
						bugModel.numberOfHardwareValidations = data;
						bugModel.displayHardwareValidate = '';
						
					}
					
				}
				if(type=='R'){
					$('#releaseValidatedBy').html(data);
					$('#validRel').show();
					$('#undoValidRel').hide();
					if(projectInfoModel.isMerged=='Y'){
						mergeBugModel.displayReleaseUndo='style=display:none';
						mergeBugModel.numberOfReleaseValidations=data;
						mergeBugModel.displayReleaseValidate='';
						
					}else{
						bugModel.displayReleaseUndo='style=display:none';
						bugModel.numberOfReleaseValidations=data;
						bugModel.displayReleaseValidate='';
						
					}
					
				}
				hideLoader();
			},
			error : function (XMLHttpRequest, textStatus, errorThrown) {
				
			} 
		});
		
	}
	
	function saveBugAttributesSocial(type){
		showLoader();
		var param="&projectId="+projectInfoModel.projectId;
		if(projectInfoModel.isMerged=='Y'){
			
			param+="&bugId="+mergeBugModel.bugId;
			param+="&component="+mergeBugModel.internalComp;
			if(mergeBugModel.isSmu==true){
				param+="&isSmu=true";
				param+="&smuComponent="+mergeBugModel.component;
			}else{
				param+="&isSmu=false";
				param+="&smuComponent=''";
			}
			param+="&state="+mergeBugModel.state+"&regression="+mergeBugModel.regression;
			param+="&severity="+mergeBugModel.severity+"&headline="+encodeURIComponent(mergeBugModel.headLine);
			param+="&relNotes="+encodeURIComponent(mergeBugModel.relNotes)+"&product="+encodeURIComponent(mergeBugModel.product)+"&found="+mergeBugModel.found;
		
			
		}else{
			param+="&bugId="+bugModel.bugId;
			param+="&component="+bugModel.internalComp;
			if(bugModel.isSmu==true){
				param+="&isSmu=true";
				param+="&smuComponent="+bugModel.component;
			}else{
				param+="&isSmu=false";
				param+="&smuComponent=''";
			}
			param+="&state="+bugModel.state+"&regression="+bugModel.regression;
			param+="&severity="+bugModel.severity+"&headline="+encodeURIComponent(bugModel.headLine);
			param+="&relNotes="+encodeURIComponent(bugModel.relNotes)+"&product="+encodeURIComponent(bugModel.product)+"&found="+bugModel.found;
		
		}
		
		$.ajax({
			url:"/SORAServices/social/saveBugAttributes.json",
			type:"POST",
			data:param,
			success:function(data){
				validateAnalysis(type);
				
			},
			error : function (XMLHttpRequest, textStatus, errorThrown) {
				
			} 
		});
		
		
		
	}
	return {
		getConfigSearchResult:function(){
			if(projectInfoModel.isMerged=='Y'){
				searchConfigMerge();
			}else{
				searchConfigNormal();
			}
			
		},
		getFeatureSearchResult:function(){
			if(projectInfoModel.isMerged=='Y'){
				searchFeatureMerge();
			}else{
				searchFeatureNormal();
			}
			
		},
		getHardwareSearchResult:function(){
			if(projectInfoModel.isMerged=='Y'){
				searchHardwareMerge();
			}else{
				searchHardwareNormal();
			}
		},
		
		search:function(){
			if(this.searchType=='C'){
				configSearch.getConfigSearchResult();
			}else if(this.searchType=='F'){
				configSearch.getFeatureSearchResult();
				
			}else if(this.searchType=='H'){
				console.log('Searching hardware...');
				configSearch.getHardwareSearchResult();
			
			}else{
				configSearch.getConfigSearchResult();
				console.log("Release analysis selected");
			}
			
		},
		
		clearConfigSearchResult:function(){
			 $('#configSearchResult').hide();
			 $('#configSearchResultFailure').hide();
			 $('#searchString').val("");
			 if(projectInfoModel.isMerged=='Y'){
				 var mergeParentDetails =configModel.mergeProjectData;
				 if(mergeParentDetails!=null){
					 for(i=0;i<mergeParentDetails.length;i++){
						 var parentProject =mergeParentDetails[i].parentProjectId;
						 $('#parent_'+parentProject).hide();
					 }
				 }
					
			}
		},
		collapseConfigOverlay: function(){
			$('#expandOverlayConfig').hide();
			$('#configSearchContainer').hide();
			$('#collapseOvelayConfig').hide();
		},
	
		expandConfigOverlay: function(){
		
			$('#expandOverlayConfig').hide();
			$('#configSearchContainer').show();
			$('#collapseOvelayConfig').show();
		},
		
		
		nextResult:function(){
			if(currentIndex == searchResult.length-1){
				alert("Last Search Result shown");
				return;
				
			}
			currentIndex++;
			
			showSearchResult();
			
			
		},
		previousResult:function(){
			
			if(currentIndex == 0){
				alert("First search Result");
				return;
				
			}
			currentIndex--;
			
			showSearchResult();
		},
		
		getMergeConfigDetails:function(parentProjectId,custName){
			searchResult=mergeResult[parentProjectId];
			console.log("Size of search Result"+searchResult.length);
			currentIndex=0;
			
			$('#configSearchResult').show();
			$('#configParentProject').html(parentProjectId);
			$('#configCustomer').html(custName);
			showFullSearchResult();
			
			
			
		},
		
		getSnippet:	function(index){
			currentIndex=index;
			$('#indexConf').html("Showing "+(currentIndex+1));
			$('#numberOfMatches').html(" of "+searchResult.length+" Matches");
			showSearchResult();
			$('#configSearchResultFailure').hide();
			$('#configSearchResult').show();
			$('#fullResult').css("height","100px");
			$('#fullResult').css("overflow","scroll");
			$('#searchSnippet').show();
			
		},
		/*Function called when different exclusion criteria selected*/
		setSearchType:function(type){
			this.searchType=type;
			if(type=='C'){
				configSearchView = new ConfigView({ el: $("#configSearch"),model:configModel});
				
				$('#searchString').val("");
				$('#searchString').attr("placeholder","Search Uploaded Configurations");
			
				
					$("#searchString").autocomplete({
						source: " ",
				        minLength: 2,
				        width:300,
				        zIndex: 7000,
				        appendTo:'#autoCompleteResult'
					});
			
			}else if(type=='F'){
				configSearchView = new ConfigView({ el: $("#configSearch"),model:configModel});
				
				$('#searchString').val("");
				$('#searchString').attr("placeholder","Search Uploaded Features");
			
					$("#searchString").autocomplete({
						source: "/SORAServices/config/getFeatures.json?osType="+projectInfoModel.osType,
				        minLength: 2,
				        width:300,
				        zIndex: 7000,
				        appendTo:'#autoCompleteResult'
					});
			

			}else if(type=='H'){
				configSearchView = new ConfigView({ el: $("#configSearch"),model:configModel});
				
				$('#searchString').val("");
				$('#searchString').attr("placeholder","Search Uploaded Hardware");
				
					$("#searchString").autocomplete({
						source: "/SORAServices/config/getHardware.json?",
				        minLength: 2,
				        width:300,
				        zIndex: 7000,
				        appendTo:'#autoCompleteResult'
					});
			
			}else if(type=='R'){
					configSearch.collapseConfigOverlay();
					if(projectInfoModel.isMerged=='Y'){
						if(!(_.contains(mergeBugModel.analysedReleases, projectInfoModel.startRel))){
							$("#relFinal").append('<input type="checkbox" name="relAnalysis"  value="R##'+projectInfoModel.startRel+'" /> Release '+projectInfoModel.startRel+'<br/>');
							
							mergeBugModel.analysedReleases.push(trim(projectInfoModel.startRel));
						}
					}else{
						if(!(_.contains(bugModel.analysedReleases, projectInfoModel.startRel))){
							$("#relFinal").append('<input type="checkbox" name="relAnalysis"  value="R##'+projectInfoModel.startRel+'" /> Release '+projectInfoModel.startRel+'<br/>');
							
							bugModel.analysedReleases.push(trim(projectInfoModel.startRel));
						}
						
					}
					
					$('#releaseAnalysisResult').show();
			}else{
				configSearch.collapseConfigOverlay();
			}
			configSearch.clearConfigSearchResult();
		},
		
		
		/* Function Called when Apply Analysis clicked from the Pop Up*/
		applyAnalysis:function(){
			
			if(this.searchType=='F'){
				if($('#featureFinal').val()!=''){
					additionalAnalysisView = new AdditionalAnalysisView({el:$("#modal")});
					$('#exisiting').html($('#featureFinal').val());
					$('#additionalAnalysisText').val($('#searchString').val());
					$('#additionalAnalysisText').prop('title',$('#additionalAnalysisText').val());
					
					$('#additionalAnalysisFooter').html('<button  type="button" onclick="javascript:configSearch.saveAdditionalAnalysis(\'F\');" class="btn btn-primary" id="saveAdditional" >Save</button>');
					$('#modal').modal('show');
					
				}else{
					$('#featureFinal').val($('#searchString').val());
					$('#featureAnalysisResult').show();
				}
				

			}else if(this.searchType == 'H'){
				if($('#hardwareFinal').val() != ''){
					additionalAnalysisView = new AdditionalAnalysisView({el:$("#modal")});
					$('#exisiting').html($('#hardwareFinal').val());
					$('#additionalAnalysisText').val($('#searchString').val());
					$('#additionalAnalysisText').prop('title',$('#additionalAnalysisText').val());
					$('#additionalAnalysisFooter').html('<button  type="button" onclick="javascript:configSearch.saveAdditionalAnalysis(\'H\');" class="btn btn-primary" id="saveAdditional" >Save</button>');
					$('#modal').modal('show');
					
				}else{
				
					$('#hardwareFinal').val($('#searchString').val());
					$('#hardwareAnalysisResult').show();
				}
			}else if(this.searchType=='C'){
				if($('#configFinal').val()!=''){
					additionalAnalysisView = new AdditionalAnalysisView({el:$("#modal")});
					$('#exisiting').html($('#configFinal').val());
					$('#additionalAnalysisText').val($('#searchString').val());
					$('#additionalAnalysisText').prop('title',$('#additionalAnalysisText').val());
					$('#additionalAnalysisFooter').html('<button  type="button" onclick="javascript:configSearch.saveAdditionalAnalysis(\'C\');" class="btn btn-primary" id="saveAdditional" >Save</button>');
					
					$('#modal').modal('show');
					
				}else{
					$('#configAnalysisResult').show();
					$('#configFinal').val($('#searchString').val());
				}
			}else{
				console.log("Release");
			}
			configSearch.clearConfigSearchResult();
			
		},
		
		saveAdditionalAnalysis:function(type){
			
			if(type=='C'){
				var selected;
			
				selected = $('input:radio[name=additionalAnalysis]:checked').val();
				console.log(selected);
				if(selected=='add'){
					if(trim($('#additionalAnalysisText').val())==""){
						alert("Kindly enter a valid analysis");
						return;
					}
					$('#configFinal').val($('#configFinal').val() +" "+ $('#additionalParameter').val()+" "+$('#additionalAnalysisText').val());
					$('#modal').modal('hide');
				}else if(selected=='delete'){
					
					invalidateView = new InvalidateAnalysisView({el:$("#modal")});
					$('#parameter').html('New Config Analysis');
					$('#parameterRemove').html("Config Analysis Not Applicable");
					$('#invalidateFooter').html('<button type="button" onclick="configSearch.saveInvalidate(\'C\');" class="btn btn-primary" id="update" data-toggle="tooltip" title="Saves Invalidate Data">Save </button>');
					
				}else{
					alert("Choose one of the Options");
					return;	
				}
			}else if(type=='F'){
				
				var selected;
				
				selected = $('input:radio[name=additionalAnalysis]:checked').val();
				console.log(selected);
				if(selected=='add'){
					if(trim($('#additionalAnalysisText').val())==""){
						alert("Kindly enter a valid analysis");
						return;
					}
					$('#featureFinal').val($('#featureFinal').val() +" "+ $('#additionalParameter').val()+" "+$('#additionalAnalysisText').val());
					$('#modal').modal('hide');
				}else if(selected=='delete'){
					
					invalidateView = new InvalidateAnalysisView({el:$("#modal")});
					$('#parameter').html('New Feature Analysis');
					$('#parameterRemove').html("Feature Analysis Not Applicable");
					$('#invalidateFooter').html('<button type="button" onclick="configSearch.saveInvalidate(\'F\');" class="btn btn-primary" id="update" data-toggle="tooltip" title="Saves Invalidate Data">Save </button>');
					
				}else{
					alert("Choose one of the Options");
					return;	
				}
				
				
			}else if(type=='H'){
				
				var selected;
				
				selected = $('input:radio[name=additionalAnalysis]:checked').val();
				console.log(selected);
				if(selected=='add'){
					if(trim($('#additionalAnalysisText').val())==""){
						alert("Kindly enter a valid analysis");
						return;
					}
					$('#hardwareFinal').val($('#hardwareFinal').val() +" "+ $('#additionalParameter').val()+" "+$('#additionalAnalysisText').val());
					$('#modal').modal('hide');
				}else if(selected=='delete'){
					
					invalidateView = new InvalidateAnalysisView({el:$("#modal")});
					$('#parameter').html('New Hardware Analysis');
					$('#parameterRemove').html("Hardware Analysis Not Applicable");
					$('#invalidateFooter').html('<button type="button" onclick="configSearch.saveInvalidate(\'H\');" class="btn btn-primary" id="update" data-toggle="tooltip" title="Saves Invalidate Data">Save </button>');
					
				}else{
					alert("Choose one of the Options");
					return;	
				}
				
				
			}
		},
		
		
		validate:function(type){
			
			
			
			if(type=='C'){
				var numberOfValidators =$('#configValidatedBy').html();
				if(numberOfValidators>=accessListModel.minValidatorsSocial){
					var ok =confirm("Validation will lead to Exclusion from all Projects Matching Criteria , Do you want to continue ?");
					if(!ok){
						return;
					}
				}
				var newConfigAnalysis  = $('#configFinal').val();
				var existingConfigAnalysis;
				if(projectInfoModel.isMerged=='Y'){
					existingConfigAnalysis=mergeBugModel.configAnalysis;
				}else{
					existingConfigAnalysis=bugModel.configAnalysis;
				}
				if(existingConfigAnalysis!=newConfigAnalysis){
					configSearch.collapseConfigOverlay();
					saveBugListPage('UPDATE');
					setTimeout(function() {
						validateAnalysis('C');
					}, 3000);
				}else{
					saveBugAttributesSocial('C');
					
				}
				
			}
			if(type=='F'){
				var numberOfValidators =$('#featureValidatedBy').html();
				if(numberOfValidators>=accessListModel.minValidatorsSocial){
					var ok =confirm("Validation will lead to Exclusion from all Projects Matching Criteria , Do you want to continue ?");
					if(!ok){
						return;
					}
				}
				
				var newFeatureAnalysis  = $('#featureFinal').val();
				var existingFeatureAnalysis;
				if(projectInfoModel.isMerged=='Y'){
					existingFeatureAnalysis=mergeBugModel.featureAnalysis;
				}else{
					existingFeatureAnalysis=bugModel.featureAnalysis;
				}
				if(existingFeatureAnalysis!=newFeatureAnalysis){
					configSearch.collapseConfigOverlay();
					saveBugListPage('UPDATE');
					setTimeout(function() {
						validateAnalysis('F');
					}, 3000);
				}else{
					saveBugAttributesSocial('F');
					
				}
				
			}
			if(type=='H'){
			
				

				var numberOfValidators =$('#hardwareValidatedBy').html();
				if(numberOfValidators >= accessListModel.minValidatorsSocial){
					var ok =confirm("Validation will lead to Exclusion from all Projects Matching Criteria , Do you want to continue ?");
					if(!ok){
						return;
					}
				}
				
				var newHardwareAnalysis  = $('#hardwareFinal').val();
				var existingHardwareAnalysis;
				if(projectInfoModel.isMerged=='Y'){
					existingHardwareAnalysis=mergeBugModel.hardwareAnalysis;
				}else{
					existingHardwareAnalysis=bugModel.hardwareAnalysis;
				}
				if(existingHardwareAnalysis != newHardwareAnalysis){
					configSearch.collapseConfigOverlay();
					saveBugListPage('UPDATE');
					setTimeout(function() {
						validateAnalysis('H');
					}, 3000);
				}else{
					saveBugAttributesSocial('H');
					
				}
				
			
				
			}
			if(type=='R'){
				var numberOfValidators =$('#releaseValidatedBy').html();
				if(numberOfValidators>=accessListModel.minValidatorsSocial){
					var ok =confirm("Validation will lead to Exclusion from all Projects Matching Criteria , Do you want to continue ?");
					if(!ok){
						return;
					}
				}
				var newReleaseAnalysis="";
				var existingReleaseAnalysis;
				if(projectInfoModel.isMerged=='Y'){
					existingReleaseAnalysis=trim(mergeBugModel.releaseAnalysis);
				}else{
					existingReleaseAnalysis=trim(bugModel.releaseAnalysis);
				}
				
				$('input[name="relAnalysis"]:checked').each(function() {
					newReleaseAnalysis=newReleaseAnalysis+this.value+ " AND "; 
				});
				
				if(!(newReleaseAnalysis==""&&existingReleaseAnalysis==null)){
					newReleaseAnalysis=trim(newReleaseAnalysis.substring(0, newReleaseAnalysis.length-4));
					console.log("New"+newReleaseAnalysis+"$$$Exisitng"+existingReleaseAnalysis);
					if(existingReleaseAnalysis!=newReleaseAnalysis){
						console.log("Not same updating");
						saveBugListPage('UPDATE');
						setTimeout(function() {
							if(!(trim(newReleaseAnalysis)=="")){
								validateAnalysis('R');
							}
						}, 1000);
					}else{
						if(!(trim(newReleaseAnalysis)=="")){
							saveBugAttributesSocial('R');
							
						}
					}
				}else{
					if(!(trim(newReleaseAnalysis)=="")){
						saveBugAttributesSocial('R');
						
					}
					
				}
				
			}
		},
		undoValidate:function(type){
			if(type=='C'){
				undoAnalysis('C');
			}
			if(type=='F'){
				undoAnalysis('F');
			}
			if(type=='H'){
				undoAnalysis('H');
			}
			if(type=='R'){
				undoAnalysis('R');
				
			}
		},
		invalidate:function(type){
			
			invalidateView = new InvalidateAnalysisView({el:$("#modal")});
			if(type=='F'){
				$('#parameter').html('New Feature Analysis');
				$('#parameterRemove').html("&nbsp;Feature Analysis Not Applicable");
				$('#invalidateFooter').html('<button type="button" onclick="configSearch.saveInvalidate(\'F\');" class="btn btn-primary" id="update" data-toggle="tooltip" title="Saves Invalidate Data">Save </button>');
			}
			
			if(type=='H'){
				$('#parameter').html('New Hardware Analysis');
				$('#parameterRemove').html("Hardware Analysis Not Applicable");
				$('#invalidateFooter').html('<button type="button" onclick="configSearch.saveInvalidate(\'H\');" class="btn btn-primary" id="update" data-toggle="tooltip" title="Saves Invalidate Data">Save </button>');
			}
			
			if(type=='C'){
				$('#parameter').html('New Config Analysis');
				$('#parameterRemove').html("Config Analysis Not Applicable");
				
				$('#invalidateFooter').html('<button type="button" onclick="configSearch.saveInvalidate(\'C\');" class="btn btn-primary" id="update" data-toggle="tooltip" title="Saves Invalidate Data">Save </button>');
			}
			
			if(type=='R'){
				configSearch.selectInvalidate('R');
				$('#invalidReason').html('<input type="radio" name="invalidation" value="remove" checked >&nbsp<span id="parameterRemove">Release Excusion Not Applicable </span></input><br/><br/><span id="removeAnalysisSpan" ><textarea name="invalidComments" id="invalidComments" rows="5" cols="50"></textarea></span>');
				$('#invalidateFooter').html('<button type="button" onclick="configSearch.saveInvalidate(\'R\');" class="btn btn-primary" id="update" data-toggle="tooltip" title="Saves Invalidate Data">Save </button>');
			}
			$('#modal').modal('show');
			
		},
		
		//Fucntion Called on Selecting  different invalidate options
		selectInvalidate:function(type){
			if(type=='N'){
				$('#newAnalysisSpan').show();
				$('#removeAnalysisSpan').hide();
			}
			if(type=='R'){
				$('#removeAnalysisSpan').show();
				$('#newAnalysisSpan').hide();
			}
			
		},
		
		saveInvalidate:function(type){
			
				var invalidate = $('input:radio[name=invalidation]:checked').val();
			
				var rejectReason;
				if(invalidate=='remove'){
					rejectReason=$('#invalidComments').val();
					if(trim(rejectReason)==""){
						alert("Valid Reason is mandatory for removing an existing analysis");
						return;
					}
				}
				
				if(invalidate=='new'){
					if(trim($('#newAnalysis').val())==""){
						alert("New Analysis is mandatory while invalidating");
						return;
						
					}
				}
				showLoader();
				$.ajax({
					url:"/SORAServices/social/invalidateAnalysis.json",
					type:"POST",
					data:"bugId="+bugId+"&user="+userId+"&rejectReason="+rejectReason+"&projectId="+projectInfoModel.projectId+"&type="+type,
					success:function(data){
						if(type=='C'){
							if(invalidate=='new'){
								$('#configFinal').val($('#newAnalysis').val());
								
								
							}else if(invalidate=='remove'){
								//TO DO save invalidated data in a table for reference
								$('#configFinal').val("");
								$('#configAnalysisResult').hide();
								
							}
							$('#configValidatedBy').html('0');
							$('#validConf').show();
							$('#undoValidConf').hide();
							$('#modal').modal('hide');
							saveBugListPage('UPDATE');
							
						}
						if(type=='F'){
							if(invalidate=='new'){
								$('#featureFinal').val($('#newAnalysis').val());
								
								
							}else if(invalidate=='remove'){
								//TO DO save invalidated data in a table for reference
								$('#featureFinal').val("");
								$('#featureAnalysisResult').hide();
								
							}
							$('#featureValidatedBy').html('0');
							$('#validFeat').show();
							$('#undoValidFeat').hide();
							$('#modal').modal('hide');
							saveBugListPage('UPDATE');
							
						}
						if(type=='H'){
							if(invalidate=='new'){
								$('#hardwareFinal').val($('#newAnalysis').val());
								
								
							}else if(invalidate=='remove'){
								//TO DO save invalidated data in a table for reference
								$('#hardwareFinal').val("");
								$('#hardwareAnalysisResult').hide();
								
							}
							$('#hardwareValidatedBy').html('0');
							$('#validHardware').show();
							$('#undoValidHardware').hide();
							$('#modal').modal('hide');
							saveBugListPage('UPDATE');
							
						}
						
						if(type=='R'){
							
							
							$('input[name="relAnalysis"]:checkbox').removeAttr('checked');
							$('#releaseAnalysisResult').hide();
							$('#releaseValidatedBy').html('0');
							$('#validRel').show();
							$('#undoValidRel').hide();
							saveBugListPage('UPDATE');
						}
						hideLoader();
					},
					error : function (XMLHttpRequest, textStatus, errorThrown) {
						
					} 
				});
				
				
			
			
		},
		
		
		showPopOver:function (type){
			if(type=='C'){
				
				$('#configFinal').popover('destroy');
				$('#configFinal').popover({content:$('#configFinal').val(),placement:'top'});
				$('#configFinal').popover('show');
				
			}
			
			if(type=='F'){
				$('#featureFinal').popover('destroy');
				$('#featureFinal').popover({content:$('#featureFinal').val(),placement:'top'});
				$('#featureFinal').popover('show');
				
			}
			
			if(type == 'H'){
				
				$('#hardwareFinal').popover('destroy');
				$('#hardwareFinal').popover({content:$('#hardwareFinal').val(),placement:'top'});
				$('#hardwareFinal').popover('show');
				
			}
			
		},
		
		hidePopOver:function(type){
			if(type=='C'){
				$('#configFinal').popover('hide');
			}
			if(type=='F'){
				$('#featureFinal').popover('hide');
			}
			if(type=='H'){
				$('#hardwareFinal').popover('hide');
			}
			
		},
		showValidators:function(type,bugId){
			
			
				$.ajax({
					url:"/SORAServices/social/getValidators.json",
					type:"GET",
					data:"bugId="+bugId+"&type="+type,
					success:function(data){
						if(data!=""){
							
							var tableHtml=[];
							tableHtml.push("<table id='pplListTable' class='cust-grid1'>");
							 $.each(data, function(i, user) {
								 tableHtml.push("<tr><td>" + user +"</td></tr>");
							 });
							 tableHtml.push("</table>");
							 dojo.query('#pplListTable tr:nth-child(odd)').forEach(function(item){
						    		dojo.addClass(item, "row-odd");
							 });
							 $("#showPeopleDiv").html(tableHtml.join(""));
							 $("#showPeopleDialog").dialog({title:'Validated By'});
						
					 		 $("#showPeopleDialog").dialog("open");
						}
						
					},
					error : function (XMLHttpRequest, textStatus, errorThrown) {
						
					} 
				});
			
			
			
		},
		copyAnalysis:function(type){
			$('#bugSelStatus').val("EPC");
			if(type=='C'){
				var acText = $('textarea#accountComments').val();
				var analysis = 'This Bug will not impact customers not configured '+$('#configFinal').val();
				$('textarea#accountComments').val(analysis + "\n" + acText );
				
				
			}
			if(type=='F'){
				var acText = $('textarea#accountComments').val();
				var analysis = 'This Bug will not impact customers not using '+$('#featureFinal').val();
				$('textarea#accountComments').val(analysis + "\n" + acText );
				
				
			}
			if(type=='H'){
				var acText = $('textarea#accountComments').val();
				var analysis = 'This Bug will not impact customers not using '+$('#hardwareFinal').val();
				$('textarea#accountComments').val(analysis + "\n" + acText );
				
				
			}
			if(type=='R'){
				var acText = $('textarea#accountComments').val();
				var newReleaseAnalysis='';
				$('input[name="relAnalysis"]:checked').each(function() {
					newReleaseAnalysis=newReleaseAnalysis+this.value+ ","; 
				});
				newReleaseAnalysis=newReleaseAnalysis.replace(/R##/g,'');
				var analysis = 'This Bug will not impact Release '+trim(newReleaseAnalysis);
				$('textarea#accountComments').val(analysis + "\n" + acText );
				
			}
		}

		
		
	};
	
}());

var serviceRequestView;

var currentServiceRequest;

function getSRDetails(throttle,productFamily,id){
	
	$('.links').css("color","#0000EE");
	$('#'+id).css("color","#900000");
	
	$.ajax({
		url:"/SORAServices/buglist/getSrDetailData.json",
		type:"POST",
		data:"serviceReqs="+currentServiceRequest+"&throttle="+throttle+"&prodFamily="+productFamily,
		success:function(data){
			var tableString='<table class="table table-striped" style="width:650px;height:auto;overflow:scroll">';
			tableString=tableString+'<tr class="row-even"><th style="width:160px">Service Request</th><th style="width:160px">PID</th><th style="width:40px">Hardware Family</th><th style="width:40px">Release</th><th style="width:160px">Company</th><th style="width:160px">Status</th></tr>';
			
			for(i=0;i<data.data.length;i++){
				
				if(i%2==0){
					tableString=tableString+'<tr class="row-even">';
				}else{
					tableString=tableString+'<tr class="row-odd">';
				}
				tableString=tableString+'<td style="width:160px">'+data.data[i].srIdLink+'</td><td style="width:160px">'+data.data[i].pid+'</td><td style="width:120px">'+data.data[i].hwFamily+'</td><td style="width:40px">'+data.data[i].release+'</td><td style="width:160px">'+data.data[i].company+'</td><td style="width:160px">'+data.data[i].status+'</td></tr>';
				tableString=tableString+'</tr>'
				
			}
			tableString=tableString+'</table>';
			
			$('#srCompleteDetails').html(tableString);
			$('#srCompleteDetails').show();
			$('#modal').modal('show');
		},
		error : function (XMLHttpRequest, textStatus, errorThrown) {
			
		} 
	});
	return false;	
	
}

function getSRData(bugId,serviceReqs,release, customerId, osType,prodFamily,srCount){
	
	currentServiceRequest=serviceReqs;
	showLoader();
	$('#srCompleteDetails').hide();
	$.ajax({
		url:"/SORAServices/buglist/getParsedSRData.json",
		type:"POST",
		data:"bugId="+bugId+"&serviceReqs="+serviceReqs+"&release="+release+"&customerId="+customerId+"&osType="+osType+"&prodFamily="+prodFamily,
		success:function(data){
			hideLoader();
			serviceRequestView = new ServiceRequestView({el:$("#modal")});
			var tableString='<table class="table table-striped" style="width:650px;height:auto;overflow:scroll">';
			for(i=0;i<data.data.length;i++){
				
				var productfamilyData = data.data[i].srProductFamily;
				if(i==0){
					
					
					tableString=tableString+'<tr>';
					tableString=tableString+'<th></th>';
					for(j=0;j<productfamilyData.length;j++){
						tableString=tableString+'<th>'+productfamilyData[j].productFamily+'&nbsp;('+productfamilyData[j].productFamilyPercentage+'%)</th>';
					}
					tableString=tableString+'</tr>';
				}
				if(i%2==0){
					tableString=tableString+'<tr>';
				}else{
					tableString=tableString+'<tr>';
				}
				
				tableString=tableString+'<td><b>'+data.data[i].throttle+'&nbsp;('+data.data[i].throttlePercentage+'%)</b></td>';
				for(j=0;j<productfamilyData.length;j++){
						var value =productfamilyData[j].value;
						var percentage=productfamilyData[j].percentage;
						if(productfamilyData[j].value!=0){
							tableString=tableString+'<td style="width:160px" align="center"><a class="links" id=\''+i+''+j+'\' style="text-decoration:underline;color:#0000EE;cursor:pointer;" onclick="getSRDetails(\''+data.data[i].hiddenThrottle+'\',\''+productfamilyData[j].hiddenProdFamily+'\',\''+i+''+j+'\');" >'+productfamilyData[j].value+'</a>&nbsp;('+productfamilyData[j].percentage+'%)</td>';
						}else{
							tableString=tableString+'<td style="width:160px" align="center">'+productfamilyData[j].value+'&nbsp;('+productfamilyData[j].percentage+'%)</td>';
						}
				}
				
				
				tableString=tableString+'</tr>';
			}
			tableString=tableString+'<table>';
			$('#srDetails').html(tableString);
			$('#srCount').html('Total Service Requests: <b>'+srCount+'</b>');
			$('#modal').modal('show');
			
			
		},
		error : function (XMLHttpRequest, textStatus, errorThrown) {
			
		} 
	});
	return false;
	
}

$(document).keypress(function(e) {

	if(e.which == 13) {
    	
		configSearch.search();
   	 	
    
	}
});
