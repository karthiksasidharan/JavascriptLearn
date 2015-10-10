ConfigModel = Backbone.Model.extend({
	defaults: {
		arrowImage:contextPath+"/../SORA_STATIC/images/arrow.png",
		closeImage:contextPath+"/../SORA_STATIC/images/closeBack.jpg",
		loader:contextPath+"/../SORA_STATIC/images/CircularProgressAnimation.gif",
		mergeDivs:'',
		mergeParentProject:'',
		mergeProjectData:''
		


	},
	initialize: function(jsonData){

	},
	setValues : function(jsonData){
		
		var temp='';
		if(jsonData!=""){
			for(i=0;i<jsonData.length;i++){
				temp=temp+'<div class="searchResultClass"  style="display:none;background-color:'+jsonData[i].bgColor+'" id="parent_'+jsonData[i].parentProjectId+'" ></div>';
			}
			this.mergeParentProject='<label><b>Project :</b></label><span id="configParentProject"></span><br/><label><b>Customer:</b></label><span id="configCustomer"></span><br/>';
		}else{
			this.mergeParentProject='';
		}
		this.mergeProjectData=jsonData;
		this.mergeDivs=temp;
		this.arrowImage=contextPath+"/../SORA_STATIC/images/arrow.png";
		this.closeImage=contextPath+"/../SORA_STATIC/images/closeBack.jpg";
		this.loader=contextPath+"/../SORA_STATIC/images/CircularProgressAnimation.gif";
		
		
		
	}
});