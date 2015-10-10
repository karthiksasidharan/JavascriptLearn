var projectInfoModel  = new ProjectInfoModel();
var accessListModel = new AccessListModel();
var cwsBugView;
var accountCommentsView;
var AffectedProjectsData = Backbone.Model.extend({
    defaults: {
    	projId: "Not specified",
    	selStatus: "Not specified",
    	accountComments:"Not specified",
    	accountSeverity:"Not Specified",
    	startRel:"Not Specified"
    },
    initialize: function(){
        
    }
});

var AffectedProjectsDataList = Backbone.Collection.extend({
    model: AffectedProjectsData
});

CwsBugModel = BugModel.extend({
	defaults:{
		
		affectedProjects:'',
		affectedProjectsArray:'',
		//Used to store the selection status chosen for each of the affected projects 
		//To Do find a better way using closures
		tempSelStatus:'',
		tempProjectId:'',
		tempStartRel:'',
		//first Project id for email DE
		firstProjectId:''
		
	},
	
	initialize: function(){
	
	},
	setValues : function(data){
		
		this.constructor.__super__.setValues.apply(this, arguments);
		this.affectedProjectsArray = new AffectedProjectsDataList();
		
		
	},
	
	setAffectedProjects : function(deltaBugs,bugId){
		
		
		var bugData=deltaBugs["bugdetails"][bugId];
		if(bugData!=null && bugData.length!=0){
			var table='';
			
			for(var i in deltaBugs["projectList"]){
				projId=deltaBugs["projectList"][i]["id"];
				if(bugData[projId]!=null){
					
					var projectData = bugData[projId];
					var selectionStatus = this.createSelectionStausDropDownCws(bugId, projectData.selectionStatus,this.terminalBug,this.globalReviewFlag,this.psirtYn,projId,projectData.release);
					table+='<tr><td><a target="_new" href="'+deltaBugs["projectList"][i]["link"]+'" >'+deltaBugs["projectList"][i]["name"]+'</a></td><td><b>Target Release: </b>'+projectData.release+'</td><td>'+selectionStatus+'</td></tr>';
				}
			}
			this.affectedProjects=table;
			
		}else{
			this.affectedProjects='';
			
		}
		this.firstProjectId=deltaBugs["projectList"][0]["id"];
		
	},
	
	
	
	//function to create selection status options
	createSelectionStausDropDownCws:function(bugId,selStatus,terminalBug,globalReviewFlag,psirtFlag,projectId,startRel){
		//Temporary string to construct the selection status options with the selected value
		var tempStrStatus='';
		if(psirtFlag=='Y'){
			tempStrStatus=tempStrStatus+'<select id="bugSelStatus'+projectId+bugId+'" disabled name="bugSelectStatus" style="width:250px;" onchange="selectionStatusChanged(\''+bugId+'\',\''+projectId+'\',\''+startRel+'\')">';
			tempStrStatus=tempStrStatus+'<option value="HLO" selected>PSIRT bug always excluded</option>';
			tempStrStatus=tempStrStatus+'</select>';
			return tempStrStatus;
		}else{
			tempStrStatus=tempStrStatus+'<select id="bugSelStatus'+projectId+bugId+'" name="bugSelectStatus" style="width:250px;" onchange="selectionStatusChanged(\''+bugId+'\',\''+projectId+'\',\''+startRel+'\')">';
		
			if(selStatus=='HLO'){
				tempStrStatus=tempStrStatus+'<option value="HLO" selected >Flagged to Review (Default)</option>';
			}
			if(selStatus=='ETD' || selStatus=='ECD' || selStatus=='EOD'){
				tempStrStatus=tempStrStatus+'<option value="'+selStatus+'" selected >Exclude for this project Only(Default)</option>';
				
			}
			
			tempStrStatus=tempStrStatus+'<option value="IPC"';
			if(selStatus=='IPC'){
				tempStrStatus=tempStrStatus+'selected ';
			}
			tempStrStatus=tempStrStatus+'>Include for this project only</option>';
			
			tempStrStatus=tempStrStatus+'<option '; 
			if(selStatus=='EXD'||selStatus=='EPC'){
				tempStrStatus=tempStrStatus+'value="'+selStatus+'" selected ';
			}else{
				tempStrStatus=tempStrStatus+'value="EPC"';
			}
			tempStrStatus=tempStrStatus+'>Exclude for this project only</option>';
			
			
			tempStrStatus=tempStrStatus+'<option '; 
			if(selStatus=='HLI'||selStatus=='HLE'){
				tempStrStatus=tempStrStatus+'value="'+selStatus+'" selected ';
			}else{
				if(selStatus=='HLD'){
					tempStrStatus=tempStrStatus+'value="HLD" selected';
				}else{
					tempStrStatus=tempStrStatus+'value="HLD"';
				}
			}
			tempStrStatus=tempStrStatus+'>Flagged to Review</option>';
			
			
			
			
			tempStrStatus=tempStrStatus+'<option value="I*C"';
			if(selStatus=='I*C'){
				tempStrStatus=tempStrStatus+'selected ';
			}
			tempStrStatus=tempStrStatus+'>Include for ALL projects for THIS customer</option>';
			
			tempStrStatus=tempStrStatus+'<option value="E*C"';
			if(selStatus=='E*C'){
				tempStrStatus=tempStrStatus+'selected ';
			}
			tempStrStatus=tempStrStatus+'>Exclude for ALL projects for THIS customer</option>';
			
			
			if(globalReviewFlag==""||globalReviewFlag==null){
				if(terminalBug==true){
					tempStrStatus=tempStrStatus+'<option value="IVV"';
					if(selStatus=='IVV'){
						tempStrStatus=tempStrStatus+'selected ';
					}
					tempStrStatus=tempStrStatus+'>Include for ALL customer projects (Vote)</option>';
					
					tempStrStatus=tempStrStatus+'<option value="EVV"';
					if(selStatus=='EVV'){
						tempStrStatus=tempStrStatus+'selected ';
					}
					tempStrStatus=tempStrStatus+'>Exclude for ALL customer projects (Vote)</option>';
					
				}
			}
			
			if(globalReviewFlag=="I"){
				tempStrStatus=tempStrStatus+'<option value="I**"';
				if(selStatus=='I**'){
					tempStrStatus=tempStrStatus+'selected ';
				}
				tempStrStatus=tempStrStatus+'>Recommended to Include for ALL customer projects</option>';
				
				if(terminalBug==true){
					tempStrStatus=tempStrStatus+'<option value="EVV"';
					if(selStatus=='EVV'){
						tempStrStatus=tempStrStatus+'selected ';
					}
					tempStrStatus=tempStrStatus+'>Exclude for ALL customer projects (Vote)</option>';
				}
			}
			
			
			if(globalReviewFlag=="E"){
				tempStrStatus=tempStrStatus+'<option value="E**"';
				if(selStatus=='E**'){
					tempStrStatus=tempStrStatus+'selected ';
				}
				tempStrStatus=tempStrStatus+'>Recommended to Exclude for ALL customer projects</option>';
				
				if(terminalBug==true){
					tempStrStatus=tempStrStatus+'<option value="IVV"';
					if(selStatus=='IVV'){
						tempStrStatus=tempStrStatus+'selected ';
					}
					tempStrStatus=tempStrStatus+'>Include for ALL customer projects (Vote)</option>';
				}
			}
			
			
			tempStrStatus=tempStrStatus+'</select>';
			return tempStrStatus;
		}
	}
	
});


