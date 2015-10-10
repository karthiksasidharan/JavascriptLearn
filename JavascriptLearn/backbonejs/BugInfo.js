Backbone.Model.prototype._super = function(funcName){
    return this.constructor.prototype[funcName].apply(this, _.rest(arguments));
}
var SelectOption = Backbone.Model.extend({
    defaults: {
        name: "Not specified",
        value: "Not specified"
    },
    initialize: function(){
        
    }
});

var SelectOptionList = Backbone.Collection.extend({
    model: SelectOption
});


BugModel = Backbone.Model.extend({
	defaults:{
		bugId:'',
		headLine:'',
		markExcludedCss:'',
		//Left Section
		highlightColor:'',
		smeReviewed:'',
		smeReviewStatus:'',
		smeReviewtime:'',
		smeReviewEngr:'',
		component:'',
		changedComponents:'',
		age:'',
		severity:'',
		asSeverityStr:'',
		stateDesc:'',
		found:'',
		project:'',
		product:'',
		hardware:'',
		riskOrd:'',
		keyword:'',
		internalComp:'',
		commitTime:'', //BaseLine date
		rptExclCount:'',
		rptInclCount:'',
		smeLink:'', //Used for population of SME Link
		componentValue:'',
		baselineDisplay:'',
		
		//Middle Section
		dispVersionIntg:'',
		sortedVersionFound:'',
		attribute:'',
		highLightedBecause:'',
		verifiedReleaseDisplay:'',
		verifiedRelease:'',
		releaseNotesDisplay:'',
		relNotes:'',
		
		//Selection Status
		exSelectionStatus:'',
		selectionStatus:'',
		globalReviewFlag:'',
		terminalBug:'',
		bugSelStatusList:'',
		psirtYn:'',
		//addMethod:'',
		
		//SME drop down
		smeReviewFlag:'',
		bugSmeList:'',
		
		
		//Account Comment Details
		exAccountSeverity:'',
		accountSeverity:'',
		exAccountComments:'',
		accountComments:'',
		acctCommentNote:'',
		acctStyle:'',
		accountSeverityList:'',
		

		//General Comment Details
		exGeneralComments:'',
		generalComments:'',
		genCommentNote:'',
		exclTag:'',
		genCommentUpdatedOn:'',
		
		//Sora Social Comments
		extSocialComments:'',
		socialComments:'',
		socialCommentNote:'',
		socialCmtLastUpdatedOn:'',
		
		//Review Comments
		reviewComment:'',
		
		
		//Button display check
		viewEditDisplay:'',
		viewDisplay:'',
		emailDEDisplay:'',
		explainBugDisplay:'',
		highLightBugDisplay:'',
		highLightBugValue:'',
		reviewDisplay:'',
		reviewCommentDisplay:'',
		reviewReadOnly:'',
		ssDisplay:'',
		ssValue:'',
		
		//Tag expression and comment
		tagExpression:'',
		exTagExpression:'',
		tagDescription:'',
		exTagDescription:'',
		isReadOnly:'',
		tagUpdatedInfo:'',
				
		//common Tag 
		commonTag:'',
		exCommonTag:'',
		exclComment:'',
		
		// SS Information
		titlePaneHeader:'',
		ssReview:'',
		ssEval:'',
		engNotes:'',
		attachments:'',
		attachmentUrl:'',
		smuIds:'',
		careTickets:'',
		careTicketUrl:'',
		duplicatedBy:'',
		duplicateByUrl:'',
		duplicate:'',
		duplicateBugUrl:'',
		ssReviewDisplay:'',
		ssEvalDisplay:'',
		engNotesDisplay:'',
		attachmentsDisplay:'',
		smuIdsDisplay:'',
		careTicketsDisplay:'',
		duplicateByDisplay:'',
		duplicateBugDisplay:'',
		serviceRequestLink:'',
		
		//hira popup
		state:'',
		regression:'',
		
		//Locked Information
		lockedBy:'',
		lockedOn:'',
		
		//Button display
		previousDisplay:'',
		nextDisplay:'',
		nextComponentDisplay:'',
		skipDisplay:'',
		skipAction:'',
		updateDisplay:'',
		
		//SMU
		isSmu:'',
		smuComp:'',
		
		//Comets
		cometsDisplay:'',
		
		//Analysis
		displayConfig:'',
		displayConfigAnalysis:'',
		configAnalysis:'',
		displayConfigValidate:'',
		displayConfigUndo:'',
		numberOfConfigValidations:'',
		
    	displayFeature:'',
    	displayFeatureAnalysis:'',
    	featureAnalysis:'',
    	displayFeatureValidate:'',
		displayFeatureUndo:'',
		numberOfFeatureValidations:'',
    	
    	displayHardware:'',
    	displayHardwareAnalysis:'',
    	hardwareAnalysis:'',
    	displayHardwareValidate:'',
		displayHardwareUndo:'',
		numberOfHardwareValidations:'',
    	
    	displayRelease:'',
    	displayReleaseAnalysis:'',
    	displayReleaseValidate:'',
		displayReleaseUndo:'',
		numberOfReleaseValidations:'',
		releaseAnalysis:'',
		releaseAnalysisDisplayed:'',
		analysedReleases:'',
    	
    	
    	displayValidation:'',
    	undoImage:''
    	
    	
		
		
	},
	
	initialize: function(){
		console.log("BugInfo Called");
	},
	setValues : function(jsonData){
		
		activeComponent=jsonData.activeComponent;
		
		this.bugId=jsonData.bugId;
		this.headLine=jsonData.headLine;
		this.component=jsonData.component;
		//left section
		this.smeReviewStatus=jsonData.smeReviewStatus;
		this.smeReviewtime=jsonData.smeReviewtime;
		this.smeReviewEngr=jsonData.smeReviewEngr;
		this.age=jsonData.age;
		this.severity=jsonData.severity;
		this.asSeverityStr=jsonData.asSeverityStr;
		this.stateDesc=jsonData.stateDesc;
		this.found=jsonData.found;
		this.project=jsonData.project;
		this.product=jsonData.product;
		this.hardware=jsonData.hardware;
		this.riskOrd=jsonData.riskOrd;
		this.rptExclCount=jsonData.rptExclCount;
		this.rptInclCount=jsonData.rptInclCount;
		if(jsonData.internalComp!=null){
			this.internalComp=jsonData.internalComp;
		}else{
			this.internalComp=jsonData.component;
		}
		
		//Middle section
		this.dispVersionIntg=jsonData.dispVersionIntg;
		this.sortedVersionFound=jsonData.sortedVersionFound;
		this.attribute=jsonData.attribute;
		this.verifiedRelease=jsonData.verifiedRelease;
		this.relNotes=jsonData.relNotes;
		
		//Account and General Comments
		this.accountSeverity=jsonData.asSeverity;
		if(jsonData.accountComment==null){
			this.exAccountComments='';
			this.accountComments='';
		}else{
			this.exAccountComments=jsonData.accountComment;
			this.accountComments=jsonData.accountComment;
		}
		
		if(jsonData.globalComment==null){
			this.exGeneralComments='';
			this.generalComments='';
		}else{
			this.exGeneralComments=jsonData.globalComment;
			this.generalComments=jsonData.globalComment;
		}
		
		this.acctStyle='';
		
		//Sora Social Comments
		this.socialComments=jsonData.socialComment;
		this.extSocialComments=jsonData.socialComment;
		this.socialCommentNote='';
		
		//Tag expression and description
		
		
		if(jsonData.tagExpression==null){
			this.exTagExpression='';
			this.tagExpression='';
			
		}else{
			this.exTagExpression=jsonData.tagExpression;
			this.tagExpression=jsonData.tagExpression;
		}
		
		if(jsonData.tagComments==null){
			this.exTagDescription='';
			this.tagDescription='';
			
		}else{
			this.exTagDescription=trim(jsonData.tagComments);
			this.tagDescription=trim(jsonData.tagComments);
			
		}
		
		if(jsonData.bugTagDetails!=null){
			this.tagUpdatedInfo=jsonData.bugTagDetails.tagUpdatedInfo;
		}
		else{
			this.tagUpdatedInfo='';
		}
		
		//common tag
		this.commonTag=jsonData.categoryName;
		this.exCommonTag=jsonData.categoryName;
		
		//Selection Status
		this.exSelectionStatus=jsonData.selectionStatus;
		this.selectionStatus=jsonData.selectionStatus;
		this.terminalBug=jsonData.terminalBug;
		this.globalReviewFlag=jsonData.globalReviewFlag;
		this.psirtYn=jsonData.psirtYn;
		//this.addMethod=jsonData.addMethod;
		
		//reviewcomments
		this.reviewComment=jsonData.reviewComment;
		this.exclComment='';		
		this.state=jsonData.state;
		this.regression=jsonData.regression;
		
		if(jsonData.keyword==null){
			this.keyword='';
		}else{
			this.keyword=jsonData.keyword;
		}
		
		if(jsonData.markExcludedCss=="light-grey-bg"){
			this.markExcludedCss='excluded';
		}else{
			this.markExcludedCss='normal';
		}
		
		if(projectInfoModel.isPeriodic()){
			baselineDisplay = '';
		}else{
			baselineDisplay='style="display:none"';
		}
		if(jsonData.commitTime!=''){
			this.commitTime=jsonData.commitTime+' '+projectInfoModel.timeZone;
		}
		
		if(jsonData.smeReviewed == 'Y'){
			this.smeLink='<a class="redHighlight" href="javascript:show_smeinfo(\''+this.bugId+'\',\''+jsonData.smeReviewStatus+'\',\''+jsonData.smeReviewtime+'\',\''+jsonData.smeReviewEngr+'\')">SME Reviewed</a>';
		}else{
			this.smeLink='';
		}
		if(jsonData.changedComponents!=null && jsonData.changedComponents!=""&&projectInfoModel.osType=='X'
			&& (jsonData.component!= jsonData.changedComponents)){
			this.componentValue=jsonData.component+'   '+'<FONT COLOR="BLUE">'+jsonData.changedComponents+'</font>';
		}else{
			this.componentValue=jsonData.component;
			
		}
		
		if(jsonData.postedSmus!=null && jsonData.postedSmus!=""){
			this.highLightedBecause="SMU";
		}else{
			if(jsonData.srHighlightReason!=null){
				this.highLightedBecause=jsonData.highlightedReson+'&nbsp;<b><i>'+jsonData.srHighlightReason+'</i></b>';
			}else{
				this.highLightedBecause=jsonData.highlightedReson;
			}
			
		}
		
		if(projectInfoModel.osType=='N'){
			this.verifiedReleaseDisplay='';
		}else{
			this.verifiedReleaseDisplay='style="display:none"';
		}
		
		if(jsonData.relNotes!=null && jsonData.relNotes!=""){
			this.releaseNotesDisplay='';
		}else{
			this.releaseNotesDisplay='style="display:none"';
		}
		
		
		this.acctCommentNote='';
		this.genCommentNote='';
		this.genCommentUpdatedOn='';
		this.exclTag='';
		//setting acoount comment note
		if(jsonData.accountCmtLastUpdInfo!=null && jsonData.accountCmtLastUpdInfo.reviewerid!=null){
			this.acctCommentNote   = 'Last updated by '+jsonData.accountCmtLastUpdInfo.reviewerid+' on '+jsonData.accountCmtLastUpdInfo.dateTimeStr+
				' when bug was in state '+jsonData.accountCmtLastUpdInfo.statusStr+". The bug was analyzed in respect to sw ";
			if(projectInfoModel.searchType!='TP'){
				this.acctCommentNote += jsonData.accountCmtLastUpdInfo.startRelease;
			} 
			this.acctCommentNote +=' Project Name: '+jsonData.accountCmtLastUpdInfo.projectName;
		}

		//setting as internal comment note
		if(jsonData.globalCommentReviewer!=null){
			this.genCommentNote= 'Last updated by '+jsonData.globalCommentReviewer+' on '+jsonData.globalCommentUpdDt+' when bug was in state '+
				jsonData.globalCommentStatusDesc+'.'; 
			this.genCommentUpdatedOn=jsonData.globalCommentUpdDt;
		}
		
		//displaying excl tag button

		if((!(accessListModel.hirapopupAccess || accessListModel.editBugListTagAccess)) && projectInfoModel.startRel!=null &&  (projectInfoModel.osType=='I' || projectInfoModel.osType=='C' || projectInfoModel.osType=='X')){
			this.acctStyle='style=\"margin-top:9px\"';
			if(jsonData.tagExistsinAsiccmt==false){
				this.exclTag='<button type=\"button\" id=\"releaseExclude_${item.bugId}\" class=\"btn btn-default\" name="releaseExclude_'+jsonData.bugId+'\"><small>Release Exclude '+jsonData.releaseExcludeTag+'</small></button>';
			}else{
				this.exclTag='<button type=\"button\" id=\"releaseExclude_${item.bugId}\" class=\"btn btn-default dis\" disabled=\"true\" name="releaseExclude_'+jsonData.bugId+'\"><small>Release Exclude '+jsonData.releaseExcludeTag+'</small></button>';
			}

		}
		
		
		//Display Criteria check for Buttons
		if(accessListModel.viewEditAccess==false){
			   this.viewEditDisplay='style="display:none"';
		}else{
			   this.viewEditDisplay='';
		}
		
		if(projectInfoModel.osType=='X'){
			this.viewDisplay='';
		}else{
			this.viewDisplay= 'style="display:none"';
		}
		
		if(jsonData.emailDECount>0){
			this.emailDEDisplay='';
		}else{
			this.emailDEDisplay='style="display:none"';
		}
		
		if(projectInfoModel.osType=='I' && (projectInfoModel.searchType=='SE'|| projectInfoModel.searchType=='TP') && (projectInfoModel.startRel!='')){
			this.explainBugDisplay='';
		}else{
			this.explainBugDisplay='style="display:none"';
		}
		
		if(projectInfoModel.osType=='W' || projectInfoModel.osType=='S'){
			this.highLightBugDisplay='';
		}else{
			this.highLightBugDisplay='style="display:none"';
		}
		
		if(jsonData.isAsHighlightedBug==0 || jsonData.isAsHighlightedBug==null){
			this.highLightBugValue='Highlight Bug';
		}else{
			this.highLightBugValue='Remove Highlight';
		}
		
		if(projectInfoModel.projReviewState!=null&&projectInfoModel.projReviewState!=0 &&projectInfoModel.projReviewState!=2&& projectInfoModel.isMerged!='Y'){
			this.reviewDisplay='';
		}else{
			this.reviewDisplay='style="display:none"';
		}
		
		if(projectInfoModel.projReviewState!=null&&projectInfoModel.projReviewState!=0&& projectInfoModel.isMerged!='Y'){
			this.reviewCommentDisplay='';
		}else{
			this.reviewCommentDisplay='style="display:none"';
		}
		
		if(projectInfoModel.projReviewState!=null&&projectInfoModel.projReviewState==2&& projectInfoModel.isMerged!='Y'){
			this.reviewReadOnly='readonly';
		}else{
			this.reviewReadOnly='';
		}
		
		
		
		if(projectInfoModel.searchType != 'TP' && projectInfoModel.osType!= 'O' 
				&& ((projectInfoModel.isMerged==null) || (projectInfoModel.isMerged=='') || (projectInfoModel.isMerged=='N'))){	
			this.ssDisplay='';
		}else{
			this.ssDisplay='style="display:none"';
		}
		
		this.ssValue='';
		
		
		if(jsonData.ssoibCmntExist!=null &&jsonData.ssoibCmntExist!=""&& jsonData.ssoibCmntExist==true){
			if(projectInfoModel.osType=='X'){
				this.ssValue='Already set to SS/OIB/GH/M Flag, please review it';
			}else{
				this.ssValue='Already set to SS/OIB Flag, please review it';
			}
			
		}else {
			
			if(jsonData.state == 'R' || jsonData.state=='M'|| jsonData.state=='V'||jsonData.state=='C'){
				if(projectInfoModel.osType=='X'){
					this.ssValue='Set SS/OIB/GH/M Flag';
				}else{
					this.ssValue='Set SS/OIB';
				}
			}else{
				this.ssDisplay='style="display:none"';
			}
		}
	
		this.socialCmtLastUpdatedOn='';
		//setting social comment first and last updated info
		if(jsonData.socialCmtLastUpdatedBy!=null){
			this.socialCommentNote='Last updated by '+jsonData.socialCmtLastUpdatedBy+' on '+jsonData.socialCmtLastUpdatedOn+'.';
			this.socialCmtLastUpdatedOn=jsonData.socialCmtLastUpdatedOn;
		}
		if(jsonData.socialCmtFirstUpdatedBy!=null){
			this.socialCommentNote+=' First updated by '+jsonData.socialCmtFirstUpdatedBy+' on '+jsonData.socialCmtFirsttUpdatedOn+'.';
		}
		
	
		//Setting is read only for tag expression and tag Description
		if(accessListModel.hirapopupAccess || accessListModel.editBugListTagAccess){
			this.isReadOnly="";
		}else{
			this.isReadOnly="readonly=readonly";
		}
		
		
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
		
		//Temporary string to construct the account severity options with the selected value
		var tempStr='';
		var tempSev=this.accountSeverity;
		accountSeverities.each(function(accSev){ 
			tempStr=tempStr+'<option value="'+accSev.get('value')+'"';
			if(accSev.get('value')==tempSev){
				tempStr=tempStr+'selected=selected';
			}else{
				
			}
			tempStr=tempStr+'>'+accSev.get('name')+'</option>';
         
		});
		
		this.accountSeverityList=tempStr;
		
		//selection status
		this.bugSelStatusList= this.createSelectionStausDropDown(this.bugId, this.selectionStatus,this.terminalBug,this.globalReviewFlag,this.psirtYn);
		
		//SME Review Drop down
		if(jsonData.smeReviewFlag==null){
			this.smeReviewFlag="DELETE";
		}else{
			this.smeReviewFlag=jsonData.smeReviewFlag;
		}
		var noupd= new SelectOption({name:'NOUPD',value:'SME reviewed (no update needed)'});
		var rne= new SelectOption({name:'RNE',value:'SME reviewed (RNE updated)'});
		var eng= new SelectOption({name:'ENG',value:'SME reviewed (ENG updated)'});
		var asic= new SelectOption({name:'ASIC',value:'SME reviewed (ASIC updated)'});
		var other= new SelectOption({name:'OTHER',value:'SME reviewed (Other updates)'});
		
		var smeOptions = new SelectOptionList([noupd,rne,eng,asic,other]);
		var tempSmeStr='';
		var tempSme=this.smeReviewFlag;
		

		
		tempSmeStr=tempSmeStr+'<option value="DELETE"';
		if(tempSme==null||tempSme==""){
			tempSmeStr=tempSmeStr+'selected ';
		}
		tempSmeStr=tempSmeStr+'>Not reviewed by SME</option>';
		
		smeOptions.each(function(sme){
			tempSmeStr=tempSmeStr+'<option value="'+sme.get('name')+'"';
			if(tempSme==sme.get('name')){
				tempSmeStr=tempSmeStr+'selected ';
			}
			tempSmeStr=tempSmeStr+'>'+sme.get('value')+'</option>';
			
			
		});
		
		this.bugSmeList=tempSmeStr;
		
		
		
		//SS Inofrmation
		this.titlePaneHeader=jsonData.titlePaneHeader;
		this.ssReview = jsonData.ssReview;
		this.ssEval=jsonData.ssEval;
		this.engNotes =jsonData.engNotes;
		this.attachments=jsonData.attachments;
		this.attachmentUrl=jsonData.attachmentUrl;
		this.smuIds=jsonData.smuIds;
		this.careTickets=jsonData.careTickets;
		
		if(projectInfoModel.srProcStatus=='S'){
			if(jsonData.srAvailable==true){
				this.serviceRequestLink='<a href="#" onclick="javascript:getSRData(\''+this.bugId+'\',\''+this.careTickets+'\',\''+projectInfoModel.startRel+'\',\''+projectInfoModel.custId+'\',\''+projectInfoModel.osType+'\',\''+projectInfoModel.productFamily+'\',\''+jsonData.srCount+'\');">Service Request Summary</a>';
				
			}else{
				this.serviceRequestLink='';
			}
			this.careTicketUrl=jsonData.capPsirts;
		}else{
			this.serviceRequestLink='';
			this.careTicketUrl=jsonData.careTicketUrl;
		}
	
		
		this.duplicatedBy=jsonData.duplicatedBy;
		this.duplicateByUrl=jsonData.duplicateByUrl;
		this.duplicate=jsonData.duplicate;
		this.duplicateBugUrl=jsonData.duplicateBugUrl;
		
		
		
		//SME Section display condition check
		var className="field";
		
		
		if(this.ssReview==null||this.ssReview==""){
			this.ssReviewDisplay='style="display:none" class="'+className+'"';
		}else{
			this.ssReviewDisplay='class="'+className+'"';
			if (className=="field") {
				className = "field field-hlt";
			} else {
				className = "field";
			}
			
		}
		
		
		
		if(this.ssEval==null||this.ssEval==""){
			this.ssEvalDisplay='style="display:none" class="'+className+'"';
			
		}else{
			this.ssEvalDisplay='class="'+className+'"';
			if (className=="field") {
				className = "field field-hlt";
			} else {
				className = "field";
			}
		}
		
		if(this.engNotes==null||this.engNotes==""){
			this.engNotesDisplay='style="display:none" class="'+className+'"';
			
		}else{
			this.engNotesDisplay='class="'+className+'"';
			if (className=="field") {
				className = "field field-hlt";
			} else {
				className = "field";
			}
		}
		
		if(this.attachments==null||this.attachments==""){
			this.attachmentsDisplay='style="display:none" class="'+className+'"';
			
		}else{
			this.attachmentsDisplay='class="'+className+'"';
			if (className=="field") {
				className = "field field-hlt";
			} else {
				className = "field";
			}
		}
		
		if(this.smuIds==null||this.smuIds==""){
			this.smuIdsDisplay='style="display:none" class="'+className+'"';
			
		}else{
			this.smuIdsDisplay='class="'+className+'"';
			if (className=="field") {
				className = "field field-hlt";
			} else {
				className = "field";
			}
		}
		
		if(this.careTickets==null||this.careTickets==""){
			this.careTicketsDisplay='style="display:none" class="'+className+'"';
			
		}else{
			this.careTicketsDisplay='class="'+className+'"';
			if (className=="field") {
				className = "field field-hlt";
			} else {
				className = "field";
			}
		}
		
		
		
		if(this.duplicatedBy==null||this.duplicatedBy==""){
			this.duplicateByDisplay='style="display:none" class="'+className+'"';
			
		}else{
			this.duplicateByDisplay='class="'+className+'"';
			if (className=="field") {
				className = "field field-hlt";
			} else {
				className = "field";
			}
		}
		
		if(this.duplicate==null||this.duplicate==""){
			this.duplicateBugDisplay='style="display:none" class="'+className+'"';
		}else{
			this.duplicateBugDisplay='class="'+className+'"';
			
		}
		
		
		this.lockedOn=jsonData.lockedOn;
		this.lockedBy=jsonData.lockedBy;
		
		//Buttons display
		if(jsonData.showPrev==true){
			this.previousDisplay='';
		}else{
			this.previousDisplay='style="display:none;"';
		}
		
		if(jsonData.showNext==true){
			this.nextDisplay='';
		}else{
			this.nextDisplay='style="display:none;"';
		}
		
		if(jsonData.showNextComp==true){
			this.nextComponentDisplay='';
		}else{
			this.nextComponentDisplay='style="display:none;"';
		}
		
		if(jsonData.showNext==true||jsonData.showNextComp==true){
			this.skipDisplay='';
		}else{
			this.skipDisplay='style="display:none;"';
		}
		
		if(jsonData.showNext==true&&jsonData.showNextComp==true){
			this.skipAction='next';
		}else if(jsonData.showNext==true){
			this.skipAction='next';
		}else if(jsonData.showNextComp==true){
			this.skipAction='nextComponent';
		}else{
			this.skipAction='';
		}
		
		
		if(projectInfoModel.isLocked=='Y'){
			this.nextDisplay='style="display:none;"';
			this.nextComponentDisplay='style="display:none;"';
			this.previousDisplay='style="display:none;"';
			this.updateDisplay='style="display:none;"';
		}else{
			this.updateDisplay='';
			
		}
		
		//SMU Info
		this.isSmu=jsonData.smu;
		this.smuComp=jsonData.smuComp;
		
		
		if(projectInfoModel.cometsMode=='1'){
			this.cometsDisplay='';
			getPreviousIncludedCommentsSocial();
		}else{
			this.cometsDisplay='style="display:none"';
		}
		
		
		if(projectInfoModel.isConfigFileUploaded=='Y'){
    		this.displayConfig='';
    	}else{
    		this.displayConfig='style="display:none"';
    	}
    	
		if(jsonData.isConfigAnalysed=="Y"){
    		this.displayConfigAnalysis='';
    	}else{
    		this.displayConfigAnalysis='style="display:none"';
    	}
		
		this.configAnalysis= jsonData.configAnalysis;
		
    	if(projectInfoModel.isFeaturesUploaded=='Y'){
    		this.displayFeature='';
    	}else{
    		this.displayFeature='style="display:none"';
    	}
    	
    	if(jsonData.isFeatureAnalysed=="Y"){
    		this.displayFeatureAnalysis='';
    	}else{
    		this.displayFeatureAnalysis='style="display:none"';
    	}
    	
    	
    
    	if(jsonData.configAnalysisValidatedBy==null){
    		this.displayConfigValidate='';
    		this.displayConfigUndo='style="display:none"';
    		this.numberOfConfigValidations=0;
    	}else{
    		
    		this.numberOfConfigValidations=jsonData.numberOfConfigValidations;
	    	if(jsonData.configAnalysisValidatedBy.indexOf(userId)==-1){
	    		this.displayConfigValidate='';
	    		this.displayConfigUndo='style="display:none"';
	    	}else{
	    		this.displayConfigValidate='style="display:none"';
	    		this.displayConfigUndo='';
	    		
	    	}
    	}
    	
    	this.featureAnalysis=jsonData.featureAnalysis;
    	
    	if(jsonData.featureAnalysisValidatedBy==null){
    		this.displayFeatureValidate='';
    		this.displayFeatureUndo='style="display:none"';
    		this.numberOfFeatureValidations=0;
    	}else{
    		
    		this.numberOfFeatureValidations=jsonData.numberOfFeatureValidations;
	    	if(jsonData.featureAnalysisValidatedBy.indexOf(userId)==-1){
	    		this.displayFeatureValidate='';
	    		this.displayFeatureUndo='style="display:none"';
	    	}else{
	    		this.displayFeatureValidate='style="display:none"';
	    		this.displayFeatureUndo='';
	    		
	    	}
    	}
    	
    	//hardware analysis

    	if(projectInfoModel.isHardwareUploaded=='Y'){
    		this.displayHardware='';
    	}else{
    		this.displayHardware='style="display:none"';
    	}
    	
    	if(jsonData.isHardwareAnalysed=="Y"){
    		this.displayHardwareAnalysis='';
    	}else{
    		this.displayHardwareAnalysis='style="display:none"';
    	}
    	
    	this.hardwareAnalysis=jsonData.hardwareAnalysis;
    	
    	if(jsonData.hardwareAnalysisValidatedBy == null){
    		this.displayHardwareValidate='';
    		this.displayHardwareUndo='style="display:none"';
    		this.numberOfHardwareValidations=0;
    	}else{
    		
    		this.numberOfHardwareValidations = jsonData.numberOfHardwareValidations;
	    	if(jsonData.hardwareAnalysisValidatedBy.indexOf(userId) == -1){
	    		this.displayHardwareValidate = '';
	    		this.displayHardwareUndo = 'style="display:none"';
	    	}else{
	    		this.displayHardwareValidate = 'style="display:none"';
	    		this.displayHardwareUndo = '';
	    		
	    	}
    	}
		
		
		
		if(projectInfoModel.osType!='O'){
			this.displayRelease='';
		}else{
			this.displayRelease='style="display:none"';
		}
			
		this.releaseAnalysis = jsonData.releaseAnalysis;
		this.analysedReleases=[];
		if(jsonData.releaseAnalysis==null){
			this.displayReleaseAnalysis='style="display:none"';
			this.releaseAnalysisDisplayed='';
			this.analysedReleases.push("$$$");
		}else{
			var releaseAnalysis = jsonData.releaseAnalysis;
			var analysis = releaseAnalysis.split("AND");
			var analysisString='';
			for(i=0;i<analysis.length;i++){
				var val = analysis[i];
				var finalAnalysis = val.split("##");
				if(trim(finalAnalysis[0])=="R"){
					analysisString+='<input type="checkbox" name="relAnalysis" checked value="'+val+'"/> Release '+trim(finalAnalysis[1]) +'<br/>';
					
				}
				this.analysedReleases.push(trim(finalAnalysis[1]));
				
			}
			
			this.releaseAnalysisDisplayed=analysisString;
			this.displayReleaseAnalysis='';
			
		}
		
		
		if(jsonData.releaseAnalysisValidatedBy==null){
    		this.displayReleaseValidate='';
    		this.displayReleaseUndo='style="display:none"';
    		this.numberOfReleaseValidations=0;
    	}else{
    		
    		this.numberOfReleaseValidations=jsonData.numberOfReleaseValidations;
	    	if(jsonData.releaseAnalysisValidatedBy.indexOf(userId)==-1){
	    		this.displayReleaseValidate='';
	    		this.displayReleaseUndo='style="display:none"';
	    	}else{
	    		this.displayReleaseValidate='style="display:none"';
	    		this.displayReleaseUndo='';
	    		
	    	}
    	}
		
		
		
		
		if(accessListModel.bugStateSocial!=null){
			if(accessListModel.bugStateSocial.indexOf(jsonData.state)!=-1){
				this.displayValidation='';
			}else{
				this.displayValidation='style="display:none"';
			}
		}
		
		this.undoImage=contextPath+"/../SORA_STATIC/images/undo.png";
	},
	//fuction to update tags.
	setTags:function(){
		
	}, 
	//function to set tag comments
	setTagComment:function(){
		
	},
	
	//function to create selection status options
	createSelectionStausDropDown:function(bugId,selStatus,terminalBug,globalReviewFlag,psirtFlag){
		//Temporary string to construct the selection status options with the selected value
		var tempStrStatus='';
		if(psirtFlag=='Y'){
			tempStrStatus=tempStrStatus+'<select id="bugSelStatus" disabled name="bugSelectStatus" style="width:250px;" >';
			tempStrStatus=tempStrStatus+'<option value="HLO" selected>PSIRT bug always excluded</option>';
			tempStrStatus=tempStrStatus+'</select>';
			return tempStrStatus;
		}else{
			tempStrStatus=tempStrStatus+'<select id="bugSelStatus" name="bugSelectStatus" style="width:250px;" >';
		
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
			
			//if(this.addMethod != "S" && tempFilter != "SR_POPULATED"){
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
		//}	
			
			
			tempStrStatus=tempStrStatus+'</select>';
			return tempStrStatus;
		}
		
	}
	
	
});

