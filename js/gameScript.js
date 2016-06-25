var timer=null;
var x=0;//总得分
var flag=0;//0代表没有开始计时。1代表开始计时，游戏开始
var oStar
var keyNum;
var speed;//方块下落的速度
var createSpeed=100;//方块生成的时间间隔（越小越多）

window.onload=function(){
	oStar=document.getElementById('star');
	document.onkeydown = check;
}

//监控键盘输入
function check(e){
	//兼容IE
	e= (e) ? e : window.event
	keyNum = e.keyCode;

	if(keyNum==13 || keyNum==108)//若是回车
	{
		if(!flag)
		{
			var oHint = document.getElementById('hint');
			oHint.style.display='none';
			count();//开始计时
			flag=1;//游戏开始
			setInterval("creatGrid()",createSpeed);//开始落放方块
		}
	}

	if(flag)//若游戏开始以后
	{	
		var oMe = document.getElementById('me');
		if(keyNum==39)//按右
		{
			if(oMe.offsetLeft != 570){//不在最左边
				oMe.style.left = oMe.offsetLeft + 30 + 'px';
			}
		}
		else if(keyNum==37)//按左
		{
			if(oMe.offsetLeft != 0){//不在最左边
				oMe.style.left = oMe.offsetLeft - 30 + 'px';
			}
		}
		/*
		else if(keyNum==38)//按上
		{
			//alert(oMe.offsetTop)
			if(oMe.offsetTop!= 0){//不在最上面
				oMe.style.top = oMe.offsetTop - 30 +'px'; 
			}
		}
		else if(keyNum==40)//按下
		{
			if(oMe.offsetTop!= 570){//不在最下面
				oMe.style.top = oMe.offsetTop + 30 +'px'; 
			}
		}
		*/
	}
}

//计时
function count(){
	var i=0;//10位
	var j=1;//个位
	var aImg = document.getElementsByTagName('img');
	clearInterval(timer);
	//一个计时器，每秒运行一次，换图片计时
	timer=setInterval(function(){
		if(j<10){
			aImg[1].src='./img/'+j+'.png'
			j++;
			x++;
		}
		else{
			i++;
			j=0;
		}
		if(i<10){
			aImg[0].src='./img/'+i+'.png'
		}
		else{
			//为了不让星星进入有戏区域
			if((x/100)%6==0)
				oStar.innerHTML += '<br />'
			oStar.innerHTML += '☆';
			i=0;
		}
	},1000);
}

var height = 570;//600-30
var width = 570;//600-30

function creatGrid(){
	var oBattlefiled = document.getElementsByClassName('battlefield');
	//只有一个
	speed = Math.round(Math.random()*100);
	var oGrid = document.createElement('div');
	//设置oGrid的样式
	oGrid.style.position='absolute';
	oGrid.style.height='30px';
	oGrid.style.width='30px';
	oGrid.style.backgroundColor='#ff0000';
	oGrid.style.top='0px';
	oBattlefiled[0].appendChild(oGrid);

	//Math.round()四舍五入
	//Math.random()*m 生成0-m之间的随机数

	oGrid.style.left = Math.round(Math.random()*width) + 'px';//出现位置随机
	
	var moveGrid = setInterval(function(){
		//alert(oGrid.offsetTop+','+speed);
		oGrid.style.top = (parseInt(oGrid.style.top) + speed) + 'px';
		if(oGrid.offsetTop > 570){
			var oMe = document.getElementById('me');
			//alert('oGrid.left='+oGrid.style.left+','+'oMe.left='+oMe.offsetLeft);
			checkCollide(oGrid,oMe);
			oBattlefiled[0].removeChild(oGrid);
			clearInterval(moveGrid);
		}
	},50);
}
function checkCollide(grid,me){
	if( (parseInt(grid.style.left)>(me.offsetLeft-30)) && ( parseInt(grid.style.left)<(me.offsetLeft+30) ) )
	{
		var master
		ajax('./master.txt',function(str)
		{
        	master=str;//获取最高分
        	//master的值必须在ajax里面才有效
			if(x>master){
				alert('Congratulation!!! You get the master goal: '+x);
				setCookie('goal',x);//将x临时保存在cookie中，在hero页面取出保存在文件			
				window.location.href = "./hero.php";
			}
			else
			{
				alert('Your goal: '+x);
				window.location.href = "./index.html";
			}
		});
	}
}

function setCookie(name,value)
{ //name为cookie的名称,value为name值
    var expires = new Date(); //建立日期变量
    //expires过期时间 = 当前时间 +过期时间(秒)
    expires.setTime(expires.getTime() +  1* 30 * 24 * 60 * 60 * 1000); //60秒后过期
    document.cookie = name + '=' + value +';expires=' + expires.toGMTString(); 
    //将值及过期时间一起保存至cookie中(需以GMT格式表示的时间字符串)
}