function selectionStatusChanged(bugId,projectId,startRel){
	console.log("bug modified"+getFromBugMap(bugId).bugId);
	accountCommentsView = new AccountCommentsView({el:$("#modal"),model:getFromBugMap(bugId)});
	getFromBugMap(bugId).tempSelStatus=$('#bugSelStatus'+projectId+bugId).val();
	console.log("Selstatus"+getFromBugMap(bugId).tempSelStatus);
	getFromBugMap(bugId).tempProjectId=projectId;
	getFromBugMap(bugId).tempStartRel=startRel;
	var TempSelStatus= $('#bugSelStatus'+projectId+bugId).val();
	
	if(TempSelStatus=='ETD'||TempSelStatus=='ECD'||TempSelStatus=='EXD'||TempSelStatus=='EPC'||TempSelStatus=='E*C'||TempSelStatus=='EVV'||TempSelStatus=='E**'){
		$('textarea#finalAccountComments').val($('#exclAccountComments_'+bugId).val());
	}else{
		$('textarea#finalAccountComments').val($('#inclAccountComments_'+bugId).val());
	}
	$('#finalAccountSeverity').val($('#accountSeverity_'+bugId).val());
	
	$('#modal').modal('show');
	
}

function storeProjectData(bugId){
	var projData = new AffectedProjectsData({id:getFromBugMap(bugId).tempProjectId,projId: getFromBugMap(bugId).tempProjectId,selStatus:getFromBugMap(bugId).tempSelStatus,accountComments:$('#finalAccountComments').val(),accountSeverity:$('#finalAccountSeverity').val(),startRel:getFromBugMap(bugId).tempStartRel})
	try{
		getFromBugMap(bugId).affectedProjectsArray.remove(getFromBugMap(bugId).tempProjectId);
	}catch(e){
		console.log("Exception in Remving");
	}
	getFromBugMap(bugId).affectedProjectsArray.add(projData);
	console.log("Affected Proj Data"+ getFromBugMap(bugId).affectedProjectsArray);
	$('#inclAccountComments_'+bugId).val($('#finalAccountComments').val());
	$('#exclAccountComments_'+bugId).val($('#finalAccountComments').val());
	$('#modal').modal('hide');
}


