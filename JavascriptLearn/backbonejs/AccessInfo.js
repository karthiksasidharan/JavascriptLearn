AccessListModel = Backbone.Model.extend({
	defaults: {
		viewEditAccess: false,
		techPerAccess: false,
		rewAdminAccess:false,
		hirapopupAccess:false,
		editBugListTagAccess:false,
		rel:'',
		throttle:'',
		train:'',
		tags:'',
		commonTag:'' ,
		bugStateSocial:'',
		minValidatorsSocial:''


	},
	initialize: function(jsonData){

	},
	setValues : function(jsonData){
		console.log("Access Called");
		this.viewEditAccess= jsonData.hasViewEditAccess;
		this.techPerAccess= jsonData.hasTechPerAccess;
		this.rewAdminAccess=jsonData.hasRewAdminAccess,
		this.hirapopupAccess=jsonData.hasHirapopupAccess;
		this.editBugListTagAccess=jsonData.hasEditBugListTagAccess;
		this.rel='';
		this.throttle='';
		this.train='';

		if(jsonData.hiraPopupData!=null){
			this.commonTag=jsonData.hiraPopupData.commonTag;	
			this.tags=jsonData.hiraPopupData.tags;
			this.rel=jsonData.hiraPopupData.rel;
			this.throttle=jsonData.hiraPopupData.throttle;
			this.train=jsonData.hiraPopupData.train;
			//bugModel.isReadOnly="";
		}else{
			this.commonTag='';	
			this.tags='';
			
		}
		this.bugStateSocial=jsonData.bugState;
		this.minValidatorsSocial=jsonData.numberofValidators;
		console.log("Bug information initialized");
		bugInfo.init();
	}
});