function getSocialCountDetails(){
	var bugId;
	if(projectInfoModel.isMerged=='Y'){
		bugId=mergeBugModel.bugId;
	}else{
		bugId=bugModel.bugId;
	}
	
	 $.ajax({
		 	url: "/SORAServices/social/getSocialCounts.json?bugId="+bugId,
		 	type:"GET",
		 	cache:false,
		 	handleAs: "json",
	        success: function (data, ioargs) {
	        	 $("#likedBySpan").text(" "+ data.likeCount);
	    		 $("#dislikedBySpan").text(" "+ data.dislikeCount);
	    		 $("#copiedBySpan").text(" " + data.copyCount);
	    		 
	    		
	    		 if(data.likedByUser){
	    			 $("#likeSpan").css("color", "green");
	    			 likedByUser = true;
	    		 }else{
	    			 $("#likeSpan").css("color", "black");
	    			 likedByUser = false;
	    		 }
	    		 if(data.disLikedByUser){
	    			 $("#disLikeSpan").css("color", "green");
	    			 disLikedByUser = true;
	    		 }else{
	    			 $("#disLikeSpan").css("color", "black");
	    			 disLikedByUser = false;
	    		 }
	        },
	        error: function (err) {
	            alert(" could not fetch like/dislike/copy count.");
	            
	        }
	  	});
  
}


