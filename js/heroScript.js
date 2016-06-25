var flag;
var oInfo;
window.onload=function()
{
	flag = 0;
	with(document){
		var oName = getElementById('name');
		var oMessage = getElementById('message');
		oInfo = getElementById('info');
	}
	oName.focus();
	oName.onfocus = function(){
		oInfo.innerHTML="1~20 letter."
		oInfo.style.color="#ffff99";
		oName.style.borderColor="#00ffcc";
	}

	oName.onblur = function(){
		var pattern = /^.{1,20}$/g
		if(oName.value == ''){
			oInfo.innerHTML = "Name should not be blank";
			oInfo.style.color = "red";
			oName.style.borderColor = "red";
			flag=0;
		}
		else if(!pattern.test(oName.value)){
			oInfo.innerHTML = "The input is not valid";
			oInfo.style.color = "red";
			oName.style.borderColor = "red";
			flag=0;
		}
		else{
			oInfo.innerHTML=""
			oInfo.style.color="#ffff99";
			oName.style.borderColor="#00ffcc";
			flag=1;
		}
	}
}

function check()
{
	if(!flag)
	{
		oInfo.style.color = "red";
		oInfo.innerHTML = "Please input your infomartion";
		return false;
	}
}