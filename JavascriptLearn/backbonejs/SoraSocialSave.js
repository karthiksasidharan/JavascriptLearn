function getSaveParamaters(){
	
	var updatePage=false;
	var param='';

	//check if selection status is changed
	var selStatus=$("#bugSelStatus").val();
	
    if(selStatus=='IVV' || selStatus=='EVV')
    {
    	alert( "Votes for the bug has been sent to the SWS team for analysis as candidates to be included or excluded for ALL customer projects.\n" + "\n");
    }
    
	if(bugModel.exSelectionStatus != selStatus){
		param+="&selStatusChanged=true&selStatus="+selStatus;
		updatePage=true;
	}

	//check if SME flag is changed
	var smeReviewed=$("#bugSmeFlag").val();
	console.log("Existing SME FLAG"+bugModel.smeReviewFlag);
	console.log("Current SME flag"+smeReviewed);
	if(bugModel.smeReviewFlag != smeReviewed){
		param+="&smeRevChanged=true&smeReviewed="+smeReviewed;
		updatePage=true;
	}

		//check if tags has changed
	var tagExpression=trim($("#tags").val());
	var tagDescription=trim($("#tagDescription").val());
	var keyword=bugModel.keyword;
	if(keyword=='none'){
		keyword='NONE';
	}else{
		keyword="KEYWORD:"+keyword;
	}


	if(keyword!=tagExpression){
		
		if(bugModel.exTagExpression !=tagExpression ){
			param+="&tagChanged=true";
			updatePage=true;
		}
		if(bugModel.exTagDescription != tagDescription){
			param+="&tagDescriptionChanged=true";
			updatePage=true;
		}

		param+="&tagDescription="+encodeURIComponent(tagDescription)+"&tagExpression="+encodeURIComponent(tagExpression);
	}
	//check if common tag has changed
	if(bugModel.commonTag!=bugModel.exCommonTag){
		param+="&commonTagChanged=true&commonTag="+bugModel.commonTag+"&exclComment="+bugModel.exclComment;
		updatePage=true;
	}

	//check if AS Severity has changed
	//check if account comments has changed
	var asSeverity=$("#accountSeverity").val();
	var accountComment=trim($("#accountComments").val());
	if(bugModel.accountSeverity != asSeverity || bugModel.exAccountComments != accountComment){
		param+="&asSeverityChanged=true&asSeverity="+asSeverity;
		param+="&accountCommentChanged=true&accountComment="+encodeURIComponent(accountComment);		
		updatePage=true;
	}

	
	
	//check if AS Internal Comment changed
	var generalComment=trim($("#generalComments").val());
	if(bugModel.exGeneralComments != generalComment){
		param+="&generalCommentChanged=true&generalComment="+encodeURIComponent(generalComment);
		updatePage=true;
	}

	//check if social Comment has changed
	var socialComment=trim($("#socialComments").val());
	if(bugModel.extSocialComments != socialComment){
		param+="&socialCommentChanged=true&socialComment="+encodeURIComponent(socialComment);
		updatePage=true;
	}

	
	
	var newConfigAnalysis  = $('#configFinal').val();
	if(!(newConfigAnalysis==""&&bugModel.configAnalysis==null)){
		if(bugModel.configAnalysis!=newConfigAnalysis){
			
			param+="&configAnalysisChanged=true&configAnalysis="+encodeURIComponent(newConfigAnalysis);
			updatePage=true;
		}
	}
	
	var newFeatureAnalysis =$('#featureFinal').val();
	console.log(newFeatureAnalysis+":"+bugModel.featureAnalysis);
	if(!(newFeatureAnalysis==""&&bugModel.featureAnalysis==null)){
		if(bugModel.featureAnalysis!=newFeatureAnalysis){
			param+="&featureAnalysisChanged=true&featureAnalysis="+encodeURIComponent(newFeatureAnalysis);
			updatePage=true;
		}
	}
	
	//hardware save
	var newHardwareAnalysis = $('#hardwareFinal').val();
	console.log(newHardwareAnalysis+":"+bugModel.hardwareAnalysis);
	if(!(newHardwareAnalysis == "" && bugModel.hardwareAnalysis == null)){
		if(bugModel.hardwareAnalysis != newHardwareAnalysis){
			param += "&hardwareAnalysisChanged=true&hardwareAnalysis="+encodeURIComponent(newHardwareAnalysis);
			updatePage=true;
		}
	}
	
	var newReleaseAnalysis="";
	$('input[name="relAnalysis"]:checked').each(function() {
		newReleaseAnalysis=newReleaseAnalysis+this.value+ " AND "; 
	});
	console.log(newReleaseAnalysis);
	if(!(newReleaseAnalysis==""&&bugModel.releaseAnalysis==null)){
		newReleaseAnalysis=newReleaseAnalysis.substring(0, newReleaseAnalysis.length-4);
		console.log(newReleaseAnalysis);
		if(bugModel.releaseAnalysis!=newReleaseAnalysis){
			param+="&releaseAnalysisChanged=true&releaseAnalysis="+encodeURIComponent(newReleaseAnalysis);
			updatePage=true;
		}
	}
	
	if(updatePage){
		param+="&state="+bugModel.state+"&regression="+bugModel.regression;
		param+="&severity="+bugModel.severity+"&headline="+encodeURIComponent(bugModel.headLine);
		param+="&relNotes="+encodeURIComponent(bugModel.relNotes)+"&product="+encodeURIComponent(bugModel.product)+"&found="+bugModel.found;
	}
	return param;


}