//function to set the view into normal or review mode
function setUpMode(){
	var projReviewMode=projectInfoModel.projReviewState;
	if(projReviewMode==null||projReviewMode==0||projReviewMode==''||projReviewMode==2){
		$('#buttonsReview').hide();
	}
	$('#reviewMode').attr('value', projReviewMode);
	if($('#reviewMode').val()=='1'){
		toggleReviewMode('first');	
	}
	var str=projectInfoModel.projReviewState;
	if(str!=null && str=='2'){
		$('[name=reviewComments]').attr("readonly", "readonly");
	}
	
	
}

function toggleReviewMode(isFirst){
	var projReviewMode=$('#reviewMode').val();
	console.log("The value is :"+projReviewMode);
	if(projReviewMode==1){
		console.log("inside one");
		if(isFirst!='first'){
			alert("Changing from normal mode to review mode. Review comments are editable in this mode.");
		}
		dojo.byId('modeChangeButton').innerHTML="Change from Review Mode to Normal Mode";
		$('[name=reviewComments]').removeAttr("disabled");
		$('[name=generalComments]').attr("disabled", "disabled");
		$('[name=accountComments]').attr("disabled", "disabled");
		$('[name=socialComments]').attr("disabled", "disabled");
		$('#reviewMode').attr('value', 2);
		$('[name=accountSeverity]').attr("disabled", "disabled");
		$('[name=bugSelectStatus]').attr("disabled", "disabled");
		$('[name=bugSmeFlag]').attr("disabled", "disabled");
		$('[name=tagExpression]').attr("disabled", "disabled");
		$('[name=tagDescription]').attr("disabled", "disabled");
		$('#buttonsReview').show();
		$('#buttons').hide();
	}else if(projReviewMode==2){
		if(isFirst!='first'){
			alert("Changing from review mode to normal mode. Review comments are not editable in this mode.");
		}
		dojo.byId('modeChangeButton').innerHTML="Change from Normal Mode to Review Mode";
		$('[name=accountComments]').removeAttr("disabled");
		$('[name=generalComments]').removeAttr("disabled");
		$('[name=reviewComments]').attr("disabled", "disabled");
		$('[name=socialComments]').removeAttr("disabled");
		$('#reviewMode').attr('value', 1);
		$('[name=accountSeverity]').removeAttr("disabled");
		$('[name=bugSelectStatus]').removeAttr("disabled");
		$('[name=bugSmeFlag]').removeAttr("disabled");
		$('[name=tagExpression]').removeAttr("disabled");
		$('[name=tagDescription]').removeAttr("disabled");
		$('#buttonsReview').hide();
		$('#buttons').show();
		
	}
}
var smuModel  = new SMUInfoModel();
var smuView;
function getSMUinfo(){
	if(true==bugModel.isSmu){
		$.ajax({
			url:contextPath+"/social/getsmuDetails.json?projectId="+projId+"&smuId="+bugModel.smuComp,
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



BugView = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
    	_.templateSettings = {
    			  interpolate : /\{\{(.+?)\}\}/g
    	};

        // Compile the template using underscore
        var template = _.template( $("#bugTemplate").html(), this.model);
        // Load the compiled HTML into the Backbone "el"
        this.$el.html( template );
        getSocialCountDetails();
        setUpMode();
        getSMUinfo();
        //User for ASIC alert 
       
        
    }
    
});