function createSaveStructureForBug(bugId){
	var tagExpression=trim($("#tags_"+bugId).val());
	var tagDescription=trim($("#tagDescription_"+bugId).val());
	var keyword=getFromBugMap(bugId).keyword;
	var asComment,isTagExprChanged='N',isTagDescChanged='N',tagDescription,tagExpression,commonTagChanged,commonTag,exclComment;
	var isAsCommentChanged='N';
	var asComment='';
	if(keyword=='none'){
		keyword='NONE';
	}else{
		keyword="KEYWORD:"+keyword;
	}


	if(keyword!=tagExpression){
		
		if(getFromBugMap(bugId).exTagExpression !=tagExpression ){
			isTagExprChanged='Y';
			
		}
		if(getFromBugMap(bugId).exTagDescription != tagDescription){
			isTagDescChanged='Y';
			
		}

		tagDescription=tagDescription;
		tagExpression=tagExpression;
	}
	//check if common tag has changed
	if(this.commonTag!=getFromBugMap(bugId).exCommonTag){
		commonTagChanged='Y';
		commonTag=getFromBugMap(bugId).commonTag;
		exclComment=getFromBugMap(bugId).exclComment;
	
	}
	
	
	var newGeneralComment=trim($("#generalComments_"+bugId).val());
	if(getFromBugMap(bugId).exGeneralComments != newGeneralComment){
		isAsCommentChanged='Y';
		asComment=newGeneralComment;
	}
	var JsonString ={ 
				"customerId":custId,
				"bugId" : getFromBugMap(bugId).bugId,
				"asComment":asComment,
				"isAsCommentChanged":isAsCommentChanged ,
				"tagExpression":tagExpression,
				"isTagExprChanged":isTagExprChanged,
				"tagDescription":tagDescription,
				"isTagDescChanged":isTagDescChanged,
				"state":getFromBugMap(bugId).state,
				"projectIdAndSelStatus" : getFromBugMap(bugId).affectedProjectsArray
	};
	
	return JsonString;
	
}


var savedBugs=[];
function saveBugData(bugId){
	
	$('#'+bugId+'_loaderImg').show();
	console.log("Bug id is"+getFromBugMap(bugId).bugId+JSON.stringify(getFromBugMap(bugId).affectedProjectsArray));
	var JsonString = createSaveStructureForBug(bugId);
	var bugArray  =new Array();
	bugArray.push(JsonString);
	
	var savedata ={"cwsBugDetails":bugArray};
	console.log("JOS final data"+savedata);
	var totalAffected=0;
	var bugData=deltaBugs["bugdetails"][bugId];
	for(var i in deltaBugs["projectList"]){
		projId=deltaBugs["projectList"][i]["id"];
		if(bugData[projId]!=null){
			totalAffected++;
		}
	}
	$.ajax({
		url:"/SORAServices/customerWs/saveBugDetails.json",
		type:"POST",
		dataType:'json',
		data:JSON.stringify(savedata), 
		contentType: 'application/json',
		success:function(data){
			
			collapse(bugId);
			$('#'+bugId+'_heading').focus();
			$('#'+bugId+'_saved').html(getFromBugMap(bugId).affectedProjectsArray.length+" of "+ totalAffected +" Projects Updated");
			$('#'+bugId+'_saved').show();
			$('#'+bugId+'_loaderImg').hide();
			savedBugs.push(bugId);
		},
		error : function (XMLHttpRequest, textStatus, errorThrown) {
		} 
	});
}

function saveAllBugs(){
	var bugArray  =new Array();
	for(var bugId in bugMap){
		
		console.log("Loop"+bugId);
		if(savedBugs.indexOf(bugId)==-1){
			console.log("saving"+bugId);
			var JsonString = createSaveStructureForBug(bugId);
			bugArray.push(JsonString);
		}
		
		
	}
	
	var savedata ={"cwsBugDetails":bugArray};
	console.log("JOS final data"+savedata);
	$('#loaderImgSaveAll').show();
	$.ajax({
		url:"/SORAServices/customerWs/saveBugDetails.json",
		type:"POST",
		dataType:'json',
		data:JSON.stringify(savedata), 
		contentType: 'application/json',
		success:function(data){
			console.log(data);
			$('#loaderImgSaveAll').hide();
			alert("All Changes Saved , you will be redirected to Bug Metrics Page");
			loadBugMetrics();
		},
		error : function (XMLHttpRequest, textStatus, errorThrown) {
		} 
	});
	
	
	
	
}



CwsBugView = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
    	_.templateSettings = {
    			  interpolate : /\{\{(.+?)\}\}/g
    	};

        // Compile the template using underscore
        var template = _.template( $("#cwsBugTemplate").html(), this.model);
        // Load the compiled HTML into the Backbone "el"
        this.$el.html( template );
    }
});


BugCollection = Backbone.Collection.extend({
	  model: CwsBugModel
});

BugCollectionView = Backbone.View.extend({
	initialize: function(){
			this.render();
	},

	render: function(){
	      this.collection.each(function(bug){
	          var bugView = new CwsBugView({ model: bug });
	          this.$el.append(bugView.el); // adding all the bugs .
	      }, this);
	 }
});



