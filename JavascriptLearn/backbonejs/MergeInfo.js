Backbone.Model.prototype._super = function(funcName){
    return this.constructor.prototype[funcName].apply(this, _.rest(arguments));
}

MergeBugModel = BugModel.extend({
	defaults:{
		
		//merge project
		accountCommentsInfoTemplate:'',
		
		//Complete merge information used for save
		mergeBugData:'',
				
	},
	
	initialize: function(){
		console.log("Merge Bug Called");
	},
	
	
	
	setValues : function(jsonData){
		
		console.log("Calling Set Data Merge");
		//Call BugInfo Set Values -- like super in java
		
		this.constructor.__super__.setValues.apply(this, arguments);
		
		console.log("After calling super");
		
		// for Merge Project 
		// For Account severity Drop down
		var showStopper = new SelectOption({name:'Show Stopper',value:'0'});
		var s1= new SelectOption({name:'1',value:'1'});
		var s2= new SelectOption({name:'2',value:'2'});
		var s3= new SelectOption({name:'3',value:'3'});
		var s4= new SelectOption({name:'4',value:'4'});
		var s5= new SelectOption({name:'5',value:'5'});
		var s6= new SelectOption({name:'6',value:'6'});
		var infoOnly= new SelectOption({name:'Info Only',value:'7'});
		
		var accountSeverities = new SelectOptionList([showStopper,s1,s2,s3,s4,s5,s6,infoOnly]);
		var accountCommentsInfo='';
	    var count=0;
	    var bugIdM=this.bugId;
	    var terminalBugM =this.terminalBug;
	    var globalM = this.globalReviewFlag;
	    var psirtM=this.psirtYn;
	    var markExcludedCssM=this.markExcludedCss;
	    
	    
	    this.mergeBugData=jsonData.mergedBugs;
	    
	    $.each(jsonData.mergedBugs,function(i,project){
	    	
	    	
	    	if((count%2)==0){
	    		accountCommentsInfo=accountCommentsInfo+'<div class="row">';
	    	}
	    	
	    	
	    	//Calculate the selection status for each parent project
	    	//function to create selection status options
	    	var createSelectionStausDropDownMerge=function(parentProjectID,bugId,selStatus,terminalBug,globalReviewFlag,psirtFlag){
	    		//Temporary string to construct the selection status options with the selected value
	    		var tempStrStatus='';
	    		if(psirtFlag=='Y'){
	    			tempStrStatus=tempStrStatus+'<select id="bugSelStatus_'+parentProjectID+'" disabled name="bugSelStatus_'+parentProjectID+'" style="width:250px;" >';
	    			tempStrStatus=tempStrStatus+'<option value="HLO" selected>PSIRT bug always excluded</option>';
	    			tempStrStatus=tempStrStatus+'</select>';
	    			return tempStrStatus;
	    		}else{
	    			tempStrStatus=tempStrStatus+'<select id="bugSelStatus_'+parentProjectID+'" name="bugSelStatus'+parentProjectID+'" style="width:250px;" >';
	    		
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
	    			tempStrStatus=tempStrStatus+'<option value="EMC"';
	    			tempStrStatus=tempStrStatus+'>Exclude for ALL merge projects</option>';
	    			
	    			tempStrStatus=tempStrStatus+'</select>';
	    			return tempStrStatus;
	    		}
	    		
	    	};
	    	accountCommentsInfo=accountCommentsInfo+'<div class="col-lg-6 '+markExcludedCssM+' " style="min-height:270px !important; max-height:270px !important;"><br/>';
	    	
	    	
	    	
	    	if(project.bugPresentInProject==false||project.bugPresentInProject=="false"){
	    		accountCommentsInfo=accountCommentsInfo+'<br/><br/><p align="center"> Bug is not present .<br/> <span style="background-color:'+project.bgColor +'\">( For Customer <b> '+project.customerName+' </b> for Project'+ project.parentProjectId+' ) </span></p>'; 
			}else{
				accountCommentsInfo=accountCommentsInfo+'<span style="padding-left:30px;">';	
		    	
				var selectionStatus=createSelectionStausDropDownMerge(project.parentProjectId,bugIdM ,project.selectionStatus,terminalBugM,globalM,psirtM);
		    
				accountCommentsInfo=accountCommentsInfo+selectionStatus+'</span>';
				accountCommentsInfo=accountCommentsInfo+'<br/><br/>';
				accountCommentsInfo=accountCommentsInfo+'<span class="font-bld">Account Specific Comment :</span> <span style="background-color:'+project.bgColor+'">(For Customer: <b> '+project.customerName+' </b> For Project: '+project.parentProjectId+')</span>';
				accountCommentsInfo=accountCommentsInfo+'<span class="float-rht">Account Severity:';
				//Caluculate  account severity for each parent project
				var severity='<select id="accountSeverity_'+project.parentProjectId+'" name="accountSeverity" style="width: auto;">';
				var tempSev=project.accountSeverity;
				accountSeverities.each(function(accSev){ 
					severity=severity+'<option value="'+accSev.get('value')+'"';
					if(accSev.get('value')==tempSev){
						severity=severity+'selected=selected';
					}else{
					
					}
					severity=severity+'>'+accSev.get('name')+'</option>';
	         
				},this);
				severity=severity+'</select>';
			
				accountCommentsInfo=accountCommentsInfo+severity+'</span><br/>';
			
				accountCommentsInfo=accountCommentsInfo+'<textarea  id="'+project.parentProjectId+'_accountComments" onkeydown="limitTextAreaCharacters(this,3900)" onkeyup="limitTextAreaCharacters(this,3900)" class="form-control commentTextArea '+project.copyCommmentClass+' "  rows="5" {{acctStyle}}>';
				var accountCommentTemp;
				if(project.accountSpecificComment==null){
					accountCommentTemp='';
				}else{
					accountCommentTemp=project.accountSpecificComment;
				}
				accountCommentsInfo=accountCommentsInfo+accountCommentTemp+'</textarea>';
				var acctCommentNoteM='';
				if(project.accountreviewEngineer!=null&&project.accountreviewEngineer!=''){
					acctCommentNoteM=acctCommentNoteM+'Last updated by '+project.accountreviewEngineer+ ' on '+project.accountReviewDate+' PST when bug was in state '+project.accountStatus+'. The bug was analyzed in respect to sw '+project.accountReviewRelease+', Project Name:'+project.accountReviewProjectName;
				}
				 
				accountCommentsInfo=accountCommentsInfo+'<span class="text-muted" id="acctCommentNote_'+project.parentProjectId+'"><small>'+acctCommentNoteM+'</small></span><br/>';
				if(project.showCopyButton==true){
					accountCommentsInfo=accountCommentsInfo+'<button type="button"  class=\"btn btn-default\" onclick="copyComments(\''+project.parentProjectId+'\')" > Append Comment</button>';
					accountCommentsInfo=accountCommentsInfo+'&nbsp;&nbsp;<button type="button"  class=\"btn btn-default\" onclick="replaceComments(\''+project.parentProjectId+'\')" > Replace Comment</button>';
				}
			}
			accountCommentsInfo=accountCommentsInfo+'</div>';
			if((count%2)!=0){
	    		accountCommentsInfo=accountCommentsInfo+'</div>';
	    	}
			count++;
	    });
	    
	    if((count%2)!=0){
	    	accountCommentsInfo=accountCommentsInfo+'</div>';
	    }
	    	
	    this.accountCommentsInfoTemplate = accountCommentsInfo;
			
		
	}
	
	
	
});


function getSMUinfoMerge(){
	if(true==mergeBugModel.isSmu){
		$.ajax({
			url:contextPath+"/social/getsmuDetails.json?projectId="+projId+"&smuId="+mergeBugModel.smuComp,
			handleAs:"json",
			type:"GET",
			success:function(data){
				console.log(data);
				if(data.smuDetails!=null){
					smuModel.setValues(data);
					smuView=new SMUInfoView({el:$("#smuInformation"),model:smuModel});
					$("#smuInformation").show();
				}
			},
			error: function (err) {
	           
	        }
		});
	}else{
		$("#smuInformation").hide();
	}
	
}

MergeBugView = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
    	_.templateSettings = {
    			  interpolate : /\{\{(.+?)\}\}/g
    	};

        // Compile the template using underscore
        var template = _.template( $("#mergeBugTemplate").html(), this.model);
        // Load the compiled HTML into the Backbone "el"
        this.$el.html( template );
        //Used for ASIC alert
        getSocialCountDetails();
        
        getSMUinfoMerge();
    }
    
});