function getSaveParamaterMerge(){
	
	var param='';
	var updatePage=false;


	//check if SME flag is changed
	var smeReviewed=$("#bugSmeFlag").val();
	if(mergeBugModel.smeReviewFlag != smeReviewed){
		param+="&smeRevChanged=true&smeReviewed="+smeReviewed;
		updatePage=true;
	}
	
	//check if tags has changed
	var tagExpression=trim($("#tags").val());
	var tagDescription=trim($("#tagDescription").val());
	var keyword=mergeBugModel.keyword;
	if(keyword=='none'){
		keyword='NONE';
	}else{
		keyword="KEYWORD:"+keyword;
	}

	if(keyword!=tagExpression){
		
		if(mergeBugModel.exTagExpression !=tagExpression ){
			param+="&tagChanged=true&tagExpression="+encodeURIComponent(tagExpression);
			updatePage=true;
		}
		if(mergeBugModel.exTagDescription != tagDescription){
			param+="&tagDescriptionChanged=true";
		}

		param+="&tagDescription="+encodeURIComponent(tagDescription);
	}
	//check if common tag has changed

	if(mergeBugModel.commonTag!=mergeBugModel.exCommonTag){
		param+="&commonTagChanged=true&commonTag="+mergeBugModel.commonTag;
		updatePage=true;
	}

		

	//check if AS Internal Comment changed
	var generalComment=trim($("#generalComments").val());
	if(mergeBugModel.exGeneralComments != generalComment){
		param+="&generalCommentChanged=true&generalComment="+encodeURIComponent(generalComment);
		updatePage=true;
	}

	//check if social Comment has changed
	var socialComment=trim($("#socialComments").val());
	if(mergeBugModel.extSocialComments != socialComment){
		param+="&socialCommentChanged=true&socialComment="+encodeURIComponent(socialComment);
		updatePage=true;
	}
	
	var isExculedMerge=false;
	var selectionStatusForParent='';
	$.each(mergeBugModel.mergeBugData,function(i,mergeData){
		 if($("#bugSelStatus_"+mergeData.parentProjectId).val()=='EMC'){
			 isExculedMerge=true;
		 }
		 var currentStatus = $("#bugSelStatus_"+mergeData.parentProjectId).val();
		 if(currentStatus==null){
			 currentStatus='';
		 }
		 if(selectionStatusForParent==''){
			 if($("#bugSelStatus_"+mergeData.parentProjectId).val()==null){
				 selectionStatusForParent=''; 
			 }else if($("#bugSelStatus_"+mergeData.parentProjectId).val()=='EMC'){
				 selectionStatusForParent='EPC';
			 }else{
				 selectionStatusForParent=$("#bugSelStatus_"+mergeData.parentProjectId).val();
			 }
		 }else if(selectionStatusForParent.substring(0,1)=="I"||currentStatus.substring(0,1)=="I"){
			 selectionStatusForParent="IPC";
		 }else if(selectionStatusForParent.substring(0,1)=="H"||currentStatus.substring(0,1)=="H"){
			 selectionStatusForParent="HLD";
		 }else if(selectionStatusForParent.substring(0,1)=="E"||currentStatus.substring(0,1)=="E"){
			 selectionStatusForParent="EPC";
		 }else{
			 selectionStatusForParent="HLD";
		 }
	});
	
	
	
	var isSelStatusChanged=false;
	$.each(mergeBugModel.mergeBugData,function(i,mergeData){
		 
		 var parentProjectDetails=new Object();
		 var selStatus=$("#bugSelStatus_"+mergeData.parentProjectId).val();
		 if(isExculedMerge==true){
			 selStatus="EPC";
		 }
		 
		 param+="&mergeData["+mergeData.parentProjectId+"].selStatus="+selStatus;
		 if(mergeData.selectionStatus!=selStatus){
			 updatePage=true;
			 isSelStatusChanged=true;
			 param+="&mergeData["+mergeData.parentProjectId+"].selStatusChanged=true";
		 }else{
			 param+="&mergeData["+mergeData.parentProjectId+"].selStatusChanged=false";
		 }
		 
		 
		 var asSeverity=$("#accountSeverity_"+mergeData.parentProjectId).val();
		 var accountComment=$("#"+mergeData.parentProjectId+"_accountComments").val();
		 console.log("Severity exisitng"+mergeData.accountSeverity);
		 console.log("Severity current"+asSeverity);
		 if(mergeData.accountSeverity != asSeverity || (mergeData.accountSpecificComment != accountComment &&!(mergeData.accountSpecificComment==null&&accountComment==''))){
			 param+="&mergeData["+mergeData.parentProjectId+"].asSeverityChanged=true&mergeData["+mergeData.parentProjectId+"].asSeverity="+asSeverity;
			 param+="&mergeData["+mergeData.parentProjectId+"].accountCommentChanged=true&mergeData["+mergeData.parentProjectId+"].accountComment="+encodeURIComponent(accountComment);
			 updatePage=true;
		 }else{
			 param+="&mergeData["+mergeData.parentProjectId+"].asSeverityChanged=false";
			 param+="&mergeData["+mergeData.parentProjectId+"].accountCommentChanged=false";
		 }
		 
		 	//check if tags has changed
			var tagExpression=trim($("#tags").val());
			var tagDescription=trim($("#tagDescription").val());
			var keyword=mergeBugModel.keyword;
			if(keyword=='none'){
				keyword='NONE';
			}else{
				keyword="KEYWORD:"+keyword;
			}

			if(keyword!=tagExpression){
				
				if(mergeBugModel.exTagExpression !=tagExpression ){
					param+="&mergeData["+mergeData.parentProjectId+"].tagChanged=true&mergeData["+mergeData.parentProjectId+"].tagExpression="+encodeURIComponent(tagExpression);
					updatePage=true;
				}
				if(mergeBugModel.exTagDescription != tagDescription){
					param+="&mergeData["+mergeData.parentProjectId+"].tagDescriptionChanged=true";
				}

				param+="&mergeData["+mergeData.parentProjectId+"].tagDescription="+encodeURIComponent(tagDescription);
			}
			//check if common tag has changed

			if(mergeBugModel.commonTag!=mergeBugModel.exCommonTag){
				param+="&mergeData["+mergeData.parentProjectId+"].commonTagChanged=true&mergeData["+mergeData.parentProjectId+"].commonTag="+mergeBugModel.commonTag;
				updatePage=true;
			}
			
			if(updatePage){
				param+="&mergeData["+mergeData.parentProjectId+"].state="+mergeBugModel.state+"&mergeData["+mergeData.parentProjectId+"].regression="+mergeBugModel.regression;
			}
			
		
		 
	 });
	
	
	if(isSelStatusChanged){
		param+="&selStatus="+selectionStatusForParent+"&selStatusChanged=true";
	}else{
		param+="&selStatus="+selectionStatusForParent+"&selStatusChanged=false";
	}
	
	
	var newConfigAnalysis  = $('#configFinal').val();
	if(!(newConfigAnalysis==""&&mergeBugModel.configAnalysis==null)){
		if(mergeBugModel.configAnalysis!=newConfigAnalysis){
		
			param+="&configAnalysisChanged=true&configAnalysis="+encodeURIComponent(newConfigAnalysis);
			updatePage=true;
		}
	}
	
	var newFeatureAnalysis =$('#featureFinal').val();
	if(!(newFeatureAnalysis==""&&mergeBugModel.featureAnalysis==null)){
		if(mergeBugModel.featureAnalysis!=newFeatureAnalysis){
			param+="&featureAnalysisChanged=true&featureAnalysis="+encodeURIComponent(newFeatureAnalysis);
			updatePage=true;
		}
	}
	
	
	//hardware save
	var newHardwareAnalysis = $('#hardwareFinal').val();
	console.log(newHardwareAnalysis+":"+mergeBugModel.hardwareAnalysis);
	if(!(newHardwareAnalysis == "" && mergeBugModel.hardwareAnalysis == null)){
		if(mergeBugModel.hardwareAnalysis != newHardwareAnalysis){
			param += "&hardwareAnalysisChanged=true&hardwareAnalysis="+encodeURIComponent(newHardwareAnalysis);
			updatePage=true;
		}
	}
	
	var newReleaseAnalysis="";
	$('input[name="relAnalysis"]:checked').each(function() {
		newReleaseAnalysis=newReleaseAnalysis+this.value+ " AND "; 
	});
	console.log(newReleaseAnalysis);
	if(!(newReleaseAnalysis==""&&mergeBugModel.releaseAnalysis==null)){
		newReleaseAnalysis=newReleaseAnalysis.substring(0, newReleaseAnalysis.length-4);
		console.log(newReleaseAnalysis);
		if(mergeBugModel.releaseAnalysis!=newReleaseAnalysis){
			param+="&releaseAnalysisChanged=true&releaseAnalysis="+encodeURIComponent(newReleaseAnalysis);
			updatePage=true;
		}
	}
	
	if(updatePage){
		param+="&state="+mergeBugModel.state+"&regression="+mergeBugModel.regression;
		param+="&severity="+mergeBugModel.severity+"&headline="+encodeURIComponent(mergeBugModel.headLine);
		param+="&relNotes="+encodeURIComponent(mergeBugModel.relNotes)+"&product="+encodeURIComponent(mergeBugModel.product)+"&found="+mergeBugModel.found;
	}
	
	return param;
	
}


