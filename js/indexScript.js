window.onload=function(){
	var oName = document.getElementById('hero_name');
	var oInfo = document.getElementById('hero_info');
	document.onkeydown = check;

    ajax('./name.txt',function(str){
        oName.innerHTML=str;
    });
    ajax('./info.txt',function(str){
        oInfo.innerHTML=str;
    })

    function check(e){
	//兼容IE
		e= (e) ? e : window.event
		keyNum = e.keyCode;

		if(keyNum==13 || keyNum==108)//若是回车
		{
			window.location.href = "./game.html";
		}
	}
}