function saveBugListPage(actionPer){
	actionPerformed=actionPer;
	//check if social analysis is empty.
	var newReleaseAnalysis="";
	$('input[name="relAnalysis"]:checked').each(function() {
		newReleaseAnalysis=newReleaseAnalysis+this.value+ " AND "; 
	});
	if((trim($('#socialComments').val()) =="")&&(trim($('#configFinal').val())=="")
			&&(trim($('#featureFinal').val())=="")&&(trim($('#hardwareFinal').val())=="")&&(trim(newReleaseAnalysis)=="")){
		alert("Sora Social Analysis is Mandatory in Sora Social Mode.");
		resetClock();
		$("#socialComments").focus();
		return false;
	}
	
	//validate Tag
	var istagValid=validateTag();
	if(!istagValid){
		return false;
	}
	
	//check for conflict
	var isConflict;
	if(projectInfoModel.isMerged=='Y'){
		isConflict = checkConflictResolutionMerge();
	}else{
		isConflict = checkConflictResolution();
	}
	
	if(!isConflict){
		forwardPage();
	}
	
}

function forwardPage(){
	if(!isSessionActive()){
			return false;
	}
	var comp,bug,isSmu,smuComponent;
	if(projectInfoModel.isMerged=='Y'){
		bug=mergeBugModel.bugId;
		comp=mergeBugModel.internalComp;
		if(mergeBugModel.isSmu==true){
			isSmu="true";
			smuComponent=mergeBugModel.component;
		}else{
			isSmu="false";
			smuComponent="";
		}
		
	}else{
		bug=bugModel.bugId;
		comp=bugModel.internalComp;
		if(bugModel.isSmu==true){
			isSmu="true";
			smuComponent=bugModel.component;
		}else{
			isSmu="false";
			smuComponent="";
		}
	}

	var param='bugId='+bug+"&projectId="+projId+"&component="+comp+"&tempFilter="+tempFilter+"&tagName="+tagName+"&activeComponent="+activeComponent+"&isSmu="+isSmu+"&smuComponent="+smuComponent;
	
	if(projectInfoModel.isMerged=='Y'){
		param+=getSaveParamaterMerge();
	}else{
		param+=getSaveParamaters();
	}
	
	if(actionPerformed=='NEXT'){
		param+="&actionPerformed=NEXT";
		bugInfo.nextBug(param);
	}else if(actionPerformed=='PREVIOUS'){
		param+="&actionPerformed=PREVIOUS";
		bugInfo.previousBug(param);
	}else if(actionPerformed=='NEXTCOMPONENT'){
		param+="&actionPerformed=NEXTCOMPONENT"
			bugInfo.nextComponent('',param);
	}else if(actionPerformed=='UPDATE'){
		param+="&actionPerformed=UPDATE";
			bugInfo.updateBug(param);
	}else if(actionPerformed=='COMPONENTSUMMARY'){
		param+="&actionPerformed=COMPONENTSUMMARY";
		bugInfo.componentSummary(param);
	}
	
}

function saveBugListPageReview(actionPer){
	updateReviewCommentsAndSendMail('ds');
	bugInfo.skipBug();
